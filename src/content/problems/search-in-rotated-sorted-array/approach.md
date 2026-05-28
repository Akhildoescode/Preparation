## Understanding the problem
A sorted array was rotated at some unknown pivot. Given a target, find its index in O(log n) or return -1. The array has no duplicates.

## Brute force
Linear scan: O(n). Correct but doesn't use the sorted structure. We need O(log n).

## Key insight
Even though the array is rotated, **one half is always fully sorted**. At any `mid` point, either `[left, mid]` or `[mid+1, right]` is in sorted order. Determine which half is sorted, check if the target falls in that sorted half, then discard the other half.

## Optimal approach — Modified Binary Search
- `left = 0`, `right = n - 1`.
- While `left <= right`:
  - `mid = left + (right - left) / 2`.
  - If `nums[mid] == target`: return `mid`.
  - **Determine which half is sorted:**
    - If `nums[left] <= nums[mid]` → left half `[left, mid]` is sorted:
      - If `nums[left] <= target < nums[mid]` → target is in left half → `right = mid - 1`.
      - Else → target is in right half → `left = mid + 1`.
    - Else → right half `[mid, right]` is sorted:
      - If `nums[mid] < target <= nums[right]` → target is in right half → `left = mid + 1`.
      - Else → target is in left half → `right = mid - 1`.
- Return -1.

Trace `[4, 5, 6, 7, 0, 1, 2]`, target=0:
- left=0, right=6, mid=3 (7). nums[0]=4 ≤ nums[3]=7 → left sorted. target=0, is 4 ≤ 0 < 7? No. Go right: left=4.
- left=4, right=6, mid=5 (1). nums[4]=0 ≤ nums[5]=1 → left sorted. Is 0 ≤ 0 < 1? Yes! Go left: right=4.
- left=4, right=4, mid=4 (0). nums[4]==target=0 → return 4. ✓

## Why this works
The rotation creates at most one "break point." At any mid, one half is always contiguous and sorted. By identifying which half that is, we can definitively determine which half the target must be in — even without knowing the pivot location.

## Complexity
- Time: O(log n).
- Space: O(1).
