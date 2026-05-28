## Problem Statement

Design a distributed in-memory cache that stores frequently accessed data to reduce latency and database load for a large web application. The cache must support `get(key)`, `set(key, value, ttl)`, and `delete(key)` operations, scale horizontally across hundreds of nodes, and maintain high availability even when individual nodes fail. Target scale: 10 TB of cached data, 10 million reads/second, 1 million writes/second, sub-millisecond p99 read latency.

## Clarifying Questions

- What consistency is required when the same key is updated concurrently from multiple clients — is last-write-wins acceptable, or do we need optimistic locking / compare-and-swap?
- Should the cache be write-through (every write also updates the backing store synchronously), write-back (batch writes to the backing store), or cache-aside (application manages both cache and DB)?
- What eviction policy is required — LRU (recency), LFU (frequency), or FIFO — and can different key namespaces have different policies?
- Do we need replication for high availability (can tolerate read-after-write inconsistency across replicas), or is a pure cache-aside with no replication acceptable (losing a node loses a fraction of cached data, forcing DB fallback)?
- What is the expected key/value size distribution — small keys with kilobyte values, or are large blobs (megabytes) expected?

## Scale Estimates

**Capacity:**
- 10 TB total cache data; average value size: 1 KB → 10 billion cached entries
- Each node: 256 GB RAM → 10 TB ÷ 256 GB ≈ **40 cache nodes** minimum
- With overhead (hash table, pointers, metadata): ~50% memory efficiency → need **80 nodes** for 10 TB effective storage

**Read throughput:**
- 10M reads/sec ÷ 80 nodes = **125,000 reads/sec per node**
- Each node handles this with a multi-threaded event loop (similar to Redis using epoll)

**Write throughput:**
- 1M writes/sec ÷ 80 nodes = **12,500 writes/sec per node** — low relative to reads; write path is not the bottleneck

**Network:**
- 10M reads/sec × 1 KB avg = **10 GB/s** aggregate read bandwidth — requires 25 Gbps NICs on each node or traffic distribution across a larger fleet

**Consistent hashing overhead:**
- Rebalancing when a node joins/leaves: only 1/N of keys migrate to the new node (1/80 = 1.25% of data moves) — minimizes disruption

## High-Level Design

```
Application Servers
        │
        │ (hash key → node)
        ▼
┌──────────────────────────────────────────────────┐
│  Client Library (consistent hashing router)      │
│  - determines which cache node owns the key      │
│  - handles connection pooling (1000 conns/node)  │
└──────────────────┬───────────────────────────────┘
                   │ TCP / UDP
        ┌──────────┼───────────────┐
        ▼          ▼               ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Cache Node │ │ Cache Node │ │ Cache Node │
│  (shard 0) │ │  (shard 1) │ │  (shard N) │
│  ┌───────┐ │ │  ┌───────┐ │ │  ┌───────┐ │
│  │ Hash  │ │ │  │ Hash  │ │ │  │ Hash  │ │
│  │ Table │ │ │  │ Table │ │ │  │ Table │ │
│  └───────┘ │ │  └───────┘ │ │  └───────┘ │
│  ┌───────┐ │ │            │ │            │
│  │Replica│ │ │            │ │            │
│  │(slave)│ │ │            │ │            │
│  └───────┘ │ │            │ │            │
└────────────┘ └────────────┘ └────────────┘
        │
        ▼  cache miss
┌────────────────────────┐
│  Backing Store         │
│  (MySQL / Cassandra)   │
└────────────────────────┘
```

**Client Library (routing layer):** Embedded in each application server. Maintains a consistent hash ring of all cache nodes (updated via a gossip protocol or ZooKeeper watch). Routes each key to the correct node using `hash(key) mod ring`. Handles node failures by rerouting to the next node on the ring (with a small window of cache misses during failover).

**Cache Node:** Stores key-value pairs in a hash table with LRU eviction. Uses a single-threaded event loop (like Redis) to avoid locking overhead, handling multiple connections via epoll. Each node also stores a write-ahead log (optional) for persistence across restarts.

**Replica per node:** Each primary cache node has a hot standby replica that receives asynchronous replication of all writes. On primary failure, the client library promotes the replica (detected via health checks) and updates the ring within seconds.

**Backing Store:** The ground-truth data source. On a cache miss, the application fetches from the backing store and populates the cache (`cache.set(key, value, ttl)`). The cache-aside pattern keeps this logic in the application and out of the cache infrastructure.

## Deep Dives

- **Consistent hashing with virtual nodes:** Simple consistent hashing assigns each physical node one position on the hash ring. With 80 nodes, key distribution is uneven because ring arc lengths vary. Solution: assign each physical node V virtual nodes (typically 150–300) at different ring positions. A key maps to the nearest virtual node, and its physical node handles the request. With V=150, the standard deviation of load per node drops to ~10% of the mean — near-uniform distribution. When a node is added, only its virtual nodes' neighbors' key ranges migrate.

