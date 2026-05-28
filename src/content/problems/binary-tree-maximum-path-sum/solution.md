## Reference solution

**Complexity:** O(n) time, O(h) space.

```java
class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;

        // Only use a subtree's gain if it's positive (clamp negative gains to 0)
        int leftGain = Math.max(0, maxGain(node.left));
        int rightGain = Math.max(0, maxGain(node.right));

        // Path through this node (can use both sides — this is the "bend" point)
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);

        // Return the best single extension upward (one side only)
        return node.val + Math.max(leftGain, rightGain);
    }
}
```

## Line-by-line notes
- **`Integer.MIN_VALUE`:** Initialize `maxSum` to the smallest possible value — handles trees where all values are negative (e.g., `[-3]` should return -3, not 0).
- **`Math.max(0, maxGain(node.left))`:** "Clamp to 0" — if the left subtree has a net negative gain, we simply don't include it. A path from just the current node (or current + better subtree) is always better than including a negative subtree.
- **`node.val + leftGain + rightGain`:** This is the sum of the path that "bends" at the current node — goes into the left subtree, comes back up through the current node, and continues into the right subtree. This value is updated into `maxSum` but NOT returned.
- **`node.val + Math.max(leftGain, rightGain)`:** The parent can only extend the path in one direction. Return the best single-direction extension. If both gains are 0 (both subtrees are negative), return just `node.val`.

## Common bugs to avoid
- **Initializing `maxSum` to 0:** For all-negative trees, the correct answer is the least-negative node, not 0. `Integer.MIN_VALUE` handles this.
- **Returning `node.val + leftGain + rightGain` from `maxGain`:** This would allow the parent to extend a "bent" path upward — creating an illegal branching path. Only return the single-direction extension.
- **Not clamping negative gains to 0:** Without `max(0, ...)`, a negative subtree would incorrectly reduce the path sum at its parent. Clamping lets us "skip" bad subtrees.
