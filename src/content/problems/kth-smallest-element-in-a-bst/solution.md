## Reference solution

**Complexity:** O(h + k) time, O(h) space.

```java
class Solution {
    // Using instance variables avoids threading a mutable counter through return values
    private int count  = 0;
    private int result = 0;

    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return result;
    }

    private void inorder(TreeNode node, int k) {
        // Skip null nodes and any nodes visited after we already found the answer
        if (node == null || count >= k) return;

        // In-order: left first — smallest values live in the leftmost path
        inorder(node.left, k);

        // Visit this node: it is the next smallest value in the BST
        count++;
        if (count == k) {
            result = node.val;
            return;  // Early termination — no need to visit the right subtree
        }

        // Only explore right subtree if we still haven't found kth smallest
        inorder(node.right, k);
    }
}
```

## Line-by-line notes
- **Lines 3-4 (instance vars):** Keeping `count` and `result` as fields avoids passing them as arrays or int[] wrappers just to simulate mutability. In a real codebase you would scope these to the method via a helper class or int[]; fields work cleanly in a LeetCode context.
- **Line 14 (`count >= k`):** The early exit guard prevents continuing the traversal after we have already found the answer. Without this, the recursion would needlessly visit all remaining nodes.
- **Line 17 (left before self before right):** This is the definition of in-order. Reversing to right-first would give descending order (kth largest).
- **Line 22 (`return`):** Once we set `result`, we return immediately. The guard on line 14 (`count >= k`) prevents the right subtree call on line 25 from doing anything even if it is reached due to the stack unwinding.

## Common bugs to avoid
- **Using pre-order or post-order:** Only in-order gives ascending order in a BST. Using pre-order visits the root before its smaller left children.
- **Not resetting instance variables between test cases:** LeetCode reuses the `Solution` object in some test harnesses. Declare and initialize `count` and `result` inside `kthSmallest` or reset them at the method entry.
- **Off-by-one on k:** The problem is 1-indexed. Initializing `count = 0` and triggering at `count == k` is correct; starting at `count = 1` and triggering at `count == k` would return the (k-1)th element.
