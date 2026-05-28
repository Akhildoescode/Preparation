## Understanding the problem
Given a sorted array of distinct integers and a target, return the index of target, or -1 if absent. The tricky part is that "sorted" is the precise condition binary search exploits — it lets us discard half the search space with each comparison.

## Brute force
Scan every element linearly. O(n) time, O(1) space. Adequate for small inputs but ignores the sorted property entirely.

## Key insight
If the middle element equals the target, done. If it's less than the target, the target must be in the right half (since the array is sorted). If it's greater, the target is in the left half. This halves the search space every step.

## Optimal approach
Maintain two pointers `lo = 0` and `hi = nums.length - 1`. While `lo <= hi`:
1. Compute `mid = lo + (hi - lo) / 2` (avoids overflow vs `(lo+hi)/2`).
2. If `nums[mid] == target` → return `mid`.
3. If `nums[mid] < target` → `lo = mid + 1`.
4. If `nums[mid] > target` → `hi = mid - 1`.
Return -1 if the loop exits without finding target.

## Why this works
The invariant is: if the target exists it must be in `[lo, hi]`. Each step narrows this range by at least half without skipping over target. When `lo > hi` the range is empty, so target is absent.

## Complexity
- Time: O(log n) because the search range halves each iteration
- Space: O(1) — only two pointers
