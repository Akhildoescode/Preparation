## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Nothing to invert in an empty subtree
        if (root == null) return null;

        // Post-order: fully invert both subtrees before touching this node's pointers
        invertTree(root.left);
        invertTree(root.right);

        // Swap the two child pointers — this is the only mutation needed
        var tmp    = root.left;
        root.left  = root.right;
        root.right = tmp;

        // Return the root so callers can chain (e.g., root = invertTree(root))
        return root;
    }
}
```

## Line-by-line notes
- **Line 3 (null check):** Recursion terminates here. Without it, `root.left` on line 7 would throw NullPointerException for leaf nodes.
- **Lines 7-8 (recurse first):** Post-order ensures subtrees are fully mirrored before we swap the pointers at this node. Pre-order (swap first, then recurse) also works — either order is acceptable.
- **Lines 11-13 (three-variable swap):** A classic in-place swap using a temp variable. Java has no destructuring swap, so the temp variable is necessary.
- **Line 16 (return root):** The problem asks us to return the root. Since we modify in-place, the root node identity doesn't change — we just return it as-is.

## Common bugs to avoid
- **Forgetting to return the node:** The method signature returns `TreeNode`. Returning `void` or forgetting `return root` will cause a compile error or a null return.
- **Swapping values instead of pointers:** `int tmp = root.left.val; root.left.val = root.right.val; ...` — this is wrong when a child is null (NPE) and semantically wrong (it changes values, not structure).
- **Only swapping the root's children:** A common off-by-one is writing the swap logic outside the recursion rather than inside, so only the top level gets inverted.
