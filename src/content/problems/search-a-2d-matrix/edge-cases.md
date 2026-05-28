## Cases to mention to the interviewer

- **Empty matrix or empty row:** `matrix = []` or `matrix = [[]]` — guard with a check before setting up lo/hi.
- **Single cell:** `matrix = [[5]], target = 5` — lo=hi=0, mid=0, matrix[0][0]=5 matches immediately.
- **Single row:** Reduces to ordinary binary search on an array.
- **Single column:** `n=1`, mapping still works: `mid / 1 = mid`, `mid % 1 = 0`.
- **Target smaller than all elements:** `target < matrix[0][0]` — first comparison sets hi < lo, loop exits immediately, return false.
- **Target larger than all elements:** `target > matrix[m-1][n-1]` — lo grows past hi, return false.
