## Understanding the problem
Given k sorted linked lists, merge them into one sorted linked list. The total number of nodes across all lists is n. Optimize for time complexity — the key is not doing pairwise merging naively.

## Brute force
Collect all values, sort them (O(n log n)), rebuild a list. O(n log n) time and O(n) space. Works but ignores the sorted structure of the input. Or merge lists pairwise: merge list 1 and 2, then merge result with 3, etc. — O(nk) total in the worst case.

## Key insight
At any point, the next element to add to the merged list is the minimum among the current heads of all k lists. A **min-heap** of size k gives this minimum in O(log k) time. After extracting the minimum node, push that list's next node into the heap.

## Optimal approach — Min-Heap
1. Create a `PriorityQueue<ListNode>` ordered by node value.
2. Add the head of each non-null list to the heap.
3. Use a dummy head to build the merged list.
4. While heap is non-empty:
   - Poll the minimum node. Append to merged list.
   - If the polled node has a `next`, push `next` into the heap.
5. Return `dummy.next`.

Trace `[[1→4→5], [1→3→4], [2→6]]`:
- Heap: {1(L1), 1(L2), 2(L3)} → poll 1(L1). Push 4(L1). Merged: 1.
- Heap: {1(L2), 2(L3), 4(L1)} → poll 1(L2). Push 3(L2). Merged: 1→1.
- Heap: {2(L3), 3(L2), 4(L1)} → poll 2(L3). Push 6(L3). Merged: 1→1→2.
... Result: 1→1→2→3→4→4→5→6. ✓

## Why this works
The heap maintains the invariant: it holds exactly the "frontier" of each list — the smallest unmerged element from each list. Polling always gives the globally smallest remaining element. Pushing the next element from the same list keeps the invariant. The heap size stays ≤ k throughout.

## Complexity
- Time: O(n log k) — n total poll/push operations, each O(log k) on a heap of size ≤ k.
- Space: O(k) for the heap + O(1) extra for the pointer variables (output list uses existing nodes).
