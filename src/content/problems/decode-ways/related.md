## Same pattern, different problem
- **Climbing Stairs (LC #70):** The same Fibonacci recurrence `dp[i] = dp[i-1] + dp[i-2]`, but without the conditional checks — Decode Ways is Climbing Stairs with validity gates.
- **House Robber (LC #198):** Two-variable rolling DP where the recurrence chooses max instead of sum.
- **Word Break (LC #139):** String segmentation DP where dp[i] checks all j < i — same "prefix validity" concept but looking back further than 1–2 positions.
- **Unique Paths (LC #62):** 2-D DP where dp[i][j] = dp[i-1][j] + dp[i][j-1] — similar "sum of incoming paths" counting.

## When this pattern applies
This pattern — `dp[i] = (condition on s[i-1]) * dp[i-1] + (condition on s[i-2..i-1]) * dp[i-2]` — applies to string parsing problems where the "decoding" of the current character depends on whether it's taken alone or paired with the previous character. The signal: "count the number of ways to interpret a string where each character or character pair maps to some symbol." Always handle '0' carefully: a digit that can't stand alone but can be part of a valid pair creates the asymmetric validity checks that distinguish this from pure Fibonacci.
