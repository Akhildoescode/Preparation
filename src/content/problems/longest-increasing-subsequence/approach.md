## Understanding the problem
Given an integer array, find the length of the longest strictly increasing subsequence. Elements of the subsequence need not be contiguous — they can be any subset of the array picked in order, as long as each element is strictly greater than the previous.

## Brute force
Try all 2^n subsequences, filter those that are strictly increasing, and track the longest. O(2^n) time.

## Key insight (O(n²) DP)
Let `dp[i]` = length of the longest increasing subsequence ending at index i. Then:
`dp[i] = 1 + max(dp[j] for all j < i where nums[j] < nums[i])`
(At minimum, dp[i] = 1 — the element itself.) Answer: max of all dp[i].

## Key insight (O(n log n) patience sorting)
Maintain a list `tails` where `tails[k]` is the smallest possible tail element of any increasing subsequence of length k+1. For each new number:
- If it's larger than all current tails, extend the tails list (new longest subsequence).
- Otherwise, binary search for the first tail >= current number and replace it with the current number.

The length of `tails` is the LIS length. Note: `tails` is not the actual LIS — it's a bookkeeping device for efficiently tracking the minimum possible tails.

## Optimal approach (O(n log n))
```
tails = []
for num in nums:
    pos = binary search for first tails[pos] >= num
    if pos == tails.size(): tails.append(num)  // extend
    else: tails[pos] = num                     // replace (keep minimum tail)
return tails.size()
```

## Why this works
`tails` is always sorted (each element was the minimum tail for its length class). The binary search finds where `num` would fit. Replacing `tails[pos]` with `num` doesn't change the length of any existing subsequence — it just makes it possible to extend that class more easily in the future (smaller tail = more room for future elements). When we extend, we've found a new longer subsequence.

## Complexity
- Time: O(n²) for the DP approach; O(n log n) for the patience sorting approach
- Space: O(n) for the dp array or tails list
