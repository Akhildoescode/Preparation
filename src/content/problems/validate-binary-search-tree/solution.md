## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;

        // Node value must be strictly inside (min, max)
        if (node.val <= min || node.val >= max) return false;

        // Left subtree: all values must be < node.val (tighten max)
        // Right subtree: all values must be > node.val (tighten min)
        return validate(node.left, min, node.val)
            && validate(node.right, node.val, max);
    }
}
```

## Line-by-line notes
- **`Long.MIN_VALUE` and `Long.MAX_VALUE`:** Using `long` bounds avoids edge cases where node values are `Integer.MIN_VALUE` or `Integer.MAX_VALUE`. If bounds were `int`, a node with value `Integer.MIN_VALUE` would fail the `> Integer.MIN_VALUE` check incorrectly (if the problem uses strict inequality, which it does).
- **`node.val <= min || node.val >= max`:** Strict inequalities — equal values are not allowed in a BST (strictly ordered). If the problem allowed duplicates in the left subtree, you'd adjust to `< min || >= max`.
- **`validate(node.left, min, node.val)`:** The current node's value becomes the new max for the left subtree — all left descendants must be strictly less than `node.val`.
- **`validate(node.right, node.val, max)`:** Symmetric: all right descendants must be strictly greater than `node.val`.
- **Short-circuit `&&`:** If the left subtree is invalid, the right subtree isn't checked (early exit). This is the standard Java behavior.

## Common bugs to avoid
- **Checking only immediate children:** `node.left.val < node.val && node.right.val > node.val` fails for trees like `[5, 1, 6, null, null, 3, 7]` where 3 is in the right subtree of 5 but left child of 6 — 3 < 5, violating the BST property even though 3 < 6.
- **Using `int` for bounds:** Values of exactly `Integer.MIN_VALUE` or `Integer.MAX_VALUE` cause incorrect comparisons.
- **Passing `node.val` as min and max without long cast:** If `node.val = Integer.MAX_VALUE`, and you store it in an `int min`, then `node.right.val > min` where `node.right.val = Integer.MAX_VALUE` — the comparison is `MAX_VALUE > MAX_VALUE` which is false, correctly rejected. But using `long` makes this explicit and safe.
