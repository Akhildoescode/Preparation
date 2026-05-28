## Understanding the problem
Given an array of coin denominations and a total amount, find the minimum number of coins needed to make up the amount. Coins may be used any number of times. Return -1 if the amount cannot be made.

## Brute force
Try all combinations of coins recursively — O(amount^n) with memoization but without it. Exponential.

## Key insight
1-D dynamic programming: `dp[a]` = minimum coins to make amount `a`. Build it bottom-up from 0 to `amount`. For each amount, try every coin: `dp[a] = min(dp[a], dp[a - coin] + 1)` — one more coin than the optimal way to make `a - coin`.

## Optimal approach — Bottom-up DP
1. `dp[0] = 0` (zero coins to make 0).
2. `dp[1..amount] = Integer.MAX_VALUE` (unknown yet — "infinity").
3. For each amount `a` from 1 to `amount`:
   - For each coin `c` in `coins`:
     - If `a >= c` and `dp[a - c] != MAX_VALUE`:
       - `dp[a] = min(dp[a], dp[a - c] + 1)`.
4. Return `dp[amount] == MAX_VALUE ? -1 : dp[amount]`.

Trace `coins=[1,2,5]`, amount=11:
- dp[0]=0, dp[1]=1(1-coin), dp[2]=1(2-coin), dp[3]=2(2+1), dp[4]=2, dp[5]=1(5-coin), dp[6]=2, dp[7]=2, dp[8]=3, dp[9]=3, dp[10]=2(5+5), dp[11]=3(5+5+1). ✓

## Why this works
The DP builds on smaller subproblems: to make amount `a` using coin `c`, we need to know the optimal way to make `a - c`. Since every coin value is positive, `a - c < a`, so `dp[a - c]` is always computed before `dp[a]`. The outer loop over amounts ensures this ordering.

## Complexity
- Time: O(amount × |coins|) — for each of the `amount` positions, we try each coin.
- Space: O(amount) for the dp array.
