## Understanding the problem

Given the heads of two sorted (non-decreasing) linked lists, merge them into a single sorted linked list and return its head. The merge should be done in-place by splicing the existing nodes together — no new node objects should be created.

## Brute force

Collect all node values from both lists into an array, sort the array, then build a new linked list from it. This is O((n+m) log(n+m)) time and O(n+m) space. It wastes the fact that both inputs are already sorted and allocates new nodes unnecessarily.

## Key insight

Because both lists are already sorted, the next node in the merged output is always the smaller of the two current heads. We can weave the lists together one node at a time without any sorting. A dummy head node eliminates the special case of handling the first node.

## Optimal approach

**Pattern: Dummy head + two-pointer merge**

1. Create a `dummy` sentinel node. Point a `current` pointer at it.
2. While both `l1` and `l2` are non-null:
   - Compare `l1.val` and `l2.val`.
   - Attach the smaller node to `current.next` and advance that list's pointer.
   - Advance `current` to `current.next`.
3. After the loop, at most one list has remaining nodes. Attach the non-null remainder directly: `current.next = (l1 != null) ? l1 : l2`.
4. Return `dummy.next` (the true head of the merged list).

**Invariant:** At every step, `dummy.next` through `current` is the correctly sorted prefix of the merged list, and both `l1` and `l2` point to their respective remaining unsorted suffixes.

## Why this works

At each comparison step we pick the globally smallest remaining node, so the output is built in sorted order by induction. When one list is exhausted, the other list is already sorted and all its remaining values are ≥ the last node we attached, so appending the remainder maintains sorted order.

## Complexity
- Time: O(n + m) because each node from both lists is visited exactly once
- Space: O(1) because we only create the dummy sentinel node; all other pointer changes are in-place
