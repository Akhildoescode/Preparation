## Same pattern, different problem
- **Reorder List (#143):** Uses reversal as a step — find the midpoint, reverse the second half, then interleave. Mastering reversal in-place is a prerequisite.
- **Palindrome Linked List (#234):** Reverse the second half and compare with the first half. Same three-pointer reversal pattern.
- **Reverse Linked List II (#92):** Reverse only nodes from position `left` to `right`. Requires finding the correct start node and carefully reconnecting the reversed sublist — builds directly on this pattern.
- **Merge Two Sorted Lists (#21):** Pointer manipulation on linked lists — different goal but same confidence with `prev.next`, `curr.next` style chaining.

## When this pattern applies
The **three-pointer iterative reversal** is the only O(1)-space way to reverse a singly linked list (or a portion of one). Reach for it any time a problem requires rearranging list nodes in reverse — detecting palindromes, reordering, or reversing subarrays in-place. The recursive version is elegant for interviews but risks stack overflow on long lists (n = 10⁵ → 10⁵ stack frames). Default to iterative unless the interviewer specifically asks for recursion.
