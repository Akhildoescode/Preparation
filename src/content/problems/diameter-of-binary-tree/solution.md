## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return maxDiameter;
    }

    private int depth(TreeNode node) {
        if (node == null) return 0;

        int leftDepth = depth(node.left);
        int rightDepth = depth(node.right);

        // The longest path through this node is leftDepth + rightDepth edges
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

        // Return the depth of this subtree to the parent
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
```

## Line-by-line notes
- **Instance variable `maxDiameter`:** Java doesn't have pass-by-reference for primitives. Using an instance variable (or a length-1 int array) allows the recursion to update a shared counter without returning it. This is the standard Java pattern for this type of "side effect inside recursion" problem.
- **`depth(node)` returns edge count, not node count:** Returning 1 + max(left, right) gives the number of edges to the deepest leaf. A leaf returns 1 (one edge up to its parent), null returns 0. This ensures `leftDepth + rightDepth` correctly counts edges through the current node.
- **Update `maxDiameter` before returning:** The diameter candidate is computed at the current node (where the path bends), not returned upward. The return value carries depth information only.
- **`maxDiameter` is initialized to 0:** For a single-node tree (no edges), the correct answer is 0, and the inner `depth` call updates with 0+0=0 — no change needed.

## Common bugs to avoid
- **Returning node count instead of edge count:** If `depth` returns `1 + max(...)` where the base case returns 1 (not 0), the diameter calculation (leftDepth + rightDepth) overcounts by 2. The null-returns-0 convention gives edge counts.
- **Updating `maxDiameter` in the caller instead of inside `depth`:** Without the update inside `depth`, you'd have to call depth twice per node (once for left, once for right), giving O(n²).
- **Conflating diameter with depth:** The function computes depth but the caller uses `maxDiameter`, which is updated internally. Don't return `maxDiameter` from `depth`.
