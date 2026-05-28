## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Median of an odd-count collection is the middle element; of even-count is the average of the two middle elements?
- Values can be negative?
- What's the relative frequency of addNum vs. findMedian calls? (Doesn't change the approach but good to ask.)"

### 2. State the brute force (90 seconds)
"Maintain a sorted list. `addNum` inserts in sorted order: O(n) for shifting. `findMedian` is O(1). Total: O(n) per add, unacceptable for n=10⁵. Better: two heaps give O(log n) per add."

### 3. Walk through the optimal approach (3 minutes)
"I'll maintain two heaps: a max-heap (lower half) and a min-heap (upper half). Invariant: all elements in max-heap ≤ all elements in min-heap. Sizes differ by at most 1, with max-heap holding the extra element when total is odd.

**addNum:**
1. Offer to maxHeap.
2. Move maxHeap's top to minHeap (ensures ordering invariant — new element might be larger than current median).
3. If maxHeap.size() < minHeap.size(), move minHeap's top to maxHeap (rebalance).

**findMedian:** Even count → average of both tops. Odd count → maxHeap.peek() (it has the extra element).

Trace: addNum(1): max={1},min={}. addNum(2): offer 2→max={1,2}, move max(2)→min={2}. Rebalance: max<min, move 2 back→max={1,2}? Wait: max={2}, min={2}. max.size()==min.size(), ok. findMedian: (2+2)/2=2? That's wrong. Let me redo:

After addNum(1): max={1}, min={}. After addNum(2): offer 2→max={1,2}, poll max=2→min={2}. maxSize(1)<minSize(1)? No equal. findMedian: max.peek()=1, min.peek()=2 → (1+2)/2=1.5. ✓"

### 4. State complexity before coding
"O(log n) addNum, O(1) findMedian. I'll code it."

### 5. After coding
"Test addNum(1), addNum(1), findMedian(): max={1}, min={1}. Equal sizes → (1+1)/2=1.0. ✓"
