## Cases to mention to the interviewer

- **Missing 0:** `nums = [1, 2, 3]`. Expected = 6, actual = 1+2+3 = 6... wait: n=3, expected = 3*4/2 = 6, actual = 1+2+3 = 6, missing = 0. Correct.
- **Missing n (the largest value):** `nums = [0, 1, 2]`, n=3. Expected = 6, actual = 3, missing = 3. Correct.
- **Single element, missing 0:** `nums = [1]`. n=1, expected = 1, actual = 1. Missing = 0.
- **Single element, missing 1:** `nums = [0]`. n=1, expected = 1, actual = 0. Missing = 1.
- **Integer overflow concern:** For n around 10^5, n*(n+1)/2 ≈ 5×10^9 — exceeds int range. Use `long` for large n.
- **Already complete (not valid input, just to verify):** The problem guarantees one missing number. If the array were [0,1,2,3] with n=3, the formula would give 0 — but this input violates the problem constraints.
