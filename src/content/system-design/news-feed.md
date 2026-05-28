## Problem Statement

Design a personalized news feed system that shows each user a ranked list of recent posts from people and pages they follow. Posts can include text, images, and links. The feed must appear within 500 ms of opening the app and stay fresh as new posts are published. Target scale: 500 million daily active users, each user follows an average of 300 accounts, and 5 million new posts are published per minute.

## Clarifying Questions

- What is the maximum number of accounts a single user can follow, and do we need to handle celebrities or accounts with tens of millions of followers differently from regular accounts?
- Should the feed be purely chronological or ranked by a relevance/engagement model, and if ranked, does ranking happen at write time or read time?
- What is the acceptable staleness window — how long after a post is published can it take to appear in followers' feeds?
- Should the feed support infinite scroll (pagination), and if so, what is the expected depth most users scroll to?
- Do we need to filter out posts the user has already seen (deduplication across sessions), or is repeating recent posts acceptable?

## Scale Estimates

**DAU and content:**
- 500M DAU; assume 10% post per day → 50M posts/day ÷ 86,400 ≈ **580 new posts/sec**
- 5M posts/min = **83,000 posts/sec** (peak, including bursty events)
- Average 300 followers per account → each post must be fanned out to 300 feeds

**Fan-out volume:**
- 83,000 posts/sec × 300 followers avg = **25 million feed-write operations/sec** (peak)
- This is the write amplification problem — it dominates the architecture decision

**Read volume:**
- 500M DAU × 5 feed loads/day = 2.5B feed reads/day ÷ 86,400 ≈ **29,000 feed reads/sec**
- Each feed read: top 20 posts from a pre-computed feed list → very fast if cached

**Storage:**
- Feed per user: last 1,000 post IDs × 8 bytes = 8 KB per user
- 500M users × 8 KB = **4 TB** of feed storage — fits in a large Redis cluster

## High-Level Design

```
Publisher                   Subscriber
  │                              │
  ▼                              ▼
┌────────────┐           ┌───────────────┐
│ Post API   │           │  Feed API     │
│ Server     │           │  Server       │
└──────┬─────┘           └───────┬───────┘
       │ publish event            │ read feed
       ▼                         ▼
┌─────────────┐         ┌──────────────────┐
│ Kafka       │         │  Redis Feed      │
│ (fan-out    │──────▶  │  Cache           │
│  queue)     │         │  (user → [post   │
└─────────────┘         │   IDs])          │
       │                └──────────────────┘
       ▼                         │ cache miss
┌─────────────────────┐          ▼
│ Fan-out Workers     │  ┌───────────────────┐
│ (write post IDs to  │  │  Post Content DB  │
│  followers' feeds)  │  │  (Cassandra)      │
└─────────────────────┘  └───────────────────┘
```

**Post API Server:** Accepts new posts, writes them to the Post Content DB (Cassandra, keyed by post_id), and publishes a `{post_id, author_id, timestamp}` event to Kafka for asynchronous fan-out.

**Kafka:** Decouples the post creation (low volume) from the fan-out (high volume). Fan-out workers consume from Kafka and push post IDs to follower feeds. Kafka provides durability and backpressure so bursty posting doesn't overwhelm downstream systems.

**Fan-out Workers:** Look up the author's follower list from a social graph service, then for each follower, prepend the new post_id to their Redis feed list (using `LPUSH` + `LTRIM` to keep only the last 1,000 entries). Celebrity accounts use fan-out-on-read (described in Deep Dives) instead.

**Redis Feed Cache:** Stores each user's feed as a sorted set or list of post IDs. The Feed API server reads the top N post IDs from Redis, then fetches post content from Cassandra in parallel (or from a post content cache). Feed loads are fast: Redis lookup + N parallel content fetches, all in-memory.

## Deep Dives

- **Celebrity/high-follower accounts (fan-out-on-read hybrid):** Fan-out-on-write for an account with 50 million followers means 50M Redis writes per post — catastrophic. The solution is a hybrid model: accounts above a follower threshold (e.g., 1M) skip fan-out and are instead stored in a "celebrity list" per user. On feed read, the Feed API fetches the user's pre-computed feed from Redis, then fetches the last N posts from each celebrity they follow from a separate celebrity post cache, and merges the two lists before returning. This adds latency to the read path but makes celebrity posting fast.

