## Problem Statement

Design a distributed web crawler that systematically browses the World Wide Web to index its content for a search engine. The crawler must discover new pages, respect robots.txt and crawl-delay directives, avoid revisiting duplicate content, and store raw HTML for downstream processing. Target scale: 1 billion pages crawled per month, each page averaging 200 KB of HTML.

## Clarifying Questions

- What is the primary purpose — building a full web index for a search engine, or a more targeted crawl (e.g., only news sites, only a specific domain graph)?
- How should the crawler prioritize URLs — should high-PageRank or recently updated pages be recrawled more frequently than static content?
- How strictly must we respect robots.txt and per-domain crawl-delay — are there legal or contractual SLAs, or is best-effort acceptable?
- What is the deduplication strategy for near-duplicate content (same content, different URL) — exact hash match only, or semantic similarity detection?
- Must the system support real-time indexing (crawl and index within minutes of publication) or is a daily batch cadence acceptable?

## Scale Estimates

**Crawl rate:**
- 1B pages/month ÷ 30 days ÷ 86,400 s ≈ **385 pages/sec sustained**
- Each page: 200 KB average HTML → 385 × 200 KB ≈ **77 MB/s raw HTML throughput**

**URL frontier size:**
- Estimated web: ~50 billion unique URLs indexed across all crawlers
- Active frontier (to be crawled): assume 10B URLs queued at any time
- URL record: 200 bytes (URL string + metadata) → 10B × 200 bytes = **2 TB** for the frontier

**Storage:**
- 1B pages × 200 KB = 200 TB/month of raw HTML
- Compressed (gzip ~70% reduction): ~60 TB/month
- 5-year archive: 60 TB × 60 = **3.6 PB** — object storage (GCS/S3) required

**DNS lookups:**
- 385 pages/sec; assume 5 URLs per domain burst → ~80 unique domain lookups/sec
- DNS must be cached aggressively (TTL respected, but local resolver for throughput)

## High-Level Design

```
URL Seed List
     │
     ▼
┌─────────────────────────────────┐
│   URL Frontier (Priority Queue) │
│   partitioned by domain         │
└────────────────┬────────────────┘
                 │ dequeue URL
                 ▼
┌────────────────────────────────────┐
│   Fetcher Pool (distributed)       │
│   - DNS resolver cache             │
│   - robots.txt checker             │
│   - rate limiter per domain        │
└────────────┬───────────────────────┘
             │ raw HTML
    ┌────────┴──────────────────────┐
    ▼                               ▼
┌──────────────────┐    ┌──────────────────────┐
│  Content Store   │    │  Link Extractor &    │
│  (GCS/S3)        │    │  Dedup Filter        │
│  raw HTML blobs  │    └──────────┬───────────┘
└──────────────────┘               │ new URLs
                                   ▼
                        ┌──────────────────────┐
                        │  URL Seen Store      │
                        │  (Bloom filter +     │
                        │   Cassandra)         │
                        └──────────────────────┘
                                   │ unseen URLs
                                   ▼
                        ┌──────────────────────┐
                        │  URL Frontier        │
                        │  (back to queue)     │
                        └──────────────────────┘
```

**URL Frontier:** A priority queue of URLs to crawl, partitioned by domain. Each domain has its own sub-queue to enforce per-domain politeness intervals. Priority scores are computed from PageRank estimates, link freshness signals, and time-since-last-crawl.

**Fetcher Pool:** A cluster of worker processes (potentially hundreds) that each pick URLs from the frontier, check robots.txt (cached per domain), wait out crawl-delay if needed, and issue the HTTP GET. Fetchers are stateless and horizontally scalable.

**Content Store:** Raw HTML is written to object storage (like GCS) keyed by `sha256(normalized_url)`. Downstream indexing jobs read from GCS asynchronously — the crawler is decoupled from the indexer.

**Link Extractor & Dedup Filter:** Parses the HTML to extract all `<a href>` URLs. Each discovered URL is normalized (lowercase, strip fragments, canonicalize) and checked against the URL Seen Store before being added to the frontier.

**URL Seen Store:** A Bloom filter (fast probabilistic check) followed by a Cassandra lookup (authoritative). The Bloom filter handles 99%+ of lookups without a DB hit. False positives result in skipped URLs — an acceptable trade-off.

## Deep Dives

- **Politeness and robots.txt compliance:** Crawling a domain faster than its crawl-delay allows can get the crawler IP-banned and violates web standards. The frontier partitions URLs by domain so a fetcher only requests one URL from a given domain per crawl-delay interval (default 1 second if unspecified). Robots.txt is fetched once per domain per crawl cycle and cached for 24 hours. A separate politeness module enforces minimum inter-request delays per domain, even without explicit robots.txt directives.

