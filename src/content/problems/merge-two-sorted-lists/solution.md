## Reference solution

**Complexity:** O(n + m) time, O(1) space.

```java
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // dummy head eliminates the special case of setting the result head
        var dummy = new ListNode(0);
        var current = dummy;

        // while both lists have nodes, pick the smaller one
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;   // attach list1's node
                list1 = list1.next;     // advance list1
            } else {
                current.next = list2;   // attach list2's node
                list2 = list2.next;     // advance list2
            }
            current = current.next;     // advance the merge pointer
        }

        // at most one list still has nodes; append the remainder directly
        current.next = (list1 != null) ? list1 : list2;

        return dummy.next;  // skip the sentinel
    }
}
```

## Line-by-line notes
- **`dummy` node:** Its value is ignored. It gives `current` a starting point so the first real node is attached via `current.next` rather than a conditional head assignment.
- **`list1.val <= list2.val`:** Using `<=` (not `<`) ensures stability — when values are equal, `list1`'s node comes first, preserving relative order from the first input.
- **`current = current.next` at the bottom:** Moved outside the if/else to avoid duplicating the advance in both branches.
- **`current.next = (list1 != null) ? list1 : list2`:** One of these is null and the other is the full remaining tail. The ternary attaches whichever is non-null; if both are null, `current.next` becomes null, which is correct.

## Common bugs to avoid
- Forgetting to advance `current` after each attach — the output list pointer gets stuck and you end up in an infinite loop or lose nodes.
- Returning `dummy` instead of `dummy.next` — includes the sentinel zero-value node at the front of the result.
- Setting `current.next` to the remainder but then also entering the while loop with one list exhausted — the `&&` condition prevents this correctly.
