## Reference solution

**Complexity:** O(log n) time, O(1) space.

```java
class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;

        while (lo <= hi) {
            // Use lo + (hi - lo) / 2 instead of (lo + hi) / 2 to prevent
            // integer overflow when lo and hi are both near Integer.MAX_VALUE
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                // Target is in the right half; exclude mid
                lo = mid + 1;
            } else {
                // Target is in the left half; exclude mid
                hi = mid - 1;
            }
        }

        // lo > hi means the target is not present
        return -1;
    }
}
```

## Line-by-line notes
- **`lo <= hi` (inclusive both ends):** The loop condition ensures we check a range of exactly one element before declaring absence — `lo == hi` is still a valid single-element range to check.
- **`mid = lo + (hi - lo) / 2`:** Integer arithmetic: this equals `(lo + hi) / 2` mathematically but avoids overflow. Always use this form.
- **`lo = mid + 1` / `hi = mid - 1`:** Exclude `mid` itself from the next iteration since we already checked it. Without the `+1`/`-1` adjustments the loop can run forever on a two-element range.

## Common bugs to avoid
- **Off-by-one in loop condition:** Using `lo < hi` instead of `lo <= hi` misses the last element when the target is at the very end of the search range.
- **`hi = mid` instead of `hi = mid - 1`:** Without the `-1`, when `lo == hi == mid`, you get an infinite loop because `hi` never decreases.
- **Integer overflow in mid:** Always write `lo + (hi - lo) / 2`, never `(lo + hi) / 2`.
