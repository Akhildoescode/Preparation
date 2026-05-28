## Understanding the problem
Given an integer array (which may contain negatives), find the contiguous subarray that has the largest sum and return that sum. The array has at least one element, so the answer is always defined — even if all numbers are negative, the best single element is the answer.

## Brute force
Try every possible subarray by enumerating start and end indices. An O(n²) version computes running sums as it extends each subarray. An O(n³) version recomputes the sum from scratch each time. Both are too slow for n = 10⁵.

## Key insight
Kadane's insight: at each position, you face a binary choice — should the current element **extend the existing subarray** or **start a brand-new subarray**? Starting fresh makes sense only when the accumulated sum so far has gone negative, because a negative prefix can only *reduce* any future subarray. So: `currentSum = max(nums[i], currentSum + nums[i])`.

## Optimal approach — Kadane's Algorithm
Maintain two variables:
- `currentSum`: the maximum sum of any subarray ending exactly at position `i`.
- `maxSum`: the global maximum seen so far.

For each element `nums[i]`:
1. `currentSum = Math.max(nums[i], currentSum + nums[i])` — either extend or restart.
2. `maxSum = Math.max(maxSum, currentSum)` — update global best.

Trace through `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:
- i=0: current=-2, max=-2
- i=1: current=max(1,-2+1)=max(1,-1)=1, max=1
- i=2: current=max(-3,1-3)=max(-3,-2)=-2, max=1
- i=3: current=max(4,-2+4)=max(4,2)=4, max=4
- i=4: current=max(-1,4-1)=3, max=4
- i=5: current=max(2,3+2)=5, max=5
- i=6: current=max(1,5+1)=6, max=6
- i=7: current=max(-5,6-5)=1, max=6
- i=8: current=max(4,1+4)=5, max=6 → answer: 6 (subarray [4,-1,2,1])

## Why this works
`currentSum` is the tightest possible description of the best subarray ending at position `i`. If `currentSum` is negative, including it can only hurt any extension to the right, so starting fresh is always better. The recurrence correctly captures this in one comparison. The global `maxSum` captures the best seen over all positions.

## Complexity
- Time: O(n) because we make one pass with O(1) work per element.
- Space: O(1) — only two variables, no auxiliary storage.
