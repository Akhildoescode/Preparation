## Understanding the problem

Given `n` nodes numbered 0 to n-1 and a list of undirected edges, determine if these nodes form a valid tree. A valid tree must satisfy two conditions: it has exactly `n - 1` edges (necessary for connectivity without cycles) and it is fully connected (all nodes in one component).

## Brute force

Run DFS/BFS to check both conditions: first verify there are exactly n-1 edges (fail fast if not), then check that DFS from node 0 visits all n nodes (connectivity). This is O(V + E). It works well and is worth stating, but Union-Find makes the cycle detection particularly elegant.

## Key insight

A valid tree on n nodes has exactly two properties: n-1 edges and no cycle. These together imply full connectivity. The n-1 edge count check can short-circuit immediately. Then for no-cycle: Union-Find processes each edge — if both endpoints already share a root, this edge would create a cycle and the answer is false. If all edges are processed without finding a cycle, the graph is a valid tree.

## Optimal approach

Pattern: **union\_find**.

1. Check `edges.length == n - 1`. If not, return false immediately.
2. Initialize Union-Find with n nodes.
3. For each edge `(u, v)`:
   - Find roots of `u` and `v`.
   - If they have the same root, this edge creates a cycle — return false.
   - Otherwise, union them.
4. Return true (all edges processed, no cycle detected, and we know edge count is n-1 so the graph is connected).

## Why this works

For an undirected graph with n nodes: having exactly n-1 edges is necessary but not sufficient for a tree (a disconnected forest with n-1 edges would also pass). However, combined with no-cycle (which union-find verifies), n-1 edges guarantees the graph is connected: a connected acyclic graph on n nodes always has exactly n-1 edges (and vice versa).

## Complexity
- Time: O(n * α(n)) ≈ O(n) because we do one union-find operation per edge and there are exactly n-1 edges.
- Space: O(n) for the parent and rank arrays.
