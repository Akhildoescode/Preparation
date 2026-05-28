## Understanding the problem
Given an integer array, return the k most frequently occurring elements. The order of output doesn't matter. We need to count frequencies and then select the top-k by frequency — a classic "top-k" pattern.

## Brute force
Count frequencies with a HashMap, then sort all (element, frequency) pairs by frequency descending and take the first k. O(n log n) time for sorting. We can do better.

## Key insight
We don't need a full sort. We only need the top-k elements by frequency. A min-heap of size k achieves O(n log k): maintain a heap where the minimum-frequency element is at the root; when a new element has higher frequency than the root, replace the root and re-heapify. After processing all elements, the heap contains exactly the top-k most frequent.

**Alternative — bucket sort:** Since frequencies are bounded by n (an element can appear at most n times), create a list of lists where `buckets[freq]` holds all elements with that frequency. Scan from high to low frequency to collect the top-k. O(n) time.

## Optimal approach (min-heap)
1. Build a frequency map: `HashMap<Integer, Integer>`.
2. Maintain a min-heap (priority queue) of size k, ordered by frequency.
3. For each `(element, freq)` pair: if heap size < k or freq > heap.peek().freq, add to heap (and remove if size exceeds k).
4. Extract all elements from the heap.

## Why this works
The min-heap always ejects the element with the lowest frequency when at capacity. After processing all elements, the k remaining elements are those that were never ejected — i.e., the k most frequent.

## Complexity
- Time: O(n log k) — n elements processed, each heap operation is O(log k)
- Space: O(n) for the frequency map plus O(k) for the heap
