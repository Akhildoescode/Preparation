## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        if (n == 2) return Math.max(nums[0], nums[1]);

        // Either exclude the last house (rob 0..n-2) or exclude the first (rob 1..n-1)
        return Math.max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }

    // Standard linear House Robber on nums[start..end] inclusive
    private int robLinear(int[] nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}
```

## Line-by-line notes
- **Two calls to `robLinear`:** The first excludes house n-1 (range 0..n-2); the second excludes house 0 (range 1..n-1). Taking the max covers all valid configurations.
- **`prev2 = 0, prev1 = 0` as initialization:** Treating the sub-problem as having 0 money before the range. `dp[-1] = 0` and `dp[-2] = 0` are conceptual base cases meaning "no houses yet = 0 money."
- **`n == 2` guard:** With two houses in a circle, both are adjacent to each other — rob whichever has more money.

## Common bugs to avoid
- **Not splitting into two ranges:** Simply running the linear algorithm on the full array ignores the circular adjacency between house 0 and house n-1.
- **Using `start-1` and `start-2` as indices:** The `prev2 = 0` initialization avoids this — no negative indexing needed.
- **Forgetting the n=1 case:** Splitting into 0..n-2 and 1..n-1 would both be empty ranges for n=1. Always guard.
