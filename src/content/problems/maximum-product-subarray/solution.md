## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int maxProduct(int[] nums) {
        int maxProd = nums[0];
        int minProd = nums[0];
        int result  = nums[0];

        for (int i = 1; i < nums.length; i++) {
            // When nums[i] is negative, multiplying flips max and min.
            // Compute all three candidates and take the appropriate max/min.
            int temp = maxProd;
            maxProd = Math.max(nums[i], Math.max(temp * nums[i], minProd * nums[i]));
            minProd = Math.min(nums[i], Math.min(temp * nums[i], minProd * nums[i]));
            result  = Math.max(result, maxProd);
        }

        return result;
    }
}
```

## Line-by-line notes
- **`int temp = maxProd`:** We must save maxProd before overwriting it, because the minProd update uses the original maxProd (not the updated one).
- **Three candidates for maxProd:** `nums[i]` alone (fresh start), `temp * nums[i]` (extend previous max), `minProd * nums[i]` (negative × negative becomes large positive).
- **Three candidates for minProd:** Same candidates — the minimum could be a fresh `nums[i]` (if negative), `temp * nums[i]` (extending a negative running max), or `minProd * nums[i]` (a large positive min? This catches sign-flip cases).
- **`result = max(result, maxProd)`:** Track the global maximum across all ending positions.

## Common bugs to avoid
- **Not saving `temp = maxProd` before updating:** Using the new `maxProd` when computing `minProd` gives wrong results because `maxProd` was already overwritten.
- **Forgetting the `nums[i]` alone option:** Without it, zeros and extreme sign changes don't reset the product correctly.
- **Returning `maxProd` instead of `result`:** `maxProd` at the end is only the max product ending at the last element, not the global maximum.
