## Cases to mention to the interviewer

- **m = 1 (single row):** Only one path — go straight right. All `dp[j] = 1`. Return `dp[n-1] = 1`.
- **n = 1 (single column):** Only one path — go straight down. Return `dp[0] = 1` (never updated by inner loop).
- **1×1 grid:** Start equals end — one path (do nothing). Return 1.
- **2×2 grid:** dp = [1,1] initially. After i=1: dp[1] += dp[0] → dp[1] = 2. Return 2. Correct ([R,D] or [D,R]).
- **Large m, n (100×100):** Answer is C(198,99) ≈ 4.5×10^58 — overflows int. The problem constrains that answers fit in a 32-bit integer (m,n ≤ 100 is fine for the given test cases, but be careful with the combinatorial formula which can intermediate-overflow).
- **Obstacles variant (LC #63):** When a cell has an obstacle, set dp[j] = 0 for that cell. Left column cells below an obstacle also become 0.
