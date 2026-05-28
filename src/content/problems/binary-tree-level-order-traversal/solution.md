## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        var result = new ArrayList<List<Integer>>();
        if (root == null) return result;

        var queue = new ArrayDeque<TreeNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // snapshot: nodes at current level
            var level = new ArrayList<Integer>();

            for (int i = 0; i < levelSize; i++) {
                var node = queue.poll();
                level.add(node.val);

                // Enqueue children for the next level
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(level);
        }

        return result;
    }
}
```

## Line-by-line notes
- **`ArrayDeque` over `LinkedList`:** `ArrayDeque` is the recommended general-purpose queue in Java. It's faster than `LinkedList` for FIFO operations and does not permit null elements (which is fine here since we null-check before offering).
- **`int levelSize = queue.size()`:** Snapshot the current size BEFORE the inner loop. Nodes added to the queue during the loop (children) belong to the next level. Without snapshotting, the loop would process them in the same level.
- **`for (int i = 0; i < levelSize; i++)`:** Process exactly the current level's nodes, no more. This is cleaner than using a second queue or markers.
- **Null check before returning:** An early return for null root avoids the initial `queue.offer(null)` which would throw NPE.
- **`result.add(level)` after the inner loop:** Each level list is added once it's fully built. Don't add inside the inner loop.

## Common bugs to avoid
- **Using `queue.size()` inside the loop condition:** `while (queue.size() == levelSize)` would be wrong — size changes as children are added. Snapshot before the loop.
- **Not null-checking before `queue.offer`:** TreeNode children can be null. Offering null to ArrayDeque throws NPE.
- **Adding the level list by reference before it's complete:** If you call `result.add(level)` before the inner for loop, the reference is correct but the content is empty — it gets populated after, which works in Java (add-by-reference), but it's confusing. Build first, add after.
