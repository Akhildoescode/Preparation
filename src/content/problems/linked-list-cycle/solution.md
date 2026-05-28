## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public boolean hasCycle(ListNode head) {
        // empty list or single node with no self-loop cannot have a cycle
        if (head == null || head.next == null) return false;

        var slow = head;
        var fast = head;

        // fast advances 2 steps; if it hits null the list is acyclic
        while (fast != null && fast.next != null) {
            slow = slow.next;           // tortoise: 1 step
            fast = fast.next.next;      // hare: 2 steps

            // meeting point proves a cycle exists
            if (slow == fast) return true;
        }

        return false;  // fast reached the end — no cycle
    }
}
```

## Line-by-line notes
- **Null guard upfront:** Prevents a NullPointerException on the very first `fast.next.next` dereference when the list is empty or has exactly one node with `next == null`.
- **`fast != null && fast.next != null`:** Both checks are required — `fast != null` guards the first `.next`, and `fast.next != null` guards the second `.next.next`.
- **Reference equality `slow == fast`:** We compare node identity (pointer equality), not node values. Two different nodes could hold the same value but the cycle is about structure, not data.
- **`slow` and `fast` both start at `head`:** They don't collide immediately because the loop body moves them before the equality check.

## Common bugs to avoid
- Checking `fast.next != null` but forgetting `fast != null` — NPE if fast lands exactly on null.
- Comparing node values with `.val` instead of node references — incorrect for lists where multiple nodes share the same value.
- Initialising slow and fast at different nodes — they must start at the same position for the relative-speed argument to hold from the beginning.
