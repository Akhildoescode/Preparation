## Reference solution

**Complexity (heap):** O(n log k) time, O(k) space.

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Min-heap: top is always the smallest of the k largest elements seen so far
        var minHeap = new PriorityQueue<Integer>();

        for (int num : nums) {
            minHeap.offer(num);
            // Keep only the k largest — evict the smallest if heap exceeds k
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // The heap top is the kth largest (smallest of the k largest)
        return minHeap.peek();
    }
}
```

**QuickSelect alternative (O(n) average):**

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        // kth largest = (n - k)th smallest (0-indexed)
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickSelect(int[] nums, int left, int right, int kSmallest) {
        int pivot = nums[right];
        int p = left;
        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) swap(nums, i, p++);
        }
        swap(nums, p, right); // place pivot

        if (p == kSmallest) return nums[p];
        return p < kSmallest
            ? quickSelect(nums, p + 1, right, kSmallest)
            : quickSelect(nums, left, p - 1, kSmallest);
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i]; nums[i] = nums[j]; nums[j] = tmp;
    }
}
```

## Line-by-line notes (heap)
- **Min-heap (not max-heap):** We want the k *largest*, and the heap's top is the *smallest* of those k — which is the kth largest by definition. Many people intuitively reach for a max-heap and then sort descending — correct but O(n log n).
- **`minHeap.size() > k` then poll:** After offering, if the heap grew beyond k, evict the smallest. The evicted element is guaranteed to NOT be in the top k.
- **`minHeap.peek()`:** The remaining heap top is the answer. We peek (don't poll) to avoid modifying the heap.

## Common bugs to avoid
- **Using a max-heap:** `new PriorityQueue<>(Comparator.reverseOrder())` gives the kth smallest, not kth largest.
- **QuickSelect worst-case:** If the array is already sorted and pivot is always the last element, QuickSelect degrades to O(n²). Mitigate by randomizing the pivot before calling quickSelect.
- **Off-by-one in QuickSelect target:** "kth largest" = index `n - k` in a sorted-ascending array. Double-check this conversion when implementing QuickSelect.
