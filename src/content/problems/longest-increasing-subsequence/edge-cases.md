## Cases to mention to the interviewer

- **Single element:** `nums = [5]` → LIS length = 1. tails = [5] after one iteration.
- **Strictly decreasing:** `nums = [5,4,3,2,1]` → LIS length = 1. Each new element replaces tails[0] since it's smaller than all tails; tails never grows beyond 1.
- **Already strictly increasing:** `nums = [1,2,3,4,5]` → LIS length = 5. Every element extends tails.
- **Duplicates present:** `nums = [1,3,3,5]` → LIS = 3 ([1,3,5]). The lower bound (first >=) replaces the existing 3 with 3, effectively not extending. Correct since equal elements are not allowed.
- **Ties for LIS length:** `nums = [3,1,4,1,5]` → LIS = 3 ([1,4,5] or [3,4,5]). The algorithm returns 3 regardless of which actual subsequence is longest.
- **All same elements:** `nums = [2,2,2]` → LIS = 1. Each 2 replaces tails[0]; tails stays length 1.
