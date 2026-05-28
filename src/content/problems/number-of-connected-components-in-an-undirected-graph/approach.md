## Understanding the problem

You are given `n` nodes numbered 0 to n-1 and a list of undirected edges. Return the number of connected components in the graph. A connected component is a maximal set of nodes where every node is reachable from every other node.

## Brute force

DFS/BFS approach: maintain a visited array, iterate over all nodes, and for each unvisited node start a DFS/BFS to mark all reachable nodes as visited. Increment a counter for each DFS/BFS launch. This is O(V + E) and perfectly acceptable — mention it first.

## Key insight

Union-Find (Disjoint Set Union) is tailor-made for this problem: it tracks which nodes belong to the same component and can merge components in near-O(1) per edge. Start with `n` components and decrement every time two nodes in different components are united. The final count is the number of connected components.

## Optimal approach

Pattern: **union\_find**.

1. Initialize `parent[i] = i` for all nodes and `components = n`.
2. For each edge `(u, v)`:
   - Find the root of `u` using path compression.
   - Find the root of `v` using path compression.
   - If the roots differ, unite them (attach the smaller-rank tree under the larger-rank), and decrement `components`.
3. Return `components`.

**Path compression** (in `find`): when finding the root of a node, set every node on the path directly to the root. **Union by rank**: always attach the smaller tree under the larger tree's root to keep trees flat.

## Why this works

Initially every node is its own component. Each edge that connects two previously separate components reduces the component count by exactly 1. Edges within an existing component don't reduce the count (the roots are the same, so we skip the union). The final value of `components` is exactly the number of distinct roots.

## Complexity
- Time: O(n * α(n)) where α is the inverse Ackermann function — effectively O(n) for all practical inputs. Each of the n + edges operations is nearly O(1) amortized with path compression and union by rank.
- Space: O(n) for the parent and rank arrays.
