## Understanding the problem
Same as Jump Game, but now return the minimum number of jumps to reach the last index (guaranteed reachable). The challenge is determining when we must make a jump to extend our reach — using the fewest jumps possible.

## Brute force (DP)
dp[i] = minimum jumps to reach index i. dp[0]=0. For each i, update all indices j reachable from i: dp[j] = min(dp[j], dp[i]+1). O(n²) time.

## Key insight
Think of jumps as "levels" in a BFS tree. The current "level" spans from the position after the last jump (curStart) to the farthest position reachable without making another jump (curEnd). When we move past curEnd, we must make another jump to enter the next level — the next level extends from curEnd+1 to the farthest position reachable from any index in [curStart, curEnd].

## Optimal approach (greedy BFS)
```
jumps = 0, curEnd = 0, farthest = 0
for i from 0 to n-2:      // don't need to jump from the last index
    farthest = max(farthest, i + nums[i])
    if i == curEnd:        // reached the end of current level
        jumps++
        curEnd = farthest
return jumps
```

## Why this works
`curEnd` marks the farthest index reachable within the current "jump level." By scanning all indices in the current level and tracking `farthest` (the farthest reachable from this level), we determine the span of the next level with certainty. When `i == curEnd`, we commit to the next jump — it's the minimum possible because we've exhausted all options at this level before jumping.

## Complexity
- Time: O(n) — one pass
- Space: O(1)
