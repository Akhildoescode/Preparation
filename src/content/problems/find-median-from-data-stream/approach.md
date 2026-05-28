## Understanding the problem
Design a data structure that supports adding integers one at a time (`addNum`) and returning the median of all numbers seen so far (`findMedian`). The median is the middle value (or average of two middle values for even-sized collections).

## Brute force
Maintain a sorted list. `addNum`: binary-search insert in O(log n), then shift in O(n). `findMedian`: O(1). Total: O(n) per `addNum`. Unacceptable for large n.

## Key insight
Split the numbers into two halves:
- **Max-heap (lower half):** contains the smaller half of numbers. Top = max of lower half.
- **Min-heap (upper half):** contains the larger half of numbers. Top = min of upper half.

Keep the heaps balanced: sizes differ by at most 1. The median is:
- Even total: average of both tops.
- Odd total: top of the larger heap.

Each `addNum` is O(log n); `findMedian` is O(1).

## Optimal approach — Two Heaps
**`addNum(num)`:**
1. Always offer to `maxHeap` (lower half) first.
2. Move the max of `maxHeap` to `minHeap` (ensures lower half ≤ upper half).
3. If `maxHeap.size() < minHeap.size()`: move min of `minHeap` to `maxHeap` (rebalance so lower half is ≥ upper half in size).

**`findMedian()`:**
- If sizes equal: `(maxHeap.peek() + minHeap.peek()) / 2.0`.
- Else: `maxHeap.peek()` (lower half has one more element).

## Why this works
After each `addNum`, the invariant holds: all elements in the max-heap ≤ all elements in the min-heap (the two-step process ensures this), and `|maxHeap.size() - minHeap.size()| ≤ 1`. The median is always accessible at the tops of the heaps in O(1).

## Complexity
- `addNum`: O(log n) — two heap operations.
- `findMedian`: O(1) — peek at heap tops.
- Space: O(n).
