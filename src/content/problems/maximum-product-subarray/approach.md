## Understanding the problem
Given an integer array, find the contiguous subarray with the maximum product. Unlike Maximum Subarray (Kadane's for sum), products behave non-monotonically: a large negative product times another negative number becomes a large positive. We must track both the maximum and minimum product ending at each position.

## Brute force
Try every (i, j) pair and compute the product of nums[i..j]. O(n²) time. Can be optimized to O(n) with the insight below.

## Key insight
At each position i, the maximum product of a subarray ending at i is one of:
1. `nums[i]` alone (start fresh — useful when nums[i] is positive and the running product was negative).
2. `maxSoFar * nums[i]` — extending the previous maximum (works when both are positive).
3. `minSoFar * nums[i]` — negative × negative = positive (works when nums[i] is negative and minSoFar is a large negative).

We must track both `maxSoFar` and `minSoFar` because the minimum can become the maximum after multiplication by a negative.

## Optimal approach
```
maxProd = nums[0], minProd = nums[0], result = nums[0]
for i from 1 to n-1:
    if nums[i] < 0: swap(maxProd, minProd)   // negative flips max and min
    maxProd = max(nums[i], maxProd * nums[i])
    minProd = min(nums[i], minProd * nums[i])
    result = max(result, maxProd)
```

Or equivalently (without the swap trick):
```
temp = maxProd
maxProd = max(nums[i], temp * nums[i], minProd * nums[i])
minProd = min(nums[i], temp * nums[i], minProd * nums[i])
```

## Why this works
`maxProd` and `minProd` maintain the maximum and minimum products of any subarray ending at the current index. The `nums[i]` option (start fresh) handles the case where the running product is outweighed by starting a new subarray from position i. Taking the maximum and minimum across all three candidates ensures we don't miss the case where a negative times a negative becomes the new maximum.

## Complexity
- Time: O(n) — one pass
- Space: O(1) — only three variables