- **Cache stampede (thundering herd):** When a popular key expires, hundreds of simultaneous cache misses trigger hundreds of concurrent DB queries for the same key, overwhelming the backing store. Solutions: (1) probabilistic early expiration — re-compute the value slightly before TTL expires (with a probability that increases as TTL approaches zero), so only one request per key rebuilds it at any time; (2) mutex/lock per key — the first request to miss acquires a short-lived lock and fetches from DB; others wait and then serve from the now-populated cache; (3) background refresh — a separate process proactively refreshes hot keys before they expire, so they never actually go cold.

- **Hot key detection and mitigation:** A single highly-accessed key (e.g., a celebrity's profile viewed 1M times/sec) saturates one node while others sit idle. The client library can detect hot keys by sampling request counts locally: if a key is accessed >N times per second from a single application server, replicate it to L random other nodes and spread reads across all L+1 copies. Writes still go to the primary node; reads round-robin across all replicas. This fan-out is key-level, not cluster-level, so it applies only to hot keys.

- **Eviction policy tuning:** LRU evicts the least recently used key — good for access patterns where recency predicts future access. LFU evicts the least frequently used — better for Zipf-distributed access patterns (common on the web) where some keys are always popular. Most production caches (Redis, Memcached) use approximate LRU (sampling K random keys and evicting the oldest of the sample) rather than exact LRU, because maintaining a true doubly-linked list for 10B entries is too memory-expensive. Exact LFU requires a frequency counter per key that is also expensive; TinyLFU (used in Caffeine for Java) approximates LFU with a Count-Min sketch, reducing memory overhead by 100×.

## Trade-offs

**Decision 1: Cache-aside vs. write-through caching**

*Option A: Cache-aside (lazy population)*
- Pro: Only caches data that is actually read — no wasted cache space for write-only data.
- Pro: Cache and DB are decoupled — DB writes don't add cache latency.
- Con: Cache miss on the first access after a write — the read after a write always hits the DB until the cache is populated.
- Con: Cache can hold stale data if the DB is updated externally (by another service that bypasses the cache).

*Option B: Write-through (update cache on every write)*
- Pro: Cache is always fresh — reads after writes always hit the cache.
- Pro: No stale data problem for data written through this service.
- Con: Write latency increases — must wait for both the cache write and the DB write to complete.
- Con: Cache is populated with data that may never be read — hot-write, cold-read data wastes expensive cache memory.

**Decision 2: Client-side sharding vs. proxy-based sharding (Twemproxy pattern)**

*Option A: Client-side sharding (consistent hashing in client library)*
- Pro: Zero extra network hop — client computes the target node and connects directly.
- Pro: No single proxy bottleneck; the routing logic scales with the number of application servers.
- Con: All application servers must have an up-to-date view of the cache cluster topology — coordination overhead.
- Con: Client library must be implemented in every language used by the application; versioning is complex.

*Option B: Proxy-based sharding (e.g., Twemproxy, mcRouter)*
- Pro: Application servers see a single cache endpoint — no routing logic in the app.
- Pro: One place to update cluster topology — proxy handles all failover and rebalancing.
- Con: Proxy is an extra network hop (adds ~0.1–0.5 ms); proxy itself must be highly available.
- Con: Proxy can become a throughput bottleneck at very high RPS — requires its own horizontal scaling.

## Google Angle

Google published the influential paper "Scaling Memcache at Facebook" is often cited, but Google's own distributed cache research produced the concept of lease-based caching — a mechanism to solve cache stampede without distributed locks, described in the Facebook Memcache paper and used extensively inside Google. More directly, Google's internal Memcache-like system (used for YouTube, Google Search, and Ads) is described in internal infrastructure documents as a layer in front of Bigtable and Spanner. The consistent hashing router in this design is a direct analogue of what Google uses for distributing cache key space across their global cache fleet. Google's systems also implement the hot-key fan-out pattern internally, routing extremely hot keys to "over-replicated" pools with dedicated servers — the same mitigation described in the Deep Dives above.

## Key Numbers to Remember

- Consistent hashing virtual nodes: use 150–300 virtual nodes per physical server to achieve <10% load imbalance.
- Cache node memory efficiency: ~50% of RAM available for data after hash table overhead, pointers, and OS page cache.
- Cache stampede: use probabilistic early expiration or mutex-per-key; never let TTL and high concurrency coexist on a popular key without protection.
- Hot key threshold: a key receiving >10,000 RPS on a single node should be fanned out to 5–10 replica nodes.
- Approximate LRU sampling: evict the oldest of K=5 randomly sampled entries — produces 98% of the quality of exact LRU at 5% of the memory cost.
- Node failure recovery: consistent hashing means only 1/N keys migrate when a node fails — with 80 nodes, only 1.25% of cache goes cold.
