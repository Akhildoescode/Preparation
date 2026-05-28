## Cases to mention to the interviewer

- **Empty array:** `nums = []` — the while loop never executes, return -1 immediately.
- **Single element, found:** `nums = [5], target = 5` — mid=0 matches on the first iteration.
- **Single element, not found:** `nums = [5], target = 3` — mid=0, nums[0]=5 > 3, hi=-1, loop exits, return -1.
- **Target at the first position:** `nums = [1, 3, 5, 7], target = 1` — correctly narrows lo and hi until only index 0 remains.
- **Target at the last position:** `nums = [1, 3, 5, 7], target = 7` — correctly narrows until only the last index remains.
- **Integer overflow in mid:** If lo and hi are both near `Integer.MAX_VALUE`, `(lo + hi) / 2` overflows. The `lo + (hi - lo) / 2` form is safe.
