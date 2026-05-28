## Cases to mention to the interviewer

- **Negative numbers:** `nums = [-3, 4, 7]`, target = 1. The complement of -3 is 4. The HashMap handles negatives transparently — no special casing needed.
- **Two identical values that sum to target:** `nums = [3, 3]`, target = 6. Because we check before inserting, the second 3 correctly finds the first 3 in the map. Returns `[0, 1]`.
- **Same value, wrong target:** `nums = [3, 3]`, target = 7. Neither 3's complement (4) appears. No false match. Returns properly (or throws — problem says exactly one solution exists).
- **Exactly two elements:** `nums = [1, 9]`, target = 10. Should immediately return `[0, 1]` on the second iteration.
- **Large values — integer overflow risk:** `nums = [1_500_000_000, 1_500_000_000]`, target = 3_000_000_000. `target - nums[i]` would overflow a 32-bit int since 3B > Integer.MAX_VALUE (≈ 2.1B). Clarify with interviewer whether target can exceed `Integer.MAX_VALUE`. If so, use `long` for target and complement.
- **Element appearing multiple times with different answers:** `nums = [1, 2, 3, 1]`, target = 2. The answer is `[0, 3]` (two 1s), not `[0, 1]` (1+2=3≠2). Handled correctly because the map entry for `1` is always the earliest index.
