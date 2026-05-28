## Same pattern, different problem
- **House Robber (LC #198):** Fibonacci-like DP where dp[i] = max(dp[i-1], dp[i-2] + nums[i]) — same two-variable rolling optimization.
- **Fibonacci Number (LC #509):** Literally the same recurrence — Climbing Stairs IS Fibonacci with a shifted index.
- **Decode Ways (LC #91):** More complex 1-D DP on strings — also uses a two-variable rolling approach.
- **Coin Change (LC #322):** 1-D DP where each step can take multiple coin values — a generalization of climbing stairs with multiple allowed step sizes.

## When this pattern applies
1-D DP applies when: the answer for problem size i depends only on answers for smaller sizes, and you can identify an explicit recurrence. The Fibonacci/climbing-stairs pattern (dp[i] = dp[i-1] + dp[i-2]) appears in many disguises: counting ways to tile, counting valid sequences, counting paths on a line. Always check: can the state space be reduced to a rolling window of k previous values? If so, use O(k) space instead of O(n).
