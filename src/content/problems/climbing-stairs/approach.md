## Understanding the problem
You are climbing a staircase. It takes n steps to reach the top. Each time you can climb either 1 or 2 steps. In how many distinct ways can you reach the top? This is the classic DP warm-up — the answer is the nth Fibonacci number.

## Brute force
Recursively enumerate all ways: from position i, try going to i+1 or i+2, and count paths that reach n. O(2^n) time due to exponential branching. Many subproblems are recomputed redundantly.

## Key insight
The number of ways to reach step i equals the number of ways to reach step i-1 (take one more step from there) plus the number of ways to reach step i-2 (take a 2-step from there). This recurrence is identical to Fibonacci: `dp[i] = dp[i-1] + dp[i-2]`.

## Optimal approach
**DP with array:**
- `dp[0] = 1` (one way to "reach" step 0 — do nothing)
- `dp[1] = 1` (one way to reach step 1 — take one 1-step)
- For i from 2 to n: `dp[i] = dp[i-1] + dp[i-2]`
- Return `dp[n]`

**Space-optimized (two variables):**
Track only `prev2` and `prev1` (the last two values), updating them in a loop. O(1) space.

## Why this works
Every path to step i must have come from either step i-1 or step i-2. These two sets of paths are disjoint (different last steps), so the counts add. The base cases dp[0]=1 and dp[1]=1 are the smallest valid cases from which the recurrence builds upward.

## Complexity
- Time: O(n) — one pass from 2 to n
- Space: O(1) with the two-variable approach (O(n) with the array)
