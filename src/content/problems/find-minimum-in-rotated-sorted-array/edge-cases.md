## Cases to mention to the interviewer

- **No rotation (already sorted):** `[1, 2, 3, 4, 5]` — the algorithm correctly converges to index 0 because `nums[mid] <= nums[hi]` always holds, pushing `hi` down.
- **Rotated by 1:** `[2, 3, 4, 5, 1]` — minimum is at the last position; the algorithm correctly identifies it.
- **Single element:** `[3]` — lo == hi immediately, return nums[0].
- **Two elements, rotated:** `[2, 1]` — mid=0, nums[0]=2 > nums[1]=1, lo=1. lo==hi=1, return nums[1]=1. Correct.
- **Two elements, not rotated:** `[1, 2]` — mid=0, nums[0]=1 <= nums[1]=2, hi=0. lo==hi=0, return nums[0]=1. Correct.
- **Duplicates (LC #154 variant):** With duplicates, if `nums[mid] == nums[hi]`, we can't determine which side; must do `hi--` and fall back to O(n) in the worst case. (LC #153 guarantees distinct values.)
