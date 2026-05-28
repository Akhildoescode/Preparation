## Reference solution

**Complexity:** O(log n) time, O(1) space.

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;

            // Determine which half is fully sorted
            if (nums[left] <= nums[mid]) {
                // Left half [left, mid] is sorted
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;  // target is in the sorted left half
                } else {
                    left = mid + 1;   // target must be in the right half
                }
            } else {
                // Right half [mid, right] is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;   // target is in the sorted right half
                } else {
                    right = mid - 1;  // target must be in the left half
                }
            }
        }

        return -1;
    }
}
```

## Line-by-line notes
- **`nums[left] <= nums[mid]`:** Uses `<=` to handle the case where `left == mid` (single-element subarray) — in this case the left half is trivially sorted. Correct for no-duplicates arrays.
- **`nums[left] <= target && target < nums[mid]`:** The strict `<` on the right ensures `target != nums[mid]` (already checked above). Both bounds are needed — without `>= nums[left]`, a target smaller than the left boundary would be incorrectly sent to the left half.
- **`nums[mid] < target && target <= nums[right]`:** Symmetric for the right half. Note `<` on the left (not `<=`) since `target == nums[mid]` was already returned.
- **`mid = left + (right - left) / 2`:** Avoids integer overflow compared to `(left + right) / 2` when left and right are near Integer.MAX_VALUE.

## Common bugs to avoid
- **Using `<` instead of `<=` in `nums[left] <= nums[mid]`:** For a two-element subarray where `left == mid - 1`, strict `<` would incorrectly handle the left-sorted case when they're equal.
- **Forgetting that one half might wrap:** Without carefully checking the sorted half first, you might send binary search to the wrong half and miss the target.
- **Not checking `nums[mid] == target` first:** If the mid IS the target, we should return immediately — before the half-identification logic, which might otherwise send us to the wrong half.
