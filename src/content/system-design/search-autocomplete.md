## Problem Statement

Design a search autocomplete (typeahead) system that returns the top 10 ranked query suggestions as a user types, with a new suggestion list delivered for every keystroke. The system must return results within 100 ms end-to-end, handle millions of concurrent typing sessions, and keep suggestions fresh based on global query popularity. Target scale: 10 billion queries per day, 5 million concurrent active typing sessions, suggestions updated hourly from query logs.

## Clarifying Questions

- Should suggestions be personalized per user (based on their own query history) or purely global popularity rankings, or a blend?
- What languages and character sets must be supported — is this English-only or multilingual, and do we need Unicode prefix matching?
- How fresh must the suggestion rankings be — real-time (within seconds of a query trending), near-real-time (minutes), or batch (hourly/daily)?
- Should we support fuzzy matching (correcting typos like "gogle" → "google") or only exact prefix matching?
- What is the maximum suggestion string length, and should we suggest full queries or also partial phrases?

## Scale Estimates

**Query volume:**
- 10B queries/day ÷ 86,400 s ≈ **115,700 queries/sec** peak
- Each query averages 4 keystrokes before completion → 115,700 × 4 ≈ **460,000 autocomplete requests/sec**
- Each autocomplete request: ~1–5 ms server time (trie lookup or cache hit)

**Data volume:**
- Top 100M unique queries (long tail is not autocompleted)
- Average query string: 30 bytes; with frequency + rank metadata: ~100 bytes/query
- 100M entries × 100 bytes = **10 GB** — fits entirely in memory on a single large server; replicate for availability

**Suggestion latency breakdown:**
- Network (client to edge PoP): 10–30 ms
- Cache/trie lookup at edge: 1–5 ms
- Total budget: 100 ms → easily achievable with edge caching

**Update pipeline:**
- Query logs: 10B queries/day → process hourly batch of ~420M queries per run
- Frequency aggregation: MapReduce or Spark job; output is updated top-K per prefix
- Pipeline runtime target: <60 minutes so suggestions are no more than 1 hour stale

## High-Level Design

```
User types "go..."
     │
     ▼
┌──────────────────────────────┐
│  Client (browser/mobile)     │
│  debounce 100ms + dedupe     │
└──────────────┬───────────────┘
               │ GET /suggest?q=go
               ▼
┌──────────────────────────────┐
│  CDN / Edge Cache            │
│  Cache key: prefix (lc)      │
│  TTL: 1 hour                 │
└──────────────┬───────────────┘
               │ cache miss
               ▼
┌──────────────────────────────┐
│  Suggestion API Servers      │
│  (stateless, in-memory trie  │
│   or Redis lookup)           │
└──────────────┬───────────────┘
               │ trie query
               ▼
┌──────────────────────────────┐
│  Trie / Prefix Index Store   │
│  (Redis sorted sets or       │
│   in-memory trie replicas)   │
└──────────────────────────────┘
               ▲
               │ hourly rebuild
               │
┌──────────────────────────────┐
│  Aggregation Pipeline        │
│  (Spark / MapReduce)         │
│  reads query logs → computes │
│  top-K per prefix → writes   │
│  to Trie store               │
└──────────────────────────────┘
```

**Client with debouncing:** The browser sends a request only after the user pauses typing for 100 ms (debounce) and only if the prefix has changed. This reduces requests by 60–70% compared to sending on every keystroke.

**CDN / Edge Cache:** Prefix suggestions for common queries (e.g., "go", "goo", "goog") are cacheable — thousands of users type the same prefix simultaneously. Cache at the CDN edge with a 1-hour TTL aligned to the suggestion update cadence. Cache hit rates for top prefixes exceed 99%.

**Suggestion API Servers:** Stateless servers that query the in-memory trie or Redis sorted sets. The trie is small enough (10 GB) to be replicated across all API server instances, making every suggestion lookup a local in-memory operation with zero network I/O.

**Trie / Prefix Index:** Either an actual trie where each node stores `top_k_queries[]` (DFS is too slow at query time — pre-compute top-K at each node during build), or Redis sorted sets keyed by prefix (`suggest:go` → sorted set of queries scored by frequency). The pre-computed top-K approach makes query time O(1) per prefix at the cost of write-heavy trie updates.

**Aggregation Pipeline:** Runs hourly. Reads query logs from GCS/S3, aggregates query counts with Spark, computes top-10 suggestions per prefix (considering prefixes up to length L), and writes the updated prefix→top-K mapping to the Trie store. API servers reload their in-memory replica on a schedule.

## Deep Dives

