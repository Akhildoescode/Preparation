## Reference solution

**Complexity:** O(log n) time, O(1) space.

```java
class Solution {
    public int findMin(int[] nums) {
        int lo = 0, hi = nums.length - 1;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] > nums[hi]) {
                // mid is in the larger left segment; minimum is strictly to the right
                lo = mid + 1;
            } else {
                // mid could be the minimum, or minimum is to the left; keep mid
                hi = mid;
            }
        }

        // lo == hi: only one candidate remains
        return nums[lo];
    }
}
```

## Line-by-line notes
- **`lo < hi` (not `lo <= hi`):** We're converging to a single element, not searching for an exact match. When `lo == hi` there's only one candidate — no need to enter the loop.
- **Compare `nums[mid]` to `nums[hi]` (not `nums[lo]`):** Comparing to the right boundary tells us whether we're in the larger or smaller segment. Comparing to `nums[lo]` would break when the array is not rotated.
- **`hi = mid` (not `hi = mid - 1`):** We can't exclude mid because it may be the answer. Contrast with standard binary search where we exclude mid after confirming it's not the target.

## Common bugs to avoid
- **Comparing to `nums[lo]` instead of `nums[hi]`:** This doesn't correctly identify which half contains the rotation for all cases.
- **`hi = mid - 1`:** Incorrectly excludes mid when it could be the minimum.
- **Using `lo <= hi`:** With this condition and `hi = mid`, the loop never terminates when `lo == hi`.
