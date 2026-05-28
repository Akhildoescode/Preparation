## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];

        // prev2 = dp[i-2] (best up to two houses ago)
        // prev1 = dp[i-1] (best up to one house ago)
        int prev2 = nums[0];
        int prev1 = Math.max(nums[0], nums[1]);

        for (int i = 2; i < n; i++) {
            // Either skip house i (keep prev1) or rob it (prev2 + nums[i])
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

## Line-by-line notes
- **`prev2 = nums[0]`:** dp[0] = nums[0] — the best we can do with only house 0 is to rob it.
- **`prev1 = max(nums[0], nums[1])`:** dp[1] = max(nums[0], nums[1]) — with two houses, rob the richer one (can't rob both).
- **`curr = max(prev1, prev2 + nums[i])`:** The core recurrence: skip house i and keep prev1, or rob house i for prev2 + nums[i].
- **Shift: `prev2 = prev1; prev1 = curr`:** Advance the rolling window. Always update prev2 first, then prev1.

## Common bugs to avoid
- **Initializing `prev1 = nums[1]` instead of `max(nums[0], nums[1])`:** If nums[0] > nums[1], starting prev1 as nums[1] underestimates dp[1].
- **Shift order `prev2 = curr; prev1 = prev2`:** This overwrites prev1 before prev2 is saved — both end up with `curr`. Always update prev2 first.
- **Returning `prev2` instead of `prev1`:** After the loop, `prev1` holds dp[n-1], which is the answer.
