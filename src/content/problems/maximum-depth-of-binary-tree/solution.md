## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    public int maxDepth(TreeNode root) {
        // Null subtree contributes 0 depth — this is the base case that
        // stops both the left and right recursive chains
        if (root == null) return 0;

        // Post-order: evaluate children before using their results
        var leftDepth  = maxDepth(root.left);
        var rightDepth = maxDepth(root.right);

        // This node adds exactly 1 to whichever child subtree is deeper
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
```

## Line-by-line notes
- **Line 3 (`if root == null`):** Returning 0 for null encodes "no nodes here", so every leaf naturally reports 1 (1 + max(0, 0)). Without this the recursion has no termination condition.
- **Line 7-8 (`leftDepth`, `rightDepth`):** Using `var` keeps the code clean; both are inferred as `int`. We resolve both children before combining — that's what makes this post-order.
- **Line 11 (`1 + Math.max`):** The +1 counts the current node itself. Taking the max of the two children ensures we follow the deeper branch.

## Common bugs to avoid
- **Off-by-one on depth definition:** If the problem says "depth in edges" instead of "depth in nodes", the single-node case returns 0, not 1. Clarify in the interview.
- **Forgetting the null check:** Calling `root.left` on null causes a NullPointerException. The base case must come first.
- **Returning leftDepth + rightDepth instead of max:** That mistake computes the diameter, not the depth — a common mix-up when solving diameter-of-binary-tree nearby.
