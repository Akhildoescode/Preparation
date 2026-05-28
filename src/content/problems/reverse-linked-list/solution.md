## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            // Save the next node before we overwrite curr.next
            ListNode next = curr.next;

            // Reverse the pointer
            curr.next = prev;

            // Advance both pointers one step forward
            prev = curr;
            curr = next;
        }

        // When curr is null, prev is the new head
        return prev;
    }
}
```

## Line-by-line notes
- **`ListNode prev = null`:** The reversed list's tail points to null. Initializing `prev` to null ensures the original head node (which becomes the tail after reversal) correctly points to null.
- **`ListNode next = curr.next`:** Save `curr.next` BEFORE reassigning `curr.next = prev`. After the assignment, the forward reference is lost. This one-line save is the reason three pointers are needed.
- **`curr.next = prev`:** The actual reversal — point backward instead of forward. After this, `curr` is isolated from its original neighbors except via the saved `next`.
- **`prev = curr; curr = next`:** Move both pointers forward. The order matters: update `prev` before `curr`, otherwise `prev` would be set to the already-advanced `curr`.

## Common bugs to avoid
- **Forgetting to save `curr.next` before reassigning:** If you write `curr.next = prev; curr = curr.next;` (the second line uses the new `curr.next`), you've lost the forward reference — `curr` jumps to `prev` not `next`. The three-pointer pattern is non-negotiable.
- **Returning `curr` instead of `prev`:** The loop exits when `curr == null`. At that point, `prev` is the last real node — the new head. Returning `curr` returns null.
- **Reversing values instead of pointers:** Swapping node values while keeping pointers forward produces correct output but doesn't reverse the list — and fails if node references are held externally.
