## Understanding the problem

You are given an `m x n` grid where each cell is either `INF` (2^31 - 1, an empty room), `-1` (a wall), or `0` (a gate). Fill each empty room with the distance to its nearest gate. If a room cannot reach any gate, it should remain `INF`.

## Brute force

Run BFS from every gate separately to fill in distances, then take the minimum across all BFS runs for each cell. This is O(k * m * n) where k is the number of gates — could be O((m*n)^2) if every cell is a gate. Too slow.

## Key insight

All gates are equivalent sources. Starting BFS from all gates simultaneously (multi-source BFS) means each empty room is reached by the nearest gate first, at the exact BFS level equal to its minimum distance. No per-gate separate BFS needed.

## Optimal approach

Pattern: **graph\_bfs (multi-source BFS)**.

1. Enqueue all gate positions (cells with value 0) into the BFS queue.
2. Run BFS. For each cell dequeued at distance `d`, try all four neighbors.
3. If a neighbor is `INF` (empty room, not yet reached), set its value to `d + 1` and enqueue it.
4. Skip cells with value `-1` (walls) or cells already set (value < INF, meaning already reached by a closer or equal gate).

The grid values themselves serve as the visited marker — once a cell is set to a finite distance, it will never be updated again (BFS guarantees first-visit is closest).

## Why this works

BFS explores nodes in order of increasing distance from the sources. Since all gates are in the queue from the start, the first time any cell is dequeued and processed, it is at the minimum possible distance from any gate. Writing the distance directly into the grid means no separate distance array is needed, and `!= INF` acts as the visited check.

## Complexity
- Time: O(m * n) because each cell is enqueued and processed at most once.
- Space: O(m * n) because in the worst case all cells are gates and all are in the initial queue.
