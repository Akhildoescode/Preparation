## Cases to mention to the interviewer

- **n = 1:** Single element — already at the last index. Return true. i=0, 0 > 0 is false, loop ends, return true.
- **nums[0] = 0 and n > 1:** Stuck at the start immediately. i=0: maxReach stays 0. i=1: 1 > 0 → return false.
- **All zeros except nums[0]:** nums = [5,0,0,0,0]. maxReach reaches 5 at i=0. All subsequent indices are ≤ 5 so never trigger the false condition. Return true.
- **nums = [0]:** n=1, return true. Already at destination.
- **Large jump at start:** nums = [10,0,0,...,0] (length 11). From index 0, maxReach = 10 = last index. Loop continues but never exceeds maxReach. Return true.
- **Last position is 0:** nums = [2,3,1,1,0] (last value 0). The last index is 4. As long as index 4 is reachable (it is, via index 3), return true — we don't need to *jump* from the last position, just *reach* it.
