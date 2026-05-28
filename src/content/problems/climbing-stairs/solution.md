## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;

        // prev2 = dp[i-2], prev1 = dp[i-1]
        int prev2 = 1, prev1 = 1;

        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;  // dp[i] = dp[i-1] + dp[i-2]
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

## Line-by-line notes
- **`if (n <= 1) return 1`:** Base cases: dp[0]=1 (one way to be at the top before starting) and dp[1]=1 (one 1-step). Without this guard, the loop won't run for n=1 and we'd need to ensure prev1 is initialized correctly — the guard makes it explicit.
- **`prev2 = 1, prev1 = 1`:** Corresponds to dp[0] and dp[1] respectively.
- **`curr = prev1 + prev2`:** Computes dp[i] = dp[i-1] + dp[i-2].
- **Shift: `prev2 = prev1; prev1 = curr`:** Advances the two-variable window forward by one step.

## Common bugs to avoid
- **Off-by-one in loop range:** The loop should run from `i=2` to `i=n` inclusive (that's n-1 iterations). Using `i < n` misses the last iteration.
- **Swapping the shift order:** `prev2 = curr; prev1 = prev2` is wrong — you'd overwrite `prev1` with garbage. Always update `prev2` first, then `prev1`.
- **Returning `prev2` instead of `prev1`:** After the loop, `prev1` holds dp[n]. `prev2` holds dp[n-1].
