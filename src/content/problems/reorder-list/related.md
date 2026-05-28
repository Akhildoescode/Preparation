## Same pattern, different problem
- **Linked List Cycle:** Uses the same slow/fast pointer technique to find the midpoint (step 1 of this solution) — mastering cycle detection makes the midpoint-finding phase here feel natural.
- **Reverse Linked List:** Step 2 of this solution is an exact copy of the standalone reverse problem — comfort with in-place reversal is a prerequisite.
- **Merge Two Sorted Lists:** Step 3 of this solution is structurally similar — alternating nodes from two lists using saved next-pointers, though here the merge is interleaving rather than sorted selection.
- **Palindrome Linked List:** Uses the identical three-phase approach (find mid, reverse second half, compare) — solving Reorder List first makes Palindrome Linked List straightforward.

## When this pattern applies
Any in-place linked list restructuring that requires combining nodes from the front and back of the list benefits from the find-mid + reverse-second-half combination. The pattern also composes: the three sub-skills (slow/fast midpoint, iterative reversal, two-pointer merge) each appear independently in other problems, so internalising each phase separately pays dividends across many list problems.
