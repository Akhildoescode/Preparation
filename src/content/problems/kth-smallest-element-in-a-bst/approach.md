## Understanding the problem
Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) among all node values in the BST. You are guaranteed that k is valid (1 ≤ k ≤ number of nodes).

## Brute force
Collect all node values into a list via any traversal, sort the list, return index k-1. This is O(n log n) time and O(n) space — the sort is wasteful because a BST is already implicitly sorted.

## Key insight
In a BST, in-order traversal (left → root → right) visits nodes in strictly ascending order. So the kth node visited in an in-order traversal is the kth smallest. This lets us stop as soon as we have visited k nodes, giving O(h + k) time instead of O(n log n).

## Optimal approach — In-order DFS with early termination (bst pattern)
- Pattern: bst, in-order traversal.
- Maintain two counters: `count` (nodes visited so far) and `result` (the answer once found).
- In-order helper `inorder(node)`:
  - If node is null or result already found, return early.
  - Recurse left: `inorder(node.left)`.
  - Increment `count`. If `count == k`, set `result = node.val` and return.
  - Recurse right: `inorder(node.right)`.
- Invariant: at any point, `count` equals the number of BST nodes visited in sorted order so far.

## Why this works
In-order traversal of a BST guarantees ascending order because every left child is smaller than its parent, which is smaller than every right child. By counting nodes as we visit them in this order, the kth visit is exactly the kth smallest. Early termination means we skip the right subtrees of all ancestors once we have found the answer.

## Complexity
- Time: O(h + k) where h is the tree height. We traverse down h levels to reach the leftmost (smallest) node, then visit k nodes. For a balanced tree, h = O(log n), giving O(log n + k).
- Space: O(h) for the recursion stack.
