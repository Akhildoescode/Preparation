## Understanding the problem
Given the root of a binary tree, mirror it: for every node in the tree, swap its left and right children. Return the root of the now-inverted tree. The values stay in the nodes — only the pointers change.

## Brute force
There is no worse approach to present here — any solution must visit every node once to swap its children, so O(n) is optimal. You could traverse in any order (pre, post, BFS) and swap at each node. The interesting choice is which traversal order is most natural to explain.

## Key insight
Swapping the children of a node and recursively inverting both subtrees produces the mirror regardless of which order you do it in. The cleanest recursive formulation is: invert the left subtree, invert the right subtree, then swap the two child pointers. This is post-order DFS. Alternatively, swap first, then recurse (pre-order) — both are correct.

## Optimal approach — Recursive tree_dfs (post-order or pre-order)
- Pattern: tree_dfs, in-place mutation.
- Base case: if `node == null`, return null.
- Post-order variant:
  1. Recurse: `invertTree(node.left)`, `invertTree(node.right)`.
  2. Swap: `TreeNode tmp = node.left; node.left = node.right; node.right = tmp`.
  3. Return `node`.
- Invariant: when `invertTree(node)` returns, the entire subtree rooted at `node` is fully inverted.
- BFS iterative alternative: use a queue; for each dequeued node, swap its children and enqueue both non-null children.

## Why this works
Swapping a node's children and then inverting those (now-swapped) subtrees is equivalent to inverting the entire subtree. The base case (null) ensures we don't crash, and we always return the node so callers can chain results if needed. Since every node is visited exactly once, no swap is missed or double-applied.

## Complexity
- Time: O(n) because every node is visited exactly once.
- Space: O(h) for the recursion stack. O(log n) for a balanced tree, O(n) for a skewed tree.
