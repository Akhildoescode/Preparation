## Understanding the problem
You are a robber planning to rob houses along a street. Each house has some amount of money. You cannot rob two adjacent houses (the alarm triggers). What is the maximum amount you can rob? This is a classic 1-D DP problem with a two-variable recurrence.

## Brute force
Try all 2^n subsets of houses, filter those with no two adjacent houses selected, and take the maximum sum. O(2^n) time.

## Key insight
At each house i, you make a binary choice: rob house i (in which case you cannot have robbed house i-1, so the best you could have gotten from houses 0..i-2 is dp[i-2]) or skip house i (in which case you keep whatever was optimal for houses 0..i-1, i.e., dp[i-1]). This gives the recurrence:
`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

## Optimal approach
1. Handle edge cases: empty array → 0; single house → nums[0].
2. Initialize: `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`.
3. For i from 2 to n-1: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
4. Return `dp[n-1]`.

Space-optimize: track only `prev2 = dp[i-2]` and `prev1 = dp[i-1]`.

## Why this works
The two cases at each house are exhaustive and mutually exclusive: either house i is robbed (contributing nums[i] on top of the best result from all non-adjacent earlier houses) or it isn't (the existing best carries forward). The max chooses the better option. The no-two-adjacent constraint is automatically enforced because dp[i-2] represents the best result achievable without touching house i-1.

## Complexity
- Time: O(n) — one pass through the array
- Space: O(1) with rolling variables (O(n) with full dp array)
