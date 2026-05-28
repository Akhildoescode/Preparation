## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int longestConsecutive(int[] nums) {
        var numSet = new HashSet<Integer>();
        for (int n : nums) numSet.add(n);

        int maxLength = 0;

        for (int n : numSet) {
            // Only start counting from sequence beginnings
            if (numSet.contains(n - 1)) continue;

            // Count consecutive numbers starting from n
            int length = 1;
            while (numSet.contains(n + length)) {
                length++;
            }

            maxLength = Math.max(maxLength, length);
        }

        return maxLength;
    }
}
```

## Line-by-line notes
- **`for (int n : numSet)`:** Iterate over the set, not the original array. This naturally deduplicates — each value appears only once, so we never double-count sequences due to duplicates in the input.
- **`if (numSet.contains(n - 1)) continue`:** The critical optimization. Without this, for a sequence 1,2,3,4, we'd start counting from 1, 2, 3, and 4 separately, turning O(n) into O(n²). With this check, only the true start (1) triggers a counting loop.
- **`while (numSet.contains(n + length))`:** Starting at `n`, check if `n+1`, `n+2`, ... are in the set. Each `contains` is O(1). The total iterations of this inner loop across all outer iterations is bounded by n — each element is visited at most once as a sequence member.
- **`maxLength = Math.max(maxLength, length)`:** Updated only for sequence starts. Non-starts are skipped, so this update happens at most once per distinct consecutive sequence.

## Common bugs to avoid
- **Iterating `nums` (with duplicates) instead of `numSet`:** For input `[1, 1, 1, 2, 3]`, if you iterate `nums`, n=1 triggers the sequence three times, making the counting loop run 3×3=9 steps instead of 3. Total is no longer O(n).
- **Missing the `n-1` check:** Without it, you'd count sequences from every element, causing O(n²) for long consecutive sequences.
- **Using a sorted set instead of HashSet:** A `TreeSet` gives O(log n) `contains`, ruining the O(n) time complexity.