- **Trie node pre-computation vs. on-the-fly DFS:** A naive trie stores queries at leaf nodes and requires a DFS traversal to find the top-K under a prefix — O(subtree_size) per request, which is too slow for 460K RPS. The optimized approach pre-computes and stores `top_k_queries[]` at every internal node during trie construction. A query for prefix "go" returns the pre-computed top-10 from the "go" node in O(1). The trade-off: every query frequency update requires re-propagating top-K from leaves to root for all affected prefixes, making writes more expensive.

- **Redis sorted sets as a trie alternative:** For each prefix of length 1 through L, store a Redis sorted set keyed by `suggest:{prefix}` where members are query strings and scores are frequency counts. A `ZREVRANGE suggest:go 0 9` returns the top 10 instantly. The downside is storage: if average query length is 5 characters, we create 5 Redis keys per unique query (one per prefix). 100M unique queries × 5 prefixes × ~60 bytes per entry = ~30 GB — still manageable but 3× the trie footprint.

- **Personalization layer:** Blending global suggestions with the user's own recent queries improves relevance. The API server fetches the user's last 50 queries (from a user session store, keyed by user_id), computes a local prefix match, and merges with global suggestions using a weighted ranking (e.g., user-query score × 2 + global score × 1). The user's query store is a small Redis hash (50 queries × 30 bytes = 1.5 KB per user) — easy to cache in the API server's local memory for the duration of a session.

- **Multilingual support:** Different languages require separate tries or prefix namespaces because character sets differ. Chinese and Japanese require pinyin/romaji transliteration for prefix matching to work. The suggestion API routes requests to the appropriate language-specific trie based on a `lang` parameter. Building and maintaining separate tries per language roughly multiplies storage and pipeline compute by the number of supported languages.

## Trade-offs

**Decision 1: In-memory trie on API servers vs. Redis sorted sets**

*Option A: In-memory trie on API servers*
- Pro: Zero network I/O per lookup — trie is local to the process, achieving sub-millisecond latency.
- Pro: Cache miss path is impossible — every API server has the full dataset; no Redis dependency.
- Con: Each API server must hold 10 GB of trie in RAM; limits horizontal scalability without proportional memory cost.
- Con: Trie updates require a coordinated reload across all API server instances — brief staleness window during reload.

*Option B: Redis sorted sets (external store)*
- Pro: Trie state is centralized in Redis — updates are immediately visible to all API servers without coordinated reloads.
- Pro: API servers are lightweight (no large in-memory state) — easy to autoscale.
- Con: Every suggestion request adds a Redis network RTT (~0.5–2 ms) — acceptable but measurable latency increase.
- Con: Redis becomes a single point of failure — requires Redis Cluster with replication for availability.

**Decision 2: Hourly batch updates vs. real-time streaming updates**

*Option A: Hourly batch pipeline (Spark / MapReduce)*
- Pro: Simpler to implement and operate; one batch job vs. a continuously running streaming pipeline.
- Pro: Computationally efficient — aggregate an hour's worth of queries in one pass rather than per-event.
- Con: Trending queries (breaking news, viral events) take up to 1 hour to surface in suggestions.
- Con: Large data volumes per batch run — processing 420M queries/hour requires significant cluster resources.

*Option B: Real-time streaming (Kafka + Flink)*
- Pro: Trending queries appear in suggestions within minutes of going viral — important for news search.
- Pro: Smooths compute load — continuous small updates instead of hourly compute spikes.
- Con: Trie update frequency increases dramatically — every significant query spike triggers a partial rebuild.
- Con: Streaming pipeline is complex: windowing, late-event handling, and stateful aggregation require careful tuning.

## Google Angle

Google Search autocomplete (Google Suggest, launched 2004) is the most-used autocomplete system in the world. Google's implementation uses a two-pass approach that directly maps to this design: a prefix index built from aggregated query logs (updated multiple times per day, not hourly) serves global suggestions, and a separate personalization layer blends in the user's own search history stored in their Google account profile. Google's autocomplete system is served from the same edge infrastructure as Google.com search results, leveraging the same Anycast routing and in-PoP caching that makes Google Search fast worldwide. Internally, Google has described using a variant of the pre-computed top-K trie approach at each internal node to guarantee O(1) suggestion serving latency regardless of query prefix depth.

## Key Numbers to Remember

- Autocomplete request volume: each query generates ~4 autocomplete requests as the user types → 4× the search query rate.
- In-memory trie size for top-100M queries: ~10 GB — fits on a single large API server with memory to spare.
- CDN cache hit rate for top prefixes: >99% — common prefixes ("the", "how to") are requested millions of times hourly.
- Debounce window: 100 ms — reduces autocomplete request volume by ~60–70% with no perceptible UX degradation.
- Redis sorted set lookup: `ZREVRANGE` is O(log N + K) where K is the number of results returned — effectively O(1) for top-10.
- Trie pre-computed node top-K: query time O(1) per prefix; update cost O(depth × top-K comparison) per changed query frequency.
