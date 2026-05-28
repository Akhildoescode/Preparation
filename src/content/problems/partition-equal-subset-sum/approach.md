## Understanding the problem
Given a non-empty array of positive integers, determine whether it can be partitioned into two subsets with equal sum. If the total sum is odd, impossible. Otherwise, the target for each subset is sum/2 — we just need to find one subset summing to sum/2 (the other automatically has the remaining sum).

## Brute force
Try all 2^n subsets and check if any sums to target. O(2^n) time.

## Key insight
This is the 0/1 Knapsack problem: can we choose a subset of elements (each used at most once) that sums exactly to `target = totalSum / 2`? The DP state: `dp[s]` = true if sum `s` is achievable with some subset of elements seen so far.

## Optimal approach
1. Compute `totalSum`. If odd, return false.
2. `target = totalSum / 2`.
3. `dp[0] = true` (empty subset achieves sum 0); all other `dp[s] = false`.
4. For each `num` in `nums`:
   - Iterate `s` from `target` down to `num`:
     - `dp[s] |= dp[s - num]` (can we achieve sum s by including num?)
5. Return `dp[target]`.

**Why iterate `s` from high to low?** We don't want to use `num` more than once. If we iterate low-to-high, `dp[s - num]` might already reflect `num` being included (a "0/1" becomes an "unbounded" knapsack). Iterating high-to-low ensures `dp[s - num]` still represents the state before adding `num`.

## Why this works
`dp[s]` tracks whether sum `s` is achievable with elements processed so far. For each new element `num`, any sum that was achievable before can now also be achievable with `num` added — `dp[s] = dp[s] OR dp[s - num]`. The high-to-low iteration prevents double-counting `num`.

## Complexity
- Time: O(n * target) = O(n * sum/2)
- Space: O(target) for the boolean array
