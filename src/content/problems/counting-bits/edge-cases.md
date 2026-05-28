## Cases to mention to the interviewer

- **n = 0:** Output is `[0]` — the array has one element for the number 0, which has zero set bits.
- **n = 1:** Output is `[0, 1]` — zero and one set bit respectively.
- **n = 4 (power of 2):** dp[4] = dp[2] + 0 = dp[1] + 0 = 1. Powers of 2 always have exactly one set bit.
- **n = 7:** Output [0,1,1,2,1,2,2,3]. dp[7] = dp[3] + 1 = 2 + 1 = 3. '111' has three bits. Correct.
- **Large n (e.g., 10^5):** The DP runs in O(n) with O(1) per step — no performance issues.
- **Sequence of even numbers:** Even numbers always have the same bit count as their half — 0 LSB contribution.
