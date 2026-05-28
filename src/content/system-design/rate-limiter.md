## Problem Statement

Design a distributed rate limiter that enforces per-client request quotas for an API gateway. The limiter must decide — within a single network hop — whether an incoming request should be allowed or rejected before it reaches any backend service. Target scale: 500,000 API requests per second across 10 million distinct API clients, with limits defined per client per endpoint.

## Clarifying Questions

- Should rate limits be enforced per user, per API key, per IP address, or some combination of identifiers?
- What algorithms are acceptable — hard limit (token bucket, sliding window), or approximate (leaky bucket, fixed window counter)? Does the product require exact semantics or is ±5% acceptable?
- Must limits be globally consistent across all data centers, or is per-region enforcement with some over-admission acceptable at region boundaries?
- What is the action on exceeding the limit — HTTP 429 immediately, or should we queue excess requests for a configurable delay?
- Do we need a control plane for operators to update limits dynamically without deploying code, and what is the propagation latency SLA?

## Scale Estimates

**Traffic:**
- 500,000 RPS across 10M clients
- Average: 0.05 req/sec per client — very bursty in practice
- Each rate-limiter check: one Redis read + conditional write (INCR or SET with TTL)

**Redis storage per client:**
- Sliding window log: ~50 bytes per recent request timestamp × window size — too large at scale
- Token bucket state: `{tokens: float, last_refill: timestamp}` ≈ 40 bytes per client
- 10M clients × 40 bytes = **400 MB per Redis node** — fits on a single instance; shard for safety

**Latency budget:**
- Total API gateway latency target: ≤5 ms p99
- Rate limiter must complete in ≤1 ms (one Redis RTT in the same data center)

**Redis throughput:**
- 500,000 RPS means 500K Redis operations/sec
- Single Redis instance handles ~100K ops/sec → need **at least 5 shards** (shard by client_id hash)

## High-Level Design

```
Client
  │
  ▼
┌─────────────────────────────┐
│       API Gateway           │
│  ┌──────────────────────┐   │
│  │  Rate Limiter        │   │
│  │  Middleware          │   │
│  └────────┬─────────────┘   │
└───────────┼─────────────────┘
            │ check quota
            ▼
┌───────────────────────────┐
│  Redis Cluster (sharded)  │
│  token bucket state       │
└───────────────────────────┘
            │
  ┌─────────┴──────────┐
  │ allowed            │ rejected
  ▼                    ▼
┌──────────┐      ┌──────────────┐
│ Backend  │      │  429 + Retry │
│ Service  │      │  -After resp │
└──────────┘      └──────────────┘
            │
            ▼
┌───────────────────────────┐
│  Config Store (etcd /     │
│  Firestore) — limit rules │
└───────────────────────────┘
```

**API Gateway with Rate Limiter Middleware:** Every inbound request is intercepted in-process before routing. The middleware extracts the client identifier (API key or user ID from JWT) and calls into the rate limiter library.

**Redis Cluster:** Stores the current token bucket state per client. A Lua script executes the check-and-decrement atomically, preventing race conditions without requiring distributed locks.

**Config Store (etcd):** Holds the limit rules (`client_id → {max_tokens, refill_rate_per_sec, window}`). The gateway caches these locally and refreshes on a watch trigger, so limit changes propagate in seconds without a deploy.

**Backend Service:** Only receives requests that passed the rate check; never needs to implement its own limiting.

## Deep Dives

- **Distributed race conditions with Redis Lua scripts:** A naive GET → check → INCR sequence has a race window where two concurrent requests both read the same counter, both pass, and both increment — allowing a burst of 2× the limit. The fix is to run the entire read-modify-write as a single atomic Lua script on the Redis server, which is single-threaded per slot. The script checks the token count, decrements if allowed, and returns the decision atomically.

- **Token bucket vs. sliding window log vs. fixed window:** Fixed window (INCR per minute key) is O(1) space and allows 2× burst at window boundaries — unacceptable for strict APIs. Sliding window log (store every timestamp) is exact but costs O(request_count) space. Token bucket is the industry sweet spot: O(1) space, handles bursty traffic naturally, configurable burst size separate from sustained rate, and maps well to Redis `{tokens, last_refill}` state.

