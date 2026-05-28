## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        var result = new ArrayList<Integer>();
        if (root == null) return result;

        // BFS queue — LinkedList supports O(1) offer/poll
        var queue = new ArrayDeque<TreeNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            // Snapshot current level size before enqueueing next level's nodes
            int levelSize = queue.size();

            for (int i = 0; i < levelSize; i++) {
                var node = queue.poll();

                // Only the last node in this level is visible from the right
                if (i == levelSize - 1) {
                    result.add(node.val);
                }

                // Enqueue children left-to-right so the rightmost child
                // is naturally the last one processed in the next level
                if (node.left  != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }

        return result;
    }
}
```

## Line-by-line notes
- **Line 8 (`ArrayDeque`):** `ArrayDeque` is preferred over `LinkedList` as a queue — it avoids the object-per-node allocation overhead of LinkedList and has better cache performance.
- **Line 12 (`levelSize = queue.size()`):** Snapshotting before the inner loop is the key technique. Without this, `queue.size()` would grow as we enqueue children mid-loop, breaking the level boundary.
- **Line 17 (`i == levelSize - 1`):** Exactly the last node per level. An alternative is to store in a variable on every iteration and `result.add(lastNode.val)` after the inner loop.
- **Lines 23-24 (enqueue left before right):** Order matters — left first ensures right is last, so the rightmost node is processed last in the level.

## Common bugs to avoid
- **Not snapshotting queue.size():** Using `queue.size()` directly in the `for` loop condition will read a changing size as children are added, causing you to process nodes from the next level prematurely.
- **Enqueueing null children:** Adding null to the queue causes a NullPointerException on the next `node.val` access. Always guard with `!= null`.
- **Returning the first node instead of the last:** If you add `result.add(node.val)` when `i == 0` you get the left-side view instead.