- **Feed ranking:** Inserting post IDs by recency is simple, but feed quality improves with ranking (engagement prediction). Options: (1) rank at write time — fan-out workers compute a score and use Redis sorted sets keyed by score; re-ranking on new signals (likes) requires re-inserting entries; (2) rank at read time — retrieve the last K candidates from Redis and score them in the Feed API server using a lightweight ML model; more flexible but adds per-request compute. Most production systems use a two-stage approach: pre-filter to a candidate set of ~200 posts in Redis, then re-rank to top 20 in the application layer.

- **Pagination and cursor management:** Infinite scroll requires stable pagination. Using `LRANGE feed:user_id 20 39` for page 2 breaks when new posts are inserted at the head (LPUSH shifts all indices). The fix is cursor-based pagination: include the last-seen `post_id` in the request; the server scans the feed list until it finds that ID, then returns the next page. This is O(scan depth) but correct under concurrent writes.

- **Feed for inactive users:** Pre-computing and maintaining Redis feed state for users who haven't logged in for 30 days wastes memory (4 TB grows fast with inactive users). Mark users as inactive after N days and skip fan-out for their feeds. On their first login, hydrate their feed on-demand by querying the social graph and fetching recent posts from the accounts they follow (fan-out-on-read, one time). Mark them active again to resume incremental fan-out.

## Trade-offs

**Decision 1: Fan-out-on-write vs. fan-out-on-read**

*Option A: Fan-out-on-write (push model)*
- Pro: Feed reads are O(1) — just read the pre-built list from Redis; very fast for the common case.
- Pro: Consistent experience — all followers see the post at the same latency.
- Con: Write amplification is massive for high-follower accounts; 50M followers = 50M Redis writes per post.
- Con: Storage grows with follower count × posts; celebrity content is stored redundantly across millions of feeds.

*Option B: Fan-out-on-read (pull model)*
- Pro: No write amplification — posting is a single write to the post DB regardless of follower count.
- Pro: Celebrities with 50M followers post without any extra overhead.
- Con: Feed read requires querying all followed accounts for recent posts — O(followed_count) DB reads per feed load.
- Con: High read latency; heavy load on the post DB and social graph service on every feed refresh.

**Decision 2: Chronological vs. ranked feed**

*Option A: Chronological (insertion-ordered)*
- Pro: Predictable and transparent to users; no algorithmic opacity complaints.
- Pro: Simple implementation — Redis list ordered by insertion time.
- Con: Recent spam or low-quality posts from high-frequency posters dominate the feed.
- Con: No business lever to promote engagement or surface content the user would actually care about.

*Option B: Ranked feed (ML-scored)*
- Pro: Higher engagement — users see content most likely to elicit a reaction.
- Pro: Enables business objectives (ad insertion at ranked positions, promoted content).
- Con: Requires maintaining and serving an ML ranking model; adds latency on the read path.
- Con: Users distrust algorithms; difficult to explain why specific posts appear.

## Google Angle

Google Discover (formerly Google Feed) serves personalized content cards to over a billion users on Android and the Chrome new-tab page, using the same fan-out-on-read hybrid approach: content is indexed by Google's web crawlers and Pub/Sub distributes freshness signals rather than fan-out workers. Instead of a social graph determining what you see, Google uses your search history, location, and implicit interest signals from the Knowledge Graph to rank articles. The underlying storage is served by Bigtable (user interest state) and routed through the same Serving infrastructure as Google Search results, meaning the "feed" and the search results page share backend infrastructure for freshness and ranking — an architectural integration that would be impossible with a purely social fan-out model.

## Key Numbers to Remember

- Fan-out-on-write amplification: 83,000 posts/sec × 300 avg followers = 25M feed writes/sec at peak.
- Hybrid celebrity threshold: accounts with >1M followers typically switch to fan-out-on-read.
- Redis feed storage: ~8 KB per user for 1,000 post IDs — 500M users = 4 TB, plan for a Redis cluster.
- Feed read latency target: ≤500 ms — Redis lookup (<1 ms) + parallel content fetches (<100 ms) is achievable.
- Inactive user cutoff: skip fan-out for users inactive >30 days; hydrate on first login (saves ~30–40% of write load).
- Ranking candidate set: typically pull 100–500 candidate post IDs from Redis, rank to top 20 in the app layer.
