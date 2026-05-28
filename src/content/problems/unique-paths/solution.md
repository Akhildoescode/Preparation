## Reference solution

**Complexity:** O(m · n) time, O(n) space (rolling row).

```java
class Solution {
    public int uniquePaths(int m, int n) {
        // dp[j] = number of paths to reach the current row at column j
        // Initialize all to 1 — the top row has exactly one path to each cell
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 1; i < m; i++) {
            // dp[0] stays 1 (left column always has one path)
            for (int j = 1; j < n; j++) {
                // Paths from above (dp[j], unchanged this row) + paths from left (dp[j-1])
                dp[j] += dp[j - 1];
            }
        }

        return dp[n - 1];
    }
}
```

## Line-by-line notes
- **`Arrays.fill(dp, 1)`:** Initializes all cells to 1, representing the top row (dp[0][0..n-1] = 1). The left column entry `dp[0]` stays 1 throughout since we never update `j=0`.
- **`dp[j] += dp[j-1]`:** `dp[j]` before the update = number of paths to this column from above (from the previous row, left unchanged). `dp[j-1]` = paths from the left (just updated this row). Their sum is the new dp[j].
- **Row 0 skipped in outer loop:** The top row is already set to 1 by the initialization; the loop starts from i=1.

## Common bugs to avoid
- **Starting outer loop at i=0:** Processes the first row again, incorrectly doubling its values.
- **`dp[j] = dp[j] + dp[j-1]`:** This is correct, but `dp[j] += dp[j-1]` is more concise. Just don't accidentally write `dp[j-1] += dp[j]` (reversed).
- **Array size `new int[m]` instead of `new int[n]`:** The rolling row tracks columns, so the size should be `n`.
