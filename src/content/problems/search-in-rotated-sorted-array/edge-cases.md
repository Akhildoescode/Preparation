## Cases to mention to the interviewer

- **Not rotated (rotation at index 0):** `nums = [1,3,5,7], target = 3` → standard binary search. `nums[mid] >= nums[lo]` always true (left half always sorted). Works correctly.
- **Rotated by 1:** `nums = [7,1,3,5], target = 1`. lo=0,hi=3,mid=1. nums[1]=1 = target → return 1. ✓
- **Target at lo or hi:** `nums = [4,5,6,7,0,1,2], target = 4`. lo=0. First iteration: mid=3 (7≠4), nums[0]=4 ≤ nums[3]=7 (left sorted), target 4 in [4,7]? Yes (4 ≤ 4 < 7) → hi=3. mid=1 (5≠4), left [4,5] sorted, 4 in [4,5]? Yes → hi=1. mid=0 → nums[0]=4 = target → return 0. ✓
- **Target not in array:** `nums = [4,5,6,7,0,1,2], target = 3` → returns -1.
- **Single element, match:** `nums = [5], target = 5` → lo=hi=0. Return when `nums[lo] == target` — but the while loop `lo < hi` doesn't execute. We need a check after the loop: `return nums[lo] == target ? lo : -1`. ✓
- **Single element, no match:** `nums = [5], target = 3` → after loop, `nums[lo] = 5 ≠ 3` → return -1. ✓
- **Two elements:** `nums = [3,1], target = 1`. lo=0,hi=1,mid=0. nums[0]=3≠1. nums[0]=3 ≥ nums[0]=3 (left sorted): is 1 in [3,3]? No → lo=1. Loop ends. nums[1]=1 = target → return 1. ✓
- **Negative values:** The algorithm compares values, so negative numbers work the same as positive — no special handling needed.
- **Pivot detection is implicit:** We don't explicitly find the pivot. The condition `nums[lo] ≤ nums[mid]` tells us whether the left half is sorted, which is all we need to determine which half to search.
