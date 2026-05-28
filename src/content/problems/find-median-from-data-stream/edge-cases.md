## Cases to mention to the interviewer

- **Single element:** addNum(5), findMedian() → 5.0. maxHeap={5}, minHeap={}. maxHeap.peek()=5. ✓
- **Two elements, same value:** addNum(3), addNum(3), findMedian() → 3.0. maxHeap={3}, minHeap={3}. (3+3)/2.0=3.0. ✓
- **Descending input:** addNum(5), addNum(4), addNum(3). After each: maxHeap may rebalance. Final: sorted structure. findMedian()=4.0. ✓
- **All same values:** addNum(2)×5 times. Each addNum: offer 2 to max, move to min, rebalance. After 5 adds: maxHeap holds 3 twos, minHeap holds 2 twos. findMedian()=2.0. ✓
- **Very large and very small interleaved:** addNum(Integer.MAX_VALUE), addNum(Integer.MIN_VALUE). The two-heap approach maintains ordering regardless of value magnitude — heap comparisons use Integer.compare which handles extremes.
- **Integer overflow in findMedian:** `(maxHeap.peek() + minHeap.peek()) / 2.0` overflows if both peaks are near Integer.MAX_VALUE. Example: maxPeek=2×10⁹, minPeek=2×10⁹. Sum=4×10⁹ overflows int. Fix: `maxHeap.peek() / 2.0 + minHeap.peek() / 2.0`. Mention this explicitly.
- **Odd vs. even counts:** After every odd-numbered addNum, maxHeap has one more element; findMedian returns maxHeap.peek(). After even-numbered, both heaps equal; findMedian returns average. Test both after each add.
