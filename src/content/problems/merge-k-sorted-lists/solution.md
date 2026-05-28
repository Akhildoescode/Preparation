## Reference solution

**Complexity:** O(n log k) time, O(k) space.

```java
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Min-heap ordered by node value
        var heap = new PriorityQueue<ListNode>(Comparator.comparingInt(n -> n.val));

        // Seed heap with the head of each non-null list
        for (var list : lists) {
            if (list != null) heap.offer(list);
        }

        // Dummy head simplifies the result list construction
        var dummy = new ListNode(0);
        var tail = dummy;

        while (!heap.isEmpty()) {
            // The globally smallest remaining node
            var node = heap.poll();
            tail.next = node;
            tail = tail.next;

            // Add the next node from the same list (if it exists)
            if (node.next != null) heap.offer(node.next);
        }

        return dummy.next;
    }
}
```

## Line-by-line notes
- **`Comparator.comparingInt(n -> n.val)`:** Creates a min-heap comparing nodes by their integer value. Lambda is concise; alternatively `(a, b) -> a.val - b.val` works but can overflow for extreme values — `comparingInt` is safer.
- **Null check before `heap.offer`:** Lists array may contain null entries (empty lists). Offering null to a PriorityQueue throws `NullPointerException`.
- **Dummy head:** Avoids the "is this the first node?" special case. `tail` starts at `dummy` and advances with each added node. Return `dummy.next` skips the dummy.
- **`heap.offer(node.next)`:** After consuming the minimum node from a list, push its successor. The heap always holds at most one node per list, ensuring the heap size stays ≤ k.
- **`tail = tail.next`:** Advance `tail` to the newly appended node. Don't forget this — without it, every node gets appended to the same `tail` position.

## Common bugs to avoid
- **Not null-checking list heads before offering:** Causes NPE on empty list inputs.
- **Using subtraction `(a, b) -> a.val - b.val` for comparison:** Overflows when one value is near `Integer.MIN_VALUE` and the other near `Integer.MAX_VALUE`. Use `Integer.compare(a.val, b.val)` or `Comparator.comparingInt`.
- **Forgetting to advance `tail`:** Without `tail = tail.next`, all nodes get linked off the dummy and the list never grows beyond 1 element.