- **Near-duplicate detection with SimHash:** Two pages with 90% identical content but different URLs (e.g., printer-friendly versions) should not both be indexed. SimHash generates a 64-bit fingerprint by computing per-token hash signatures and aggregating them: if two pages' SimHash fingerprints differ by ≤3 bits (Hamming distance), they are near-duplicates. Storing 10B SimHash fingerprints requires 10B × 8 bytes = 80 GB — fits in a large Redis cluster for fast lookup. Exact duplicates are caught by a simpler SHA-256 hash of the content.

- **Distributed URL frontier with consistent hashing:** A single priority queue at 10B URLs and 385 dequeues/sec is a bottleneck. Instead, shard the frontier by `hash(domain) mod N` across N frontier servers. Each fetcher is assigned a subset of domains and talks to the corresponding frontier shard. This eliminates central lock contention and keeps domain-specific rate limiting local to one shard.

- **Trap detection (crawler traps):** Infinite-depth sites (calendars with infinite `?next` links, dynamically generated URL spaces) can exhaust the frontier. Mitigations: (1) depth limit — don't crawl URLs more than D hops from a seed; (2) URL pattern deduplication — if 100 URLs match a pattern with an incrementing parameter, canonicalize them to one representative URL; (3) domain crawl cap — limit total pages crawled per domain per cycle.

## Trade-offs

**Decision 1: BFS vs. priority-queue (best-first) crawl order**

*Option A: Breadth-first search (BFS)*
- Pro: Discovers high-quality pages quickly — pages linked from many other pages (high PageRank) are found in early BFS layers.
- Pro: Simple FIFO queue per domain; no scoring infrastructure needed.
- Con: Treats all undiscovered URLs equally — wastes bandwidth on low-value deep pages before high-value shallower ones.
- Con: Cannot preferentially re-crawl recently updated pages without a separate refresh mechanism.

*Option B: Priority queue (PageRank / freshness score)*
- Pro: High-quality and recently updated pages are crawled first, resulting in a more relevant index faster.
- Pro: Flexible policy — can tune weights for relevance, freshness, domain authority.
- Con: Requires a priority score for each URL before it is enqueued — bootstrapping the score is a chicken-and-egg problem.
- Con: Priority queues at 10B-element scale require careful partitioning; standard heap is too slow at this size.

**Decision 2: Push-to-frontier vs. immediate re-crawl on link discovery**

*Option A: Enqueue discovered links for later crawling (standard frontier model)*
- Pro: Decouples discovery rate from crawl rate; the frontier acts as a buffer absorbing link explosions.
- Pro: Allows prioritization and deduplication before actually fetching a page.
- Con: Latency from discovery to crawl can be hours or days for low-priority URLs.
- Con: The frontier must persist billions of URLs durably — significant storage and operational complexity.

*Option B: Immediately crawl discovered links (DFS-like)*
- Pro: New content discovered within one hop is fetched immediately — better freshness for deep links.
- Pro: Simpler data flow — no separate frontier state store needed.
- Con: No politeness control — could hammer a single domain with thousands of requests simultaneously.
- Con: Crawler gets trapped in deep irrelevant subgraphs before exploring important domains.

## Google Angle

Googlebot is the most consequential web crawler ever built, indexing tens of billions of pages. Google's approach to the frontier deduplication problem uses the same SimHash technique — they open-sourced a description of it in the 2007 paper "Detecting Near-Duplicates for Web Crawling" (Manku et al.). Google's Colossus file system (successor to GFS) stores raw crawl data at petabyte scale, analogous to the GCS content store in this design. The Caffeine indexing infrastructure (launched 2010) replaced a batch crawl-index pipeline with an incremental pipeline built on Bigtable, allowing Google to index new content within seconds of discovery rather than days — the same architectural evolution from batch to streaming that any production crawler eventually needs to make.

## Key Numbers to Remember

- Target crawl rate: 1B pages/month ÷ 2.6M seconds ≈ 385 pages/sec sustained, 77 MB/s raw HTML.
- Bloom filter for 10B URLs: ~12 GB at 1% false positive rate using 10 bits/element — fits in memory.
- SimHash near-duplicate: Hamming distance ≤3 bits on a 64-bit fingerprint indicates near-duplicate.
- Robots.txt cache TTL: 24 hours per domain is the standard production practice.
- URL frontier storage: 10B URLs × 200 bytes = 2 TB — must be persistent (Cassandra/Bigtable), not in-memory.
- Default politeness delay if robots.txt unspecified: 1 second between requests to the same domain.
