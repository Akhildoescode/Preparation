## Understanding the problem
A sorted array of distinct integers was rotated at an unknown pivot. We must find the minimum element in O(log n) time. The rotation creates two sorted halves; the minimum sits at the boundary between them.

## Brute force
Scan every element, track the minimum. O(n) time, O(1) space. Ignores the partial sorted structure.

## Key insight
Compare `nums[mid]` with `nums[hi]`. If `nums[mid] > nums[hi]`, the right half is the "small" half — the rotation point (and the minimum) is somewhere in `[mid+1, hi]`. If `nums[mid] <= nums[hi]`, the left half contains the rotation or mid is the minimum — search `[lo, mid]` (keep mid because it could be the answer).

## Optimal approach
Binary search with a right-boundary comparison:
1. `lo = 0, hi = nums.length - 1`.
2. While `lo < hi`:
   - `mid = lo + (hi - lo) / 2`
   - If `nums[mid] > nums[hi]`: minimum is in the right half — `lo = mid + 1`.
   - Else: minimum is at `mid` or in the left half — `hi = mid`.
3. Return `nums[lo]` (lo == hi at termination).

## Why this works
The invariant is: the minimum is always in `[lo, hi]`. When `nums[mid] > nums[hi]`, the entire left half `[lo, mid]` is larger than `nums[hi]`, so the minimum cannot be there. When `nums[mid] <= nums[hi]`, mid could be the minimum, so we don't exclude it (`hi = mid` not `hi = mid - 1`). The range shrinks at each step, so the loop terminates.

## Complexity
- Time: O(log n) because we halve the search range each iteration
- Space: O(1)
