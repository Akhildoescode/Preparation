## Problem Statement

Design a URL shortening service similar to bit.ly that accepts a long URL and returns a short alias (e.g., `short.ly/abc123`). The system must redirect users from the short URL to the original long URL with minimal latency. Target scale: 100 million new URLs shortened per day, 10 billion redirects per day.

## Clarifying Questions

- What is the expected read-to-write ratio — are we optimizing primarily for redirect throughput or creation throughput?
- Should short codes be randomly generated, or can users provide custom aliases (and if so, what's the max length)?
- What is the required availability for redirects — can we tolerate eventual consistency on newly created links, or must they be immediately visible globally?
- How long should short URLs remain valid — indefinitely, or with a configurable TTL and expiry?
- Do we need analytics (click counts, geographic distribution, referrer) per short URL, and if so, at what granularity?

## Scale Estimates

**Daily Active Usage:**
- 100M URL creations/day ÷ 86,400 s ≈ **1,160 writes/sec (WPS)**
- 10B redirects/day ÷ 86,400 s ≈ **115,700 reads/sec (RPS)**
- Read-to-write ratio ≈ 100:1 — strongly read-heavy

**Storage:**
- Average long URL size: ~500 bytes; short code + metadata: ~100 bytes → ~600 bytes/record
- 100M records/day × 600 bytes = 60 GB/day
- 5-year retention: 60 GB × 365 × 5 ≈ **110 TB total**

**Bandwidth:**
- Write: 1,160 WPS × 600 bytes ≈ 700 KB/s
- Read (redirect response, ~300 bytes): 115,700 RPS × 300 bytes ≈ 35 MB/s

Short codes: 7 alphanumeric characters (a–z, A–Z, 0–9) = 62^7 ≈ 3.5 trillion unique codes — sufficient for centuries at this write rate.

## High-Level Design

```
Client
  │
  ▼
┌─────────────────────┐
│   Load Balancer     │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌────────┐   ┌────────┐
│ Write  │   │ Read   │
│ API    │   │ API    │
│ Server │   │ Server │
└───┬────┘   └───┬────┘
    │             │
    ▼             ▼
┌─────────┐  ┌─────────────┐
│Encoding │  │  Redis      │
│Service  │  │  Cache      │
└───┬─────┘  └──────┬──────┘
    │                │ cache miss
    ▼                ▼
┌──────────────────────────┐
│   PostgreSQL / Cassandra │
│   (short → long URL map) │
└──────────────────────────┘
```

**Load Balancer:** Distributes traffic across stateless API servers; separate fleets for write-path and read-path allow independent scaling.

**Write API / Encoding Service:** Generates a unique 7-character base-62 code using either counter-based encoding (a global sequence number converted to base-62) or hashing (MD5 of URL, take first 7 chars, retry on collision). Persists the mapping to the database.

**Read API + Redis Cache:** On redirect, check Redis first (expected hit rate >99% for popular links). On miss, read from the DB and populate cache with a short TTL. Returns HTTP 301 (permanent, browser-caches) or 302 (temporary, useful for analytics).

**Database (Primary store):** Stores `{short_code, long_url, created_at, expires_at, user_id}`. Cassandra suits this workload well: simple key lookups, high write throughput, and natural horizontal scaling.

## Deep Dives

- **Hash collision handling:** When using MD5-based encoding, two different long URLs may produce the same 7-char prefix. The write service must detect collisions (check-then-insert with a unique constraint) and retry with the next 7 characters of the hash or append a salt. Counter-based encoding (a distributed sequence, e.g., from a Redis `INCR` or Snowflake ID converted to base-62) avoids collisions entirely at the cost of predictable/enumerable codes.

- **Cache stampede on cold start:** When a new short URL is first created and receives a viral traffic spike before the cache is warm, thousands of simultaneous cache misses all hit the DB. Solutions: (1) write-through caching — populate cache immediately on URL creation; (2) request coalescing in the read service — a mutex per key so only the first goroutine fetches from DB and subsequent ones wait.

- **Custom aliases and fairness:** Allowing user-defined aliases introduces conflicts and squatting. Mitigations: require authentication for custom aliases, enforce a minimum length of 6 characters, hash the owner's user ID into the namespace to segment allocations.

- **Analytics pipeline:** Counting clicks in the read path at 115K RPS would bottleneck the DB. Instead, the read service emits click events to Kafka; a stream processor (Flink) aggregates counts per URL per minute and writes summaries to a time-series store (ClickHouse). The read DB sees zero extra load.

## Trade-offs

**Decision 1: Short code generation strategy**

*Option A: Hash-based (MD5 truncated to base-62)*
- Pro: Stateless generation — any server can produce a code without coordination.
- Pro: The same long URL always produces the same short code, enabling natural deduplication.
- Con: Collision probability grows with scale; requires retry logic and DB round-trips on conflict.
- Con: Codes are not sequential, making range scans and analytics harder.

*Option B: Counter-based (global sequence → base-62)*
- Pro: Zero collisions by construction; simpler write path.
- Pro: Short codes are predictable in length (grow slowly), making storage slightly more compact.
- Con: The counter is a coordination bottleneck; requires a distributed counter service (Redis or a dedicated Snowflake ID generator).
- Con: Codes are enumerable — a scraper can walk all valid short URLs sequentially.

**Decision 2: HTTP 301 vs 302 redirect**

*Option A: 301 Permanent Redirect*
- Pro: Browser caches the redirect, eliminating repeat server hits for popular links — massive reduction in read traffic.
- Pro: Lower latency for returning users.
- Con: Cannot update or delete the mapping once a browser has cached it without forcing a URL change.
- Con: Analytics miss repeat visits from the same browser.

*Option B: 302 Temporary Redirect*
- Pro: Every redirect passes through the server, enabling complete click analytics.
- Pro: Target URL can be changed or expired without cache staleness.
- Con: Full server hit on every redirect, even for the same user visiting the same link repeatedly.
- Con: Higher latency and infrastructure cost at 100K+ RPS.

## Google Angle

Google's goo.gl service (retired 2019) and Firebase Dynamic Links use the same core design, but at Google scale they layer it on top of Bigtable rather than Cassandra — Bigtable's row-key design means a base-62 encoded short code maps directly to a Bigtable row key, making single-key lookups O(1) with sub-millisecond latency. Google's global CDN (using the same infrastructure as Google.com) caches the redirect responses at edge POPs worldwide, so the majority of redirects never reach the origin servers at all. This CDN-first approach is what makes the redirect latency imperceptible even for links going viral across continents.

## Key Numbers to Remember

- 62^7 ≈ 3.5 trillion unique codes — 7 base-62 characters is sufficient for centuries at 100M URLs/day.
- Read-to-write ratio for URL shorteners: typically 100:1 to 1000:1 — design the read path first.
- Redis cache hit rate target: >99% — if you're missing more than 1% you need a larger cache or better eviction policy.
- MD5 collision probability with 7 chars from 62-char alphabet: approximately 1 in 62^7 per pair — negligible but must be handled.
- HTTP 301 vs 302: 301 caches in browser (analytics-blind), 302 always hits server (analytics-full).
- Cassandra single-row reads: ~1–5 ms at p99; Redis: ~0.1–0.5 ms — justify every cache miss.
