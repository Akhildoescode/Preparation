## Problem Statement

Design a distributed key-value store that supports `get(key)` and `put(key, value)` operations with horizontal scalability and configurable consistency guarantees. The store must tolerate node failures without data loss and support million-scale key counts with values up to 100 KB. Target scale: 1 million keys, 100,000 reads/second, 10,000 writes/second, 99.99% availability.

## Clarifying Questions

- What consistency model is required — strong consistency (linearizability), eventual consistency, or is tunable consistency per-operation acceptable?
- What is the maximum value size, and do we need range queries or just exact key lookups?
- What are the durability requirements — must writes survive a total data center failure, or is single-zone durability acceptable?
- Should the system prioritize availability over consistency during a network partition (AP) or consistency over availability (CP), per the CAP theorem?
- What is the expected key distribution — are keys uniformly distributed or will some keys be significantly hotter than others?

## Scale Estimates

**Storage:**
- 1M keys × average value 10 KB = **10 GB** of raw data — fits on one machine, but partition for fault tolerance
- With 3× replication: 10 GB × 3 = 30 GB total storage across the cluster

**Throughput:**
- 100,000 RPS reads ÷ replication factor 3 = ~33,333 RPS per node (reads can be served by any replica)
- 10,000 WPS writes — each write must propagate to all replicas (synchronous or async)
- Write amplification: 10,000 WPS × 3 replicas = 30,000 write operations/sec across the cluster

**Node sizing:**
- A single commodity server handles ~50,000–100,000 key lookups/sec from memory
- 3 nodes sufficient for the read load; add more to reduce per-node write pressure

**Network:**
- 10,000 WPS × 100 KB max value = 1 GB/s worst-case write bandwidth — plan for 10 Gbps NICs

## High-Level Design

```
Client
  │
  ▼
┌──────────────────────────┐
│   Coordinator / Router   │
│  (consistent hashing)    │
└────────────┬─────────────┘
             │ route to vnodes
    ┌────────┴─────────┐
    ▼                  ▼
┌────────┐         ┌────────┐
│ Node A │────────▶│ Node B │
│ vnodes │         │ vnodes │
└───┬────┘         └────┬───┘
    │  replication      │
    ▼                   ▼
┌────────┐         ┌────────┐
│ Node C │         │ Node D │
│ vnodes │         │ vnodes │
└────────┘         └────────┘
    │
    ▼
┌──────────────────────────┐
│  Write-Ahead Log (WAL)   │
│  + MemTable + SSTable    │
│  (LSM Tree storage)      │
└──────────────────────────┘
```

**Coordinator/Router:** Stateless routing layer that maps a key to the responsible node(s) using consistent hashing. Clients can talk directly to any node (like Dynamo) or go through a dedicated coordinator. Responsible for determining the preference list of N replica nodes for each key.

**Consistent Hashing Ring:** Keys are mapped to a position on a 360° ring via hash(key); each physical node owns multiple virtual nodes (vnodes) on the ring. When a node joins or leaves, only its neighboring keys migrate — minimizing rebalancing cost.

**Node (Storage Engine):** Each node uses an LSM-tree (Log-Structured Merge-tree): writes go to an in-memory MemTable (sorted), then to immutable SSTables on disk during compaction. This gives high write throughput and sequential disk I/O.

**Replication:** Each key is replicated to N consecutive nodes on the ring (typically N=3). Writes succeed when W replicas acknowledge; reads succeed when R replicas respond. Tunable W + R > N guarantees strong consistency; W + R ≤ N enables eventual consistency with higher availability.

## Deep Dives

- **Conflict resolution with vector clocks:** When concurrent writes reach different replicas (during a network partition), each replica may hold a different version. Vector clocks track causality: each write increments the logical clock of the writing node. On read, if the coordinator sees two versions with non-comparable vector clocks (a true conflict), it returns both to the client for application-level resolution (e.g., last-write-wins or merge). Amazon Dynamo pioneered this approach; DynamoDB simplified it to last-write-wins using wall-clock timestamps.

