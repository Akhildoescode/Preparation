## Understanding the problem
Given a binary tree and an integer `targetSum`, find all root-to-leaf paths where the sum of node values along the path equals `targetSum`. A leaf is a node with no children. Return all such paths as a list of lists, where each inner list contains the node values from root to leaf in order.

## Brute force
Enumerate all root-to-leaf paths (there are O(n) of them), compute each sum, and collect those equaling `targetSum`. This is already O(n) in the number of nodes, so there is no asymptotically worse brute force. The challenge is doing this cleanly without building a new list for every candidate path.

## Key insight
Use DFS with a single mutable path list shared across recursive calls. As you go deeper, append the current node's value. When you reach a leaf and the remaining sum hits zero, snapshot the current path (via `new ArrayList<>(path)`) and add it to results. Then remove the last element before returning — this is the backtracking step that reuses the same list efficiently.

## Optimal approach — Recursive tree_dfs with backtracking
- Pattern: tree_dfs + backtracking.
- State carried: `path` (current root-to-node values), `remaining` (targetSum minus sum of nodes seen so far).
- Base case: if `node == null`, return.
- Append `node.val` to `path`. Subtract `node.val` from `remaining`.
- If `node` is a leaf (no children) and `remaining == 0`: add `new ArrayList<>(path)` to results.
- Recurse on `node.left` and `node.right`.
- Backtrack: remove the last element from `path`.
- Invariant: when we enter `dfs(node, remaining)`, `path` contains exactly the nodes from the root down to node's parent, and `remaining` is `targetSum` minus the sum of those nodes.

## Why this works
By decrementing `remaining` and appending to `path` on the way down, then restoring both on the way back up, the DFS explores every root-to-leaf path exactly once. The `new ArrayList<>(path)` copy is necessary because `path` is mutated further after the copy is taken. Checking at leaves only (not at internal nodes) is correct because the problem defines paths as root-to-leaf.

## Complexity
- Time: O(n) to visit all nodes, plus O(n) per valid path snapshot (copying a path of length up to n). In the worst case (all paths match, complete binary tree), there are O(n) leaves each with an O(log n) path, giving O(n log n) total.
- Space: O(n) for the path list and O(h) for the recursion stack. O(n) overall.
