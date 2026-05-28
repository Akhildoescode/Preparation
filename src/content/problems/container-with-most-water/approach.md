## Understanding the problem

You are given an integer array `height` of length `n`. Each element represents a vertical line at position `i` with height `height[i]`. Two lines and the x-axis form a container; you want to find the two lines that maximize the trapped water. The water volume for lines at indices `l` and `r` is `min(height[l], height[r]) * (r - l)`.

## Brute force

Check every pair (l, r) with l < r, compute `min(height[l], height[r]) * (r - l)`, and track the maximum. This is O(n²) time because there are n*(n-1)/2 pairs. For n = 100,000 that is roughly 5 billion multiplications — too slow by several orders of magnitude.

## Key insight

Start with the widest possible container (l = 0, r = n-1). To find a larger container we must increase the height factor, since width can only shrink. The shorter of the two lines is the binding constraint on water height. Moving the taller line inward can never help — it keeps the same height constraint (the short line) but reduces width. Therefore, always move the pointer pointing to the shorter line inward, hoping to find a taller line that overcomes the width reduction.

## Optimal approach

Pattern: **two pointers (shrinking window)**.

1. Set `l = 0`, `r = height.length - 1`, `maxWater = 0`.
2. While `l < r`:
   a. Compute `water = Math.min(height[l], height[r]) * (r - l)`.
   b. Update `maxWater = Math.max(maxWater, water)`.
   c. If `height[l] <= height[r]`, move `l++`; otherwise move `r--`.
3. Return `maxWater`.

The invariant is: we never discard a pair that could be the answer. Moving the shorter-side pointer is safe because every pair involving the shorter line with any inner position is already dominated by or equal to the current computation.

## Why this works

When `height[l] <= height[r]`, pairing `l` with any index between `l+1` and `r-1` produces at most `height[l] * (narrower width)` — all strictly worse than what we just measured. So index `l` can be permanently retired. The symmetric argument holds when `height[r]` is shorter. By induction, the optimum pair is never discarded before being evaluated.

## Complexity
- Time: O(n) because the two pointers together traverse the array exactly once, each index visited at most once.
- Space: O(1) because only a constant number of variables are maintained.
