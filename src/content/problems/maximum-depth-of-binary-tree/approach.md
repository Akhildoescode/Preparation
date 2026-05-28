## Understanding the problem
Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf. A single node has depth 1, and a null tree has depth 0.

## Brute force
The obvious approach is also the correct one here: visit every node. There is no shortcut because any node could be on the deepest path, so you must check all paths. A naive BFS or DFS both work, but any approach that recomputes depth from scratch for each node would be O(n²).

## Key insight
The maximum depth of a node is exactly 1 plus the maximum of the depths of its two children. This recurrence bottoms out at null (depth 0), making a single post-order DFS both necessary and sufficient. There is nothing more efficient than O(n) because you must visit every node.

## Optimal approach — Recursive tree_dfs (post-order)
- Pattern: tree_dfs, post-order (children evaluated before parent).
- Base case: if `node == null`, return 0.
- Recursively compute `leftDepth = maxDepth(node.left)`.
- Recursively compute `rightDepth = maxDepth(node.right)`.
- Return `1 + Math.max(leftDepth, rightDepth)`.
- The invariant is: the return value of `maxDepth(node)` is always the correct depth of the subtree rooted at that node.

## Why this works
Because we recurse all the way to null before returning, every leaf reports depth 1 back to its parent. Each internal node then picks the deeper branch and adds 1 for itself. By the time the call at the root returns, it has considered every root-to-leaf path exactly once through the recursion stack.

## Complexity
- Time: O(n) because every node is visited exactly once.
- Space: O(h) because the recursion stack is proportional to tree height h. That is O(log n) for balanced trees and O(n) worst case for skewed trees.
