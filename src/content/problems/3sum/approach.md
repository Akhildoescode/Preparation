## Understanding the problem
Find all unique triplets (a, b, c) in the array such that a + b + c = 0. The result cannot contain duplicate triplets. Elements may be used by their position (multiple elements at different indices can have the same value), but each position may only contribute to one element per triplet.

## Brute force
Three nested loops trying all combinations: O(n³). Even with a Set to deduplicate, this is unacceptably slow for n = 3000.

## Key insight
Sort the array first. Then fix one element with an outer loop and use **two pointers** on the remaining sorted subarray to find pairs that sum to `-nums[i]`. Sorting enables both:
1. Efficient two-pointer traversal (O(n) per fixed element instead of O(n²)).
2. Easy deduplication — skip consecutive duplicate values by comparing with the previous element.

## Optimal approach
1. Sort `nums` in ascending order.
2. Iterate `i` from 0 to n-3:
   - Skip if `nums[i] == nums[i-1]` (duplicate fixed element — would produce duplicate triplets).
   - Early exit if `nums[i] > 0` — since the array is sorted, all remaining elements are also positive, and a+b+c > 0 is impossible.
   - Set `left = i+1`, `right = n-1`.
   - While `left < right`:
     - Compute `sum = nums[i] + nums[left] + nums[right]`.
     - If sum == 0: record triplet, advance `left` and `right`, then **skip duplicates** on both sides.
     - If sum < 0: `left++` (need a larger sum).
     - If sum > 0: `right--` (need a smaller sum).

Trace through `[-4, -1, -1, 0, 1, 2]` with i=1 (nums[i]=-1):
- left=2, right=5: sum = -1 + (-1) + 2 = 0 → record [-1,-1,2], skip dup left (skip nothing here), right--
- left=2, right=4: sum = -1 + (-1) + 1 = -1 < 0 → left++
- left=3, right=4: sum = -1 + 0 + 1 = 0 → record [-1,0,1], done

## Why this works
After sorting, the two-pointer sweep is correct because increasing `left` increases the sum and decreasing `right` decreases it — we only move in one direction at each step. Duplicate skipping is safe because if we've already processed a value at `left` (or `right`), using it again at the next position with the same `i` would produce an identical triplet.

## Complexity
- Time: O(n²) — O(n log n) sorting + O(n) outer loop × O(n) two-pointer sweep.
- Space: O(log n) to O(n) for sorting (in-place sort's stack); O(1) extra beyond output.
