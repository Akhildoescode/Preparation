## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        // prefixCounts maps prefix sum → number of times it has appeared
        var prefixCounts = new HashMap<Integer, Integer>();
        // A prefix sum of 0 appears once before any element (empty prefix)
        prefixCounts.put(0, 1);

        int currentSum = 0;
        int count = 0;

        for (int num : nums) {
            currentSum += num;

            // How many earlier prefixes have value (currentSum - k)?
            // Each such prefix yields a subarray ending here that sums to k.
            count += prefixCounts.getOrDefault(currentSum - k, 0);

            // Record the current prefix sum
            prefixCounts.merge(currentSum, 1, Integer::sum);
        }

        return count;
    }
}
```

## Line-by-line notes
- **`prefixCounts.put(0, 1)`:** This seeds the map with the "empty prefix" — a virtual prefix sum of 0 before the array starts. Without it, subarrays that start at index 0 would never be counted (there's no earlier prefix sum to look up).
- **`count += prefixCounts.getOrDefault(currentSum - k, 0)`:** Look up BEFORE updating the map. This ensures we're counting prefixes that appeared *before* the current index, not the current index itself. If we updated first, we might count the current prefix as its own complement (when k=0).
- **`prefixCounts.merge(currentSum, 1, Integer::sum)`:** Increment the count for `currentSum`. Using `merge` is idiomatic: it inserts 1 if the key is absent, otherwise adds 1 to the existing value.
- **Order: count lookup, then map update:** This single-pass ordering guarantees we never count a subarray [i, i] using the same prefix sum for both endpoints.

## Common bugs to avoid
- **Forgetting `{0: 1}` initialization:** Missing the seed causes subarrays starting at index 0 to be uncounted. This is the most common mistake on this problem.
- **Updating the map before looking up the complement:** Leads to counting spurious subarrays (using the current position as both start and end).
- **Using a sliding window:** Only works for non-negative numbers. With negatives, the two-pointer invariant breaks.
