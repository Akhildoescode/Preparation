## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public void reorderList(ListNode head) {
        // nothing to reorder for 0 or 1 nodes
        if (head == null || head.next == null) return;

        // ── Step 1: find the midpoint ──────────────────────────────────────
        var slow = head;
        var fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // slow is now the last node of the first half
        var secondHalf = slow.next;
        slow.next = null;   // sever the two halves

        // ── Step 2: reverse the second half ───────────────────────────────
        ListNode prev = null;
        var curr = secondHalf;
        while (curr != null) {
            var next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // prev is now the head of the reversed second half

        // ── Step 3: merge the two halves by alternating nodes ─────────────
        var first = head;
        var second = prev;
        while (second != null) {
            var firstNext = first.next;   // save before overwrite
            var secondNext = second.next; // save before overwrite

            first.next = second;          // L0 → Ln
            second.next = firstNext;      // Ln → L1

            first = firstNext;            // advance first pointer
            second = secondNext;          // advance second pointer
        }
    }
}
```

## Line-by-line notes
- **`fast.next != null && fast.next.next != null`:** Stops fast one node before the end rather than at the end, placing slow at the last node of the first half — making the cut clean.
- **`slow.next = null`:** Severs the list so the reverse phase only sees the second half and the first half terminates naturally.
- **Reverse loop:** Standard in-place reversal — save `next`, flip the pointer, advance. After the loop, `prev` is the new head of the reversed second half.
- **Save `firstNext` and `secondNext` before overwriting:** The rewiring of `first.next` would destroy the path forward if we didn't save it first.

## Common bugs to avoid
- Not severing the list before reversing — the reverse loop may wrap back into the first half, creating a cycle.
- Using `fast != null && fast.next != null` (instead of `fast.next != null && fast.next.next != null`) for the midpoint condition — this places slow at the first node of the second half instead of the last node of the first half, making the cut one node too late.
- Forgetting to save both `firstNext` and `secondNext` before the rewiring — overwriting `first.next` loses the next node in the first half.