- **Hinted handoff for temporary failures:** When a replica node is temporarily down, writes intended for it are forwarded to a different node with a "hint" (metadata indicating the original destination). Once the failed node recovers, the hint-holding node replays the missed writes. This keeps W small in practice (writes still complete at W=2 even when N=3 and one replica is down) without compromising durability.

- **Merkle trees for anti-entropy:** To detect and repair divergence between replicas without transferring all data, each node maintains a Merkle tree over its key ranges. Two replicas can compare their root hashes; if equal, the range is consistent. If different, they recurse into subtrees to find the divergent keys, exchanging only those. This makes repair O(divergence) rather than O(total data).

- **Hot key handling:** A single key receiving 100,000 RPS saturates even a well-provisioned single node. Solutions: (1) key-level read replicas — route reads for hot keys across all replicas instead of just R; (2) local caching in the coordinator for read-only hot keys; (3) shard the hot value by appending a suffix (`key_0`, `key_1`, ...) and aggregate on read.

## Trade-offs

**Decision 1: Strong vs. eventual consistency (W + R vs. N)**

*Option A: Strong consistency (W=2, R=2, N=3 → W+R > N)*
- Pro: Reads always return the most recent committed write — no stale data visible to clients.
- Pro: Simpler application code — developers don't need to handle conflicting versions.
- Con: Write latency increases to the slowest of 2 replica acknowledgments; temporarily unavailable if 2 of 3 nodes fail.
- Con: Writes block during network partitions until quorum is reachable — sacrifices availability for correctness.

*Option B: Eventual consistency (W=1, R=1, N=3 → W+R ≤ N)*
- Pro: Maximum write availability — writes succeed as long as any single replica is reachable.
- Pro: Lower write latency — return to client after one acknowledgment; replicate asynchronously.
- Con: Reads may return stale data; clients may observe different values depending on which replica they hit.
- Con: Conflict resolution logic is pushed to the application layer — significant added complexity.

**Decision 2: LSM-tree vs. B-tree storage engine**

*Option A: LSM-tree (used by Cassandra, RocksDB)*
- Pro: Sequential writes to disk — write throughput 10–100× higher than B-tree for write-heavy workloads.
- Pro: Space-efficient for write-heavy data; compaction reclaims deleted keys' space.
- Con: Read amplification — a key may require checking multiple SSTables; mitigated by Bloom filters.
- Con: Compaction is CPU and I/O intensive; can cause latency spikes if not tuned.

*Option B: B-tree (used by PostgreSQL, MySQL InnoDB)*
- Pro: Predictable read performance — O(log n) in a single tree with in-place updates.
- Pro: Range queries are efficient since data is always in sorted order on disk.
- Con: Random writes to disk cause high write amplification (each update rewrites a full page).
- Con: Page splits during inserts can cause fragmentation, degrading performance over time.

## Google Angle

Google's Bigtable is the foundational key-value store underlying Gmail, Google Search's web index, Google Analytics, and YouTube. Bigtable is a wide-column store built on top of GFS (Google File System, now called Colossus), and it solves the same replica consistency problem using the Chubby lock service for distributed coordination — analogous to the coordinator role in this design. Bigtable's tablet server model (each tablet is a sorted key range served by one server, with tablets split and moved for load balancing) directly implements the consistent-hashing partition concept but uses centralized master tracking via Chubby rather than a decentralized ring. The LSM-tree storage engine in Bigtable (MemTable + SSTable) is the direct ancestor of the same structure used in RocksDB, Cassandra, and LevelDB today.

## Key Numbers to Remember

- Consistent hashing: use ≥150 virtual nodes per physical server to achieve even load distribution and minimize hotspots.
- Quorum formula: W + R > N guarantees strong consistency; typical production setting is N=3, W=2, R=2.
- LSM-tree write throughput advantage: 10–100× over B-tree for sequential-heavy write workloads.
- Merkle tree comparison: O(log N) messages to detect divergence between two replicas for a range of N keys.
- Vector clock size grows: O(number of concurrent writers) per key — prune entries after reconciliation.
- Redis single-node memory: ~100 bytes overhead per key — 1M keys ≈ 100 MB of overhead (key storage) before values.
