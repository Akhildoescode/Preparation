## Understanding the problem
Given a binary tree (not necessarily a BST) and two nodes p and q (both guaranteed to exist), find their lowest common ancestor — the deepest node that is an ancestor of both. A node is considered an ancestor of itself.

## Brute force
Find the path from root to p and from root to q. The last common node on both paths is the LCA. O(n) time, O(n) space for both paths.

## Key insight
Post-order DFS: if the current node is p or q, return it. Otherwise, recurse on both subtrees. If both sides return non-null, the current node is the LCA. If only one side returns non-null, the LCA (or one of the targets) is in that subtree — propagate it upward.

## Optimal approach — Post-order DFS
`lca(node, p, q)`:
- If node is null, return null.
- If node == p or node == q, return node.
- `left = lca(node.left, p, q)`.
- `right = lca(node.right, p, q)`.
- If both `left` and `right` are non-null: `node` is the LCA (p and q are in different subtrees). Return `node`.
- Else return whichever of `left` or `right` is non-null (or null if both are null).

Trace tree `[3,5,1,6,2,0,8]`, p=5, q=1:
- At node 3: lca(5, 5,q)→5, lca(1, 5,q)→1. Both non-null → return 3. ✓

Trace p=5, q=4 (4 is right child of 2 which is right child of 5):
- At node 5: we return 5 immediately. The recursive call on 5's subtree would find 4, but since we return 5 at node 5 itself, it propagates up and the parent sees only one non-null result → propagates 5 as the LCA. ✓

## Why this works
If a node is p or q, it could be the LCA (if the other is in its subtree). We return it immediately and let the parent decide. If both children return non-null values, this is the split point — the LCA. The problem guarantees both p and q exist, so one or both sides will always find something.

## Complexity
- Time: O(n) — every node visited once.
- Space: O(h) for the recursion stack.
