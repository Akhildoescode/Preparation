## Understanding the problem
Find the kth largest element in an unsorted array. "kth largest" means the kth element in descending sort order — so the 1st largest is the maximum, the 2nd is the second-highest, etc. Duplicate values count by position.

## Brute force
Sort the array descending, return `nums[k-1]`. O(n log n) time. Works but ignores the opportunity to do better.

## Key insight
We don't need to fully sort the array. Maintain a **min-heap of size k**. After processing all elements, the heap contains the k largest elements, and its minimum (the top) is the kth largest. Alternatively, QuickSelect finds the kth order statistic in O(n) average time without extra space.

## Optimal approach — Min-Heap
1. Create a `PriorityQueue<Integer>` (min-heap by default in Java).
2. For each number `n`:
   - `heap.offer(n)`.
   - If `heap.size() > k`: `heap.poll()` (remove the smallest — it's not in the top k).
3. Return `heap.peek()` — the smallest of the k largest = kth largest.

Trace `[3, 2, 1, 5, 6, 4]`, k=2:
- After processing: heap = {5, 6} (size 2). heap.peek() = 5 (kth largest). ✓

**Alternative — QuickSelect:** Partition around a pivot (like QuickSort). Recurse only on the partition that contains the kth-from-end position. O(n) average, O(n²) worst case (avoidable with random pivot). Uses O(1) extra space.

## Why this works (heap approach)
The min-heap of size k always holds the k largest elements seen so far. When a new element is larger than the heap's minimum, it displaces the minimum (which is no longer in the top k). The heap's minimum is the kth largest by invariant.

## Complexity
- Heap: O(n log k) time, O(k) space.
- QuickSelect: O(n) average time, O(1) space (in-place).
