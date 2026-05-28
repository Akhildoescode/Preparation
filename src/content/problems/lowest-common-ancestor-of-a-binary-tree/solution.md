## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base cases: empty subtree or found one of the targets
        if (root == null || root == p || root == q) return root;

        // Search both subtrees
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // If both sides found something, this node is the LCA
        if (left != null && right != null) return root;

        // Otherwise propagate whichever side found something
        return left != null ? left : right;
    }
}
```

## Line-by-line notes
- **`root == p || root == q` early return:** If the current node IS one of the targets, return it immediately. We don't recurse further — if the other target is in this node's subtree, this node is still the LCA (a node is its own ancestor by definition).
- **Recurse then inspect:** Post-order structure — compute left and right results before deciding what to return. This is the key to the O(n) single-pass solution.
- **`left != null && right != null` → return `root`:** This is the "split" case: p is in one subtree, q is in the other. The current node is the lowest common ancestor.
- **`return left != null ? left : right`:** If only one side found a target (or the LCA), propagate it upward. This also handles the case where both are null (return null).
- **Node identity check `==`:** We compare by reference, not by value. This is correct — `p` and `q` are specific tree nodes, not values.

## Common bugs to avoid
- **Recursing past a found target:** Without the `root == p || root == q` early return, you'd miss the case where one target is an ancestor of the other.
- **Checking `root.val == p.val` instead of `root == p`:** If the tree has duplicate values, reference equality is the correct check. Value equality could match the wrong node.
- **Not handling both-null case:** `left != null ? left : right` returns `right` when `left` is null — which could be `null` itself. This is correct behavior (null propagates up for subtrees that contain neither p nor q).
