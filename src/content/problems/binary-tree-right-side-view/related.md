## Same pattern, different problem
- **Binary Tree Level Order Traversal:** The identical BFS loop, but instead of recording only the last node per level, you record every node per level into a sub-list.
- **Maximum Depth of Binary Tree:** BFS is an alternative implementation — the answer equals the number of levels processed, demonstrating the same level-counting technique.
- **Kth Smallest Element in a BST:** Contrasts nicely — that problem demands DFS (in-order), while this one is the canonical BFS problem. Good to know both.
- **Binary Tree Zigzag Level Order Traversal:** Extends this exact BFS loop by alternating between appending to the front vs back of each level's result list.

## When this pattern applies
Use BFS with a level-size snapshot whenever you need per-level aggregation: rightmost node, leftmost node, level averages, level sums, or zigzag collection. The invariant is that `queue.size()` at the start of each outer loop iteration equals the node count for exactly the current level. Any problem phrased as "for each row/depth/level, compute X" maps directly to this pattern.
