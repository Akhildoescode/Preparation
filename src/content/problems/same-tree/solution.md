## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Both subtrees are empty — trivially the same
        if (p == null && q == null) return true;

        // Exactly one is empty — structural mismatch, no need to look further
        if (p == null || q == null) return false;

        // Values differ at this position — trees are not the same
        if (p.val != q.val) return false;

        // This node matches; tree is same only if BOTH subtree pairs also match
        // Short-circuit: if left subtrees differ, we skip the right check entirely
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

## Line-by-line notes
- **Line 3 (both null):** Placed first because accessing `.val` on null would crash; this guard makes the two lines below safe.
- **Line 6 (one null):** After the both-null check, `p == null || q == null` means exactly one is null — a structural difference.
- **Line 9 (`p.val != q.val`):** We only reach here if both nodes are non-null, so this is safe. Using `!=` on int primitives is exact.
- **Line 13 (`&&` short-circuit):** If the left subtrees already differ, Java will not evaluate `isSameTree(p.right, q.right)`, saving work in practice.

## Common bugs to avoid
- **Wrong order of null checks:** Checking `p.val != q.val` before the null guards causes a NullPointerException when one node is null.
- **Using `|` instead of `||`:** Removes short-circuiting and evaluates the right subtree even when the left already returned false — still correct, but wasteful and a red flag to interviewers.
- **Forgetting to check both children:** Returning `isSameTree(p.left, q.left)` alone without also checking right subtrees is a common incomplete recursion bug.
