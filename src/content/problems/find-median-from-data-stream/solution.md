## Reference solution

**Complexity:** O(log n) addNum, O(1) findMedian.

```java
class MedianFinder {
    // maxHeap holds the lower half — its top is the largest of the smaller numbers
    private final PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
    // minHeap holds the upper half — its top is the smallest of the larger numbers
    private final PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void addNum(int num) {
        // Step 1: always add to maxHeap first
        maxHeap.offer(num);

        // Step 2: ensure all maxHeap values ≤ all minHeap values
        // (the max of lower half must be ≤ the min of upper half)
        minHeap.offer(maxHeap.poll());

        // Step 3: rebalance sizes so maxHeap is ≥ minHeap in size
        // (lower half holds the extra element when total is odd)
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            // Odd total — median is the top of the larger (lower) heap
            return maxHeap.peek();
        }
        // Even total — median is average of both tops
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}
```

## Line-by-line notes
- **Always add to `maxHeap` first:** This ensures the new element is compared against the top of the lower half. If it's larger than the current median-candidate, the subsequent `minHeap.offer(maxHeap.poll())` moves the max of the lower half to the upper half, maintaining the ordering invariant.
- **`minHeap.offer(maxHeap.poll())`:** Move the maximum of the lower half to the upper half. This guarantees that the lower half's max ≤ upper half's min — even if `num` was smaller than the current top.
- **Rebalancing step:** After steps 1 and 2, `minHeap` may be one element larger than `maxHeap`. If so, move one element back. The invariant: `maxHeap.size() == minHeap.size()` (even) or `maxHeap.size() == minHeap.size() + 1` (odd).
- **`/ 2.0`:** Use `2.0` (double division) not `2` (integer division) to get the correct average for even sizes.

## Common bugs to avoid
- **Not doing the rebalance step:** Without step 3, the upper half can grow larger than the lower half, and `findMedian` would return the wrong value.
- **Integer overflow in `findMedian`:** `(maxHeap.peek() + minHeap.peek()) / 2.0` — if both peaks are near `Integer.MAX_VALUE`, their sum overflows. Use `maxHeap.peek() / 2.0 + minHeap.peek() / 2.0` instead.
- **Using `peek()` on an empty heap:** The problem guarantees at least one `addNum` before `findMedian`, but add a check if unsure.
