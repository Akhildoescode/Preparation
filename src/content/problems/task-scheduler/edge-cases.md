## Cases to mention to the interviewer

- **Empty tasks array:** Should return 0. The formula gives max(0, ...) — but clarify with the interviewer since LeetCode guarantees non-empty input.
- **n = 0 (no cooldown):** Every task can run back to back. The formula yields max(tasks.length, maxCount * 1 + numMaxCount - 1) which simplifies to tasks.length. No idle slots ever needed.
- **All tasks identical:** e.g., tasks = [A, A, A, A], n = 2. Result = (4-1)*(3) + 1 = 10. Schedule: A _ _ A _ _ A _ _ A. The formula handles this correctly because numMaxCount = 1.
- **All tasks distinct:** e.g., tasks = [A, B, C, D], n = 3. maxCount = 1, formula = max(4, 0 + 4) = 4. No idle needed since every task only appears once.
- **Multiple tasks tie for max frequency:** e.g., tasks = [A, A, B, B, C, C], n = 2. numMaxCount = 3, formula = max(6, (2-1)*3 + 3) = max(6, 6) = 6. They pack perfectly with no idle.
- **Large n with few task types:** e.g., tasks = [A, A, B], n = 10. maxCount = 2, numMaxCount = 1, formula = max(3, 1*11 + 1) = max(3, 12) = 12. Long idle stretches dominate.
