## Understanding the problem

You are given a reference to a node in a connected undirected graph. Each node contains an integer `val` and a list of `neighbors`. Return a deep clone of the entire graph — every node must be a new object and every neighbor reference must point to the cloned counterpart, not the original.

## Brute force

A naive approach might try to serialize the graph to an adjacency list, then rebuild it. This works but involves two full passes and extra intermediate data structures. The same result is achievable in a single DFS/BFS traversal.

## Key insight

The main challenge is handling cycles and shared references — a node can be the neighbor of multiple other nodes, so you must not clone it twice. A `HashMap<Node, Node>` that maps each original node to its clone acts as both a visited set (preventing infinite loops) and a lookup table (so every reference to the same original resolves to the same clone).

## Optimal approach

Pattern: **graph\_dfs + hashing**.

1. Create a `HashMap<Node, Node>` called `cloned`.
2. Define `dfs(node)`:
   - If `node` is null, return null.
   - If `cloned` already contains `node`, return `cloned.get(node)` — the clone already exists.
   - Create a new `Node(node.val)` and immediately put it in `cloned` before recursing (critical: prevents infinite loops on cycles).
   - For each neighbor of `node`, call `dfs(neighbor)` and add the result to the new node's neighbor list.
   - Return the new node.
3. Return `dfs(given node)`.

## Why this works

By inserting the cloned node into the map before recursing into its neighbors, we break any back-edge cycle — when DFS revisits a node already in the map it returns immediately with the existing clone. Every edge in the original graph is mirrored exactly once in the clone.

## Complexity
- Time: O(V + E) because each node is visited exactly once and each edge is processed exactly once during the DFS traversal.
- Space: O(V) because the HashMap stores one entry per node, and the recursion call stack depth is at most V in the worst case (a path graph).
