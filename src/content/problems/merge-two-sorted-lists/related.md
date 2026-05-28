## Same pattern, different problem
- **Merge K Sorted Lists:** Generalises this exact merge to k lists using a min-heap (priority queue) to always pick the smallest current head among k candidates — the core comparison logic is identical.
- **Reorder List:** Also requires splitting and re-merging a linked list; the merge phase uses the same dummy-head, alternating-attach pattern as this problem.
- **Sort List:** Implements merge sort on a linked list — the merge step is exactly this function, called recursively on sorted halves.
- **Linked List Cycle:** Shares the two-pointer traversal idiom (slow/fast pointers) used when navigating linked lists without extra space.

## When this pattern applies
The dummy-head merge pattern applies whenever you need to build a new linked list by selecting nodes from two or more already-sorted sources. The dummy node is the canonical trick to avoid a conditional first-node assignment: initialise `current = dummy`, always do `current.next = chosenNode`, always advance `current`. Return `dummy.next`. Any time you find yourself writing "if result is null, set head; else append to tail", reach for a dummy node instead.
