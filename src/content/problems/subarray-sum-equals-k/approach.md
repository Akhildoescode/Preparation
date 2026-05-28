## Understanding the problem
Given an integer array (may contain negatives) and an integer `k`, count the total number of contiguous subarrays that sum exactly to `k`. The array can be large (n up to 2×10⁴) and values can be negative, so sliding window doesn't apply.

## Brute force
For each starting index i, accumulate a running sum going right, checking when the sum equals k. O(n²) time, O(1) space. With n = 20,000 this is 400M operations — marginal but passable. The interviewer will ask for O(n).

## Key insight
Prefix sum: let `prefix[j]` = sum of `nums[0..j]`. A subarray `nums[i..j]` has sum `prefix[j] - prefix[i-1]`. For this to equal k: `prefix[i-1] = prefix[j] - k`. So as we compute running prefix sums, for each `prefix[j]` we ask: how many times have we seen `prefix[j] - k` among all earlier prefix sums? A HashMap stores `{prefixSum → count of times seen}`.

## Optimal approach
1. Initialize a HashMap with `{0 → 1}` (prefix sum of 0, seen once before the array starts — handles subarrays starting at index 0).
2. Maintain `currentSum = 0`, `count = 0`.
3. For each `nums[i]`:
   - `currentSum += nums[i]`.
   - `count += map.getOrDefault(currentSum - k, 0)` — add the number of times `currentSum - k` appeared as an earlier prefix sum.
   - `map.put(currentSum, map.getOrDefault(currentSum, 0) + 1)`.
4. Return `count`.

Trace `nums = [1, 1, 1]`, k = 2:
- map = {0:1}, sum=0, count=0
- i=0: sum=1, look for -1 → 0 times. map={0:1, 1:1}
- i=1: sum=2, look for 0 → 1 time → count=1. map={0:1,1:1,2:1}
- i=2: sum=3, look for 1 → 1 time → count=2. map={0:1,1:1,2:1,3:1}
Answer: 2 (subarrays [1,1] starting at 0 and [1,1] starting at 1). ✓

## Why this works
`prefix[j] - prefix[i] = k` ↔ `prefix[i] = prefix[j] - k`. By looking up `currentSum - k` in the map (which holds all prefix sums from index -1 through j-1), we count every subarray ending at j that sums to k in O(1). The initial `{0 → 1}` handles the case where the subarray starts at index 0 (prefix from -1 is 0).

## Complexity
- Time: O(n) — one pass with O(1) HashMap operations.
- Space: O(n) for the prefix sum map.
