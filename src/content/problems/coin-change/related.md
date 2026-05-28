## Pattern: 1-D Dynamic Programming (Unbounded Knapsack)

Coin Change is the canonical unbounded knapsack problem: minimize (or count) ways to fill a target using unlimited copies of each item. The DP table has one entry per amount, and each entry references a smaller subproblem.

## Related problems

- **Coin Change II (LC 518):** Count the number of combinations (not minimum count). Change `dp[a] = min(...)` to `dp[a] += dp[a - coin]`. Initialize `dp[0] = 1` (one way to make 0). Loop order matters: coins outer, amount inner avoids counting permutations.
- **Climbing Stairs (LC 70):** Equivalent to Coin Change with coins `[1, 2]` counting ways. `dp[n] = dp[n-1] + dp[n-2]` — Fibonacci recurrence.
- **Perfect Squares (LC 279):** Find minimum number of perfect squares summing to n. Coins are `[1, 4, 9, 16, ...]`. Same template.
- **Word Break (LC 139):** `dp[i]` = can the first i characters be segmented. Words are the "coins." `dp[0] = true`.
- **House Robber (LC 198):** 1-D DP but with a constraint: can't use adjacent elements. `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
- **Partition Equal Subset Sum (LC 416):** 0-1 knapsack variant — each element used at most once. Use 1-D boolean `dp` iterated in reverse to prevent reuse.

## DP problem-solving framework

1. **Define the subproblem:** `dp[a]` = minimum coins to make amount `a`.
2. **Recurrence:** `dp[a] = min over all coins: dp[a - coin] + 1`.
3. **Base case:** `dp[0] = 0`.
4. **Order:** Bottom-up, a = 1 to amount.
5. **Sentinel:** `amount + 1` (impossible value) for "unreachable" states.
6. **Answer:** `dp[amount]` (or -1 if still sentinel).
