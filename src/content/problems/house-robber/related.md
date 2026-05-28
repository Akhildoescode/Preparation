## Same pattern, different problem
- **House Robber II (LC #213):** Circular arrangement — run this same algorithm twice (excluding first house, excluding last), take the max.
- **Climbing Stairs (LC #70):** Same Fibonacci-style two-variable rolling DP — counting paths instead of maximizing value.
- **Maximum Product Subarray (LC #152):** Also uses a rolling approach with two tracked values — but tracks both max and min due to sign flips.
- **Decode Ways (LC #91):** 1-D DP on strings where dp[i] depends on dp[i-1] and dp[i-2] — same rolling structure.

## When this pattern applies
This exact recurrence — `dp[i] = max/min/sum of dp[i-1] and dp[i-2] + f(i)` — appears whenever you're making binary decisions at each step that have a one-step lookback constraint (like "can't use two adjacent"). The rolling two-variable approach is always applicable when the recurrence only looks back two steps. Before writing a full dp array, ask: does dp[i] depend only on dp[i-1] and dp[i-2]? If yes, you can do O(1) space.
