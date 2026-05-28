## Cases to mention to the interviewer

- **`amount = 0`:** `dp[0] = 0`. Return 0 immediately (zero coins needed). The sentinel initialization doesn't matter for index 0 since we immediately set it to 0.
- **No valid combination:** `coins = [2], amount = 3` → dp[3] remains `amount + 1 = 4` → return -1. No way to make odd amounts with only even coins.
- **Single coin equals amount:** `coins = [5], amount = 5` → dp[5] = dp[0] + 1 = 1. Answer: 1 coin.
- **Coin larger than amount:** `coins = [5, 10], amount = 3` → all coins exceed `a` for a=1,2,3 → dp[3] stays sentinel → return -1.
- **Amount = 1:** Only possible if coins contains 1. `coins = [1], amount = 1` → dp[1] = 1. `coins = [2,3], amount = 1` → -1.
- **Large amount, coin = 1:** Always solvable — dp[a] = a (use a coins of denomination 1). The sentinel check `dp[amount] > amount` is safe because dp[amount] = amount ≤ amount.
- **Why not `Integer.MAX_VALUE` as sentinel?** `Integer.MAX_VALUE + 1` overflows to `Integer.MIN_VALUE`, making `Math.min` choose the wrong value. `amount + 1` is the right sentinel.
- **Coins can be used unlimited times:** This is unbounded knapsack, not 0-1 knapsack. The inner loop doesn't modify which coins are "used" — each `dp[a]` can use any coin any number of times.
- **Order of loops (coins outer vs. amount outer):** Both orderings give the same result for this problem. Coins outer gives "how many ways" (with order mattering); amount outer as written here gives the minimum count correctly.
