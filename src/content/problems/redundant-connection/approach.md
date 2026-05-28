## Understanding the problem

You are given a graph that started as a tree with `n` nodes (1-indexed), to which one extra edge was added — creating exactly one cycle. The input `edges` array represents the graph's edges in the order they were added. Return the redundant edge: the one that, if removed, restores the tree. If there are multiple valid answers, return the last one in the input array.

## Brute force

For each edge, remove it from the graph and check if the remaining edges still form a connected tree (DFS/BFS connectivity check). This is O(n^2) — a connectivity check per edge. We can find the redundant edge in a single pass.

## Key insight

Process edges in order. Use Union-Find. For each edge `(u, v)`: if `u` and `v` are already connected (same root), this edge is the one that creates a cycle — it is the redundant edge. Since we process in order and return immediately on finding the cycle, we naturally return the first cycle-creating edge, which is also the last redundant edge since there's only one cycle.

## Optimal approach

Pattern: **union\_find**.

1. Initialize Union-Find with `n` nodes.
2. For each edge `(u, v)` in order:
   - Find roots of `u` and `v`.
   - If roots are equal, return `[u, v]` — this is the redundant edge.
   - Otherwise, union the two nodes and continue.
3. (The problem guarantees a redundant edge exists, so we will always return inside the loop.)

## Why this works

The tree has n-1 edges and the input has n edges (one extra). All n-1 tree edges will be processed without any two endpoints sharing a root (they connect new components each time). The one extra edge will inevitably connect two nodes already in the same component — its endpoints already have a path between them through the tree edges, making this edge redundant. Processing in order ensures we return the last such edge if there were multiple (there isn't — there's exactly one cycle).

## Complexity
- Time: O(n * α(n)) ≈ O(n) because we process n edges each with a near-constant find/union operation.
- Space: O(n) for the parent and rank arrays.
