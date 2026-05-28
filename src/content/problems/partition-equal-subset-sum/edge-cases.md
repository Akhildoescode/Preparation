## Cases to mention to the interviewer

- **Odd total sum:** e.g., [1,2,3,5]. Sum=11 (odd) → return false immediately.
- **Single element:** [4]. totalSum=4, target=2. dp[2] never gets set (num=4 > target=2, inner loop doesn't execute). Return false. Correct — can't split a single element.
- **Two equal elements:** [5,5]. target=5. After num=5: dp[5]=dp[0]=true. Return true. Correct.
- **All same elements, even count:** [3,3,3,3]. target=6. After processing, dp[6]=true (two groups of two 3s each sum to 6). Correct.
- **Large values near constraint boundary:** nums[i] up to 100, n up to 200 — max sum 20,000, target <= 10,000. DP table is 10,001 booleans — very manageable in memory.
- **Target reachable via multiple paths:** e.g., [5,5,1,11]. Sum=22, target=11. After first 5: dp[5]=true. After second 5: dp[10]=true. After 1: dp[11]=dp[10]=true → return true immediately via early exit. Correct — the subset {5,5,1} sums to 11.
