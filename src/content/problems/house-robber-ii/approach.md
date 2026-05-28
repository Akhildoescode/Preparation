## Understanding the problem
Same as House Robber, but the houses are arranged in a circle — the first and last house are adjacent. This means you cannot rob both house 0 and house n-1. The circular constraint breaks the simple 1-D DP because the first and last positions are coupled.

## Brute force
Try all 2^n subsets with no two adjacent (wrapping around). O(2^n) time.

## Key insight
In a circular arrangement, either house 0 is robbed OR house n-1 is robbed (or neither), but never both. So we can break the circle into two linear problems:
1. Consider houses 0..n-2 (include house 0, exclude house n-1).
2. Consider houses 1..n-1 (exclude house 0, include house n-1).

Run the standard House Robber (linear) on each range and take the maximum of the two results.

## Optimal approach
```
return max(robLinear(nums, 0, n-2), robLinear(nums, 1, n-1));
```
Where `robLinear(nums, start, end)` runs the linear House Robber algorithm on the subarray.

## Why this works
Any optimal solution to the circular problem either:
- Robs house 0 (so cannot rob house n-1, making it equivalent to the linear problem on nums[0..n-2]), or
- Doesn't rob house 0 (so it's the linear problem on nums[1..n-1]).

We take the max of these two cases. Note: the case where neither house 0 nor n-1 is robbed is covered by both subproblems (either linear sub-problem can choose not to include its last element).

## Complexity
- Time: O(n) — two linear passes
- Space: O(1) — each pass uses rolling variables
