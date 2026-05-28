## Reference solution

**Complexity:** O(n log k) time, O(n) space.

```java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Step 1: count frequencies
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);

        // Step 2: min-heap ordered by frequency (smallest frequency at root)
        // When heap size exceeds k, we remove the least frequent — keeping only top-k
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(
            (a, b) -> freq.get(a) - freq.get(b)
        );

        for (int element : freq.keySet()) {
            minHeap.offer(element);
            if (minHeap.size() > k) {
                minHeap.poll();  // remove the least frequent element
            }
        }

        // Step 3: extract the k remaining elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) result[i] = minHeap.poll();
        return result;
    }
}
```

## Line-by-line notes
- **`freq.merge(n, 1, Integer::sum)`:** Increment the count for key `n` if present, else insert 1. Cleaner than a null-check pattern.
- **Min-heap comparator `freq.get(a) - freq.get(b)`:** Orders elements so the *least* frequent is at the top. When the heap exceeds k, we `poll()` the minimum — preserving the top-k most frequent.
- **`minHeap.size() > k` check after every offer:** Maintains heap size at exactly k. After processing all elements, the heap holds the k most frequent elements.

## Common bugs to avoid
- **Using a max-heap instead of min-heap:** A max-heap would require sorting all n elements before taking k, giving O(n log n). The min-heap of size k is the O(n log k) optimization.
- **Iterating `freq.entrySet()` but comparing by `Map.Entry.getValue()`:** Valid, but requires adjusting the comparator. Simpler to iterate `freq.keySet()` and look up the value as shown.
- **Off-by-one on heap size check:** `minHeap.size() > k` (after offering) removes the excess element. Using `>= k` before offering would eject valid elements prematurely.
