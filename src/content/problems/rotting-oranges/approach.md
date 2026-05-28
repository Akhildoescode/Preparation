## Understanding the problem

You have an `m x n` grid where each cell is 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, each rotten orange spreads its rot to all four adjacent fresh oranges simultaneously. Return the minimum number of minutes until no fresh oranges remain, or -1 if it is impossible.

## Brute force

Simulate minute by minute: scan the entire grid each minute, mark newly rotten oranges, repeat until no changes. This is O((m\*n)^2) in the worst case — one orange rots per minute and each minute requires a full grid scan. Too slow.

## Key insight

All rotten oranges spread simultaneously, so this is a multi-source BFS problem. Starting from every rotten orange at once and expanding in layers (each BFS layer = one minute) gives the correct minimum time without any simulation overhead. If any fresh orange remains unreachable after BFS, return -1.

## Optimal approach

Pattern: **graph\_bfs (multi-source BFS)**.

1. Initialize a queue with the positions of all initially rotten oranges. Count the number of fresh oranges.
2. Run BFS level by level. Each level represents one minute.
3. For each cell dequeued, check all four neighbors. If a neighbor is fresh (value 1), mark it as rotten (value 2), decrement the fresh count, and enqueue it.
4. After BFS completes, if `freshCount > 0` there are unreachable fresh oranges — return -1. Otherwise return the number of BFS levels elapsed (track this as `minutes`).

The key invariant: a cell is only enqueued once (when it first becomes rotten), so we never process the same cell twice.

## Why this works

BFS guarantees the shortest path from any source to any reachable cell. By starting all sources simultaneously, each cell's BFS level equals the minimum distance from any initially rotten orange. The level counter directly maps to minutes elapsed.

## Complexity
- Time: O(m * n) because each cell is enqueued and processed at most once.
- Space: O(m * n) because in the worst case all cells are rotten and all are in the queue simultaneously.
