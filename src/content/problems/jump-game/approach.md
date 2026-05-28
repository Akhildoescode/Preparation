## Understanding the problem
Given an array where nums[i] is the maximum number of steps you can jump from index i, determine if you can reach the last index starting from index 0. You don't have to use all available jumps — you can jump fewer than nums[i] steps.

## Brute force (DP)
Let dp[i] = true if index i is reachable from index 0. dp[0]=true. For each reachable i, mark all indices i+1 through i+nums[i] as reachable. Return dp[n-1]. O(n²) time.

## Key insight
We don't need to track which indices are reachable — just the farthest index reachable at any point. Maintain `maxReach` = the farthest index reachable using any jumps discovered so far. At each index i:
- If i > maxReach: we can't reach index i — return false.
- Otherwise: update maxReach = max(maxReach, i + nums[i]).
If we successfully process index n-1, return true.

## Optimal approach (greedy)
```
maxReach = 0
for i from 0 to n-1:
    if i > maxReach: return false
    maxReach = max(maxReach, i + nums[i])
return true
```

## Why this works
`maxReach` is the frontier: the farthest position reachable from any previously visited index. If `i > maxReach`, there's a gap — no previously reachable index can jump this far, so index i is unreachable. By scanning left-to-right and greedily extending the frontier, we process all reachable positions without needing to track which ones specifically. If the loop completes (we never got stuck), every index up to n-1 was reachable, so we return true.

## Complexity
- Time: O(n) — one pass through the array
- Space: O(1) — only the `maxReach` variable
