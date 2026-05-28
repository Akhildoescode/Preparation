## Same pattern, different problem
- **Maximum Depth of Binary Tree:** Same post-order tree_dfs skeleton; instead of comparing two nodes, it combines two integer depths with Math.max.
- **Invert Binary Tree:** Also visits every node exactly once via DFS but performs a mutation (swap children) rather than a comparison.
- **Construct Binary Tree from Preorder and Inorder Traversal:** The inverse operation — given traversal arrays, rebuild the tree that isSameTree could then verify.
- **Lowest Common Ancestor of a Binary Tree:** Recurses on both subtrees and combines boolean signals back up to the root, the same structural pattern as this problem.

## When this pattern applies
Use simultaneous dual-tree DFS whenever you need to compare, merge, or relate two trees node by node. The pattern works because trees have the same recursive structure — a node and its two subtrees — so you can zip two trees together in one traversal. The key invariant is that the function answers a well-defined yes/no (or value) question about exactly the pair of subtrees given to it, with null handled at the very top.
