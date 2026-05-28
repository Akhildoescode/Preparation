## Same pattern, different problem
- **Diameter of Binary Tree (#543):** Identical structure — post-order DFS, return depth upward, update global max with left+right at each node. The only difference: diameter uses depth (always non-negative) so no clamping to 0 is needed.
- **Lowest Common Ancestor (#236):** Also post-order DFS that makes decisions based on what comes back from both subtrees. The "combine left and right results at the LCA node" reasoning is the same.
- **Maximum Average Subarray (#643):** Similar "sliding window / best prefix" thinking but for arrays, not trees.
- **Path Sum II (#113):** DFS that collects paths — the complement of this problem: instead of finding the max-sum path, enumerate all paths with a given sum.

## When this pattern applies
Use **post-order DFS with `max(0, childGain)` clamping** when you need the best path through a tree that can "bend" at any node and the values can be negative. The `max(0, ...)` clamping is the key: it lets you say "I'll only include this subtree if it adds value." The function returns the best *linear* extension (single direction) so the parent can continue the path upward, while the global max captures the best *bent* path at every node.
