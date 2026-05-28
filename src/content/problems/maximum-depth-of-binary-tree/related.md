## Same pattern, different problem
- **Diameter of Binary Tree:** Uses the same post-order DFS returning depth, but tracks `leftDepth + rightDepth` as a side-effect maximum instead of combining them with max.
- **Binary Tree Maximum Path Sum:** Same post-order structure but the combine step tracks a running global maximum and clamps negative contributions with Math.max(0, childValue).
- **Same Tree:** Also a pure post-order tree_dfs that recurses on both children before making a decision at the current node.
- **Path Sum II:** Extends depth-first tree traversal by carrying a mutable path list and backtracking, showing how DFS state can accumulate across levels.

## When this pattern applies
Reach for recursive post-order DFS whenever a node's answer depends entirely on answers already computed for its subtrees — the "bottom-up aggregation" pattern. It is the go-to for any problem that asks for a property of the whole tree (depth, diameter, path sum) where each node contributes exactly one unit of information upward. The key signal is that the return value of the recursive function is *used by the parent*, not discarded.
