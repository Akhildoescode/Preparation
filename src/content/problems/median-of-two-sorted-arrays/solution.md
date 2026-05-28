## Reference solution

**Complexity:** O(log(min(m, n))) time, O(1) space.

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Always binary search over the shorter array
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length, n = nums2.length;
        int half = (m + n + 1) / 2;  // size of the combined left partition
        int lo = 0, hi = m;

        while (lo <= hi) {
            int i = lo + (hi - lo) / 2;  // partition point in nums1
            int j = half - i;             // partition point in nums2

            // Sentinel values handle boundary partitions (i=0 or i=m, j=0 or j=n)
            int maxLeft1  = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2  = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            if (maxLeft1 > minRight2) {
                // nums1's left part is too large; shrink it
                hi = i - 1;
            } else if (maxLeft2 > minRight1) {
                // nums2's left part is too large; grow nums1's left part
                lo = i + 1;
            } else {
                // Perfect partition found
                int maxLeft = Math.max(maxLeft1, maxLeft2);
                if ((m + n) % 2 == 1) {
                    return maxLeft;
                }
                int minRight = Math.min(minRight1, minRight2);
                return (maxLeft + minRight) / 2.0;
            }
        }

        // Unreachable if inputs are valid sorted arrays
        throw new IllegalStateException();
    }
}
```

## Line-by-line notes
- **Swap to ensure nums1 is shorter:** Binary searching over the shorter array keeps the range `[0, m]` tight and ensures `j` stays valid (j = half - i ≥ 0 when i ≤ half, which holds because half ≤ n when m ≤ n).
- **`half = (m + n + 1) / 2`:** The `+1` makes this work for both odd and even totals — the left partition is always the larger half for odd totals.
- **Sentinel `Integer.MIN_VALUE` / `Integer.MAX_VALUE`:** When partition point is at the boundary (i=0 means nums1 contributes nothing to the left; i=m means nums1 contributes everything), sentinels ensure the cross comparisons never falsely trigger.
- **`/ 2.0` for even-length merge:** Forces floating-point division.

## Common bugs to avoid
- **Not ensuring nums1 is the shorter array:** If m > n, `j = half - i` can become negative for valid values of `i`.
- **Forgetting sentinel values:** Without them, `nums1[i-1]` when `i=0` causes `ArrayIndexOutOfBoundsException`.
- **`/ 2` instead of `/ 2.0`:** Integer division truncates; the median of [1,2] should be 1.5, not 1.
