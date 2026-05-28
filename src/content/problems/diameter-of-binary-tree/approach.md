## Understanding the problem
The diameter of a binary tree is the length of the longest path between any two nodes. The path may or may not pass through the root. Length is measured in edges (not nodes). At each node, the longest path through that node is the sum of its left subtree depth and right subtree depth.

## Brute force
For each node, recursively compute the max depth of the left and right subtrees, and treat their sum as a candidate diameter. If you recompute depths from scratch for each node, you get O(n²).

## Key insight
Use post-order DFS: compute the depth of each subtree in a bottom-up manner. At each node, the potential diameter through that node = `leftDepth + rightDepth`. Update a global maximum with this value. The function returns the depth (not the diameter) so the parent can use it.

## Optimal approach — Post-order DFS
- Global variable `maxDiameter = 0`.
- `depth(node)`:
  - If node is null, return 0.
  - `leftDepth = depth(node.left)`
  - `rightDepth = depth(node.right)`
  - `maxDiameter = max(maxDiameter, leftDepth + rightDepth)` — path through this node.
  - Return `1 + max(leftDepth, rightDepth)` — depth from this node downward.

Note: the function computes **depth** (number of edges to the deepest leaf), but we update `maxDiameter` as a side effect with the **diameter** through each node.

## Why this works
Every path in a tree has a highest node (the LCA of the path's endpoints). At that highest node, the path goes down into the left subtree for some depth and down into the right subtree for some depth. By computing the depth at every node via post-order DFS, we evaluate every possible highest node exactly once, in O(n).

## Complexity
- Time: O(n) — each node is visited exactly once.
- Space: O(h) where h is the height of the tree (recursion stack). O(log n) for balanced trees, O(n) worst case for skewed trees.
