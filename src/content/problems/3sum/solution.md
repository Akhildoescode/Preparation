## Reference solution

**Complexity:** O(n²) time, O(log n) space (sort stack).

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        var result = new ArrayList<List<Integer>>();

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicate values for the fixed element
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            // All remaining elements are positive — no valid triplet possible
            if (nums[i] > 0) break;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(List.of(nums[i], nums[left], nums[right]));
                    // Advance past duplicates on both sides
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;   // need a larger value
                } else {
                    right--;  // need a smaller value
                }
            }
        }

        return result;
    }
}
```

## Line-by-line notes
- **`Arrays.sort(nums)`:** Sorting is the prerequisite for both the two-pointer correctness and the deduplication logic. Don't skip it.
- **`if (i > 0 && nums[i] == nums[i-1]) continue`:** The guard `i > 0` prevents an array-out-of-bounds when i=0. The value check skips duplicate outer elements — the same triplets would be generated again otherwise.
- **`if (nums[i] > 0) break`:** Since the array is sorted and `nums[i]` is the smallest of the three, if it's already positive the sum is strictly positive. Use `break` (not `continue`) — no need to process further i values either.
- **Duplicate-skip loop after finding a triplet:** Move `left` and `right` past all equal values *before* the final `left++; right--`. This ensures the pointers land on new values for the next search iteration.
- **`left < right` guard in the while-skip loops:** Prevents `left` and `right` from crossing inside the skip loops, which would cause out-of-bounds access.

## Common bugs to avoid
- **Forgetting the `i > 0` guard on duplicate skip:** Writing `nums[i] == nums[i-1]` without `i > 0` causes `ArrayIndexOutOfBoundsException`.
- **Not skipping duplicates after finding a triplet:** Without the inner skip loops, the same triplet gets added multiple times when the array has repeated values (e.g., `[0, 0, 0, 0]`).
- **Using `continue` instead of `break` for the early exit:** After `nums[i] > 0`, larger i values are even more positive. `break` is correct; `continue` wastes time.