- **Multi-region consistency:** Synchronous cross-region Redis replication adds 50–150 ms latency — too slow for a 1 ms budget. The practical approach is per-region enforcement with a small over-admission budget: each region enforces the full limit independently. A background sync reconciles counts every 100 ms. For APIs where over-admission is catastrophic (financial), use a centralized Redis with asynchronous pre-fetch of quota tokens in batches (e.g., each gateway node requests 1000 tokens at a time from the central store and refills locally).

- **Graceful degradation:** If the Redis cluster is unreachable, the rate limiter should fail open (allow all requests) rather than block all traffic — a rate limiter outage that brings down the API is worse than a brief period of unlimited access. Implement a circuit breaker with a short recovery window and alert aggressively on Redis latency.

## Trade-offs

**Decision 1: Token bucket vs. fixed window counter**

*Option A: Token bucket*
- Pro: Handles bursts gracefully — a client can accumulate tokens during quiet periods and spend them in a burst without exceeding the sustained rate.
- Pro: O(1) Redis storage per client regardless of request history.
- Con: More complex to implement correctly — requires atomic read-modify-write (Lua script), and the refill logic must handle wall-clock drift.
- Con: Bucket state is opaque — harder to explain to API consumers why their request was rejected.

*Option B: Fixed window counter*
- Pro: Trivially simple — one Redis INCR per request, one TTL-keyed counter per client per window.
- Pro: Easy to expose to clients (`X-RateLimit-Remaining: 47`).
- Con: Allows 2× the stated limit at window boundaries (burst at end of one window + start of next).
- Con: All clients reset simultaneously at window boundaries, causing thundering-herd spikes on backend.

**Decision 2: In-process vs. sidecar deployment**

*Option A: In-process library (within API gateway)*
- Pro: Zero extra network hop — rate check adds <0.1 ms (local Redis call from same AZ).
- Pro: Simpler operational model; no additional service to deploy or monitor.
- Con: Every gateway service must include the library and keep it updated; language-specific implementation.
- Con: A bug in the library crashes the gateway process, not an isolated sidecar.

*Option B: Sidecar proxy (e.g., Envoy filter)*
- Pro: Language-agnostic — any backend service gets rate limiting without code changes.
- Pro: Isolation — a sidecar crash doesn't kill the main process.
- Con: Adds one extra network hop (loopback, ~0.1–0.3 ms) plus process-switch overhead.
- Con: More complex Kubernetes configuration; sidecar must be injected and versioned alongside every deployment.

## Google Angle

Google's API infrastructure enforces per-project quotas across all Google Cloud APIs (Cloud Storage, BigQuery, Compute Engine) using a service called the Google API Quota Service, which is conceptually a token bucket enforced at the edge of each regional API frontend. Internally, Google uses the Chubby distributed lock service (the precursor to etcd/ZooKeeper) to coordinate quota state across replicas — the same problem of consistent distributed counters that a rate limiter must solve. The ESF (Extensible Service Framework) that processes all Cloud API requests applies quota checks in-process before request routing, matching the in-process library pattern and keeping the p99 quota check latency under 1 ms even at Google's request volumes.

## Key Numbers to Remember

- Redis single-node throughput: ~100,000 operations/second — shard by client_id hash beyond this.
- Token bucket Redis state: ~40 bytes per client — 10M clients fits in 400 MB, manageable on a single shard.
- Lua script atomicity: Redis is single-threaded per slot — a Lua script on one slot has no race conditions.
- Rate limiter latency budget: ≤1 ms for the check (one same-AZ Redis RTT) within a 5 ms API gateway p99.
- Fixed window boundary burst: up to 2× the stated rate limit is possible — never use for strict quota enforcement.
- Fail-open policy: rate limiter unavailability → allow all traffic; failing closed kills the entire API.
