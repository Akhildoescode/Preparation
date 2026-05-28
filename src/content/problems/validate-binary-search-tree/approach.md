## Understanding the problem
Verify that a binary tree satisfies the BST property: for every node, ALL nodes in its left subtree are strictly less than the node's value, and ALL nodes in its right subtree are strictly greater. Checking only immediate children is insufficient — a node must be in the valid range for its entire ancestry.

## Brute force
For every node, scan all nodes in its left and right subtrees and verify the property. O(n²). Alternatively, in-order traversal should produce a strictly increasing sequence for a valid BST — if any value is ≤ the previous, it's invalid. O(n) but requires tracking state.

## Key insight
Pass a valid range [min, max] (exclusive bounds) down the tree. When descending left, tighten the max (node's value). When descending right, tighten the min. A node is invalid if it falls outside its range.

## Optimal approach — DFS with bounds
`isValid(node, min, max)`:
- If node is null: return true (empty subtree is valid).
- If node.val ≤ min or node.val ≥ max: return false (out of bounds).
- Recurse: `isValid(node.left, min, node.val)` AND `isValid(node.right, node.val, max)`.
- Start with `isValid(root, Long.MIN_VALUE, Long.MAX_VALUE)`.

Use `long` bounds to handle the edge cases where node values equal `Integer.MIN_VALUE` or `Integer.MAX_VALUE`.

Trace tree `[5, 1, 4, null, null, 3, 6]`:
- isValid(5, -∞, +∞): 5 in range. Recurse left and right.
- isValid(1, -∞, 5): 1 < 5 ✓. No children.
- isValid(4, 5, +∞): 4 ≤ 5 → INVALID. Return false. ✓

## Why this works
The range tightens at each level — left children get an upper bound of their parent's value, right children get a lower bound. This correctly propagates constraints from all ancestors, not just the immediate parent. A value violates the BST property if it violates ANY ancestor's constraint, and the range captures all such constraints simultaneously.

## Complexity
- Time: O(n) — visit each node once.
- Space: O(h) for the recursion stack.
