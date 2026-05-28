## Cases to mention to the interviewer

- **Empty array:** The loop never runs, result is an empty array — correct.
- **Single element:** `[70]` — push index 0, loop ends, stack has [0]. Result stays [0]. No future day exists, so 0 is correct.
- **Strictly increasing temperatures:** `[70, 71, 72, 73]` — each new element pops all previous elements immediately. Each result[i] = 1 except the last which stays 0.
- **Strictly decreasing temperatures:** `[73, 72, 71, 70]` — no element is ever popped. Stack builds up to [0, 1, 2, 3]. All results stay 0. This is the worst case for stack space — all n indices remain.
- **All equal temperatures:** `[70, 70, 70]` — strict greater-than means no pops occur. All results are 0. Equal temperature is not warmer.
- **One warmer day at the very end:** `[70, 69, 68, 71]` — indices 0, 1, 2 all stay on the stack until i=3. All three get popped: result = [3, 2, 1, 0]. Tests that multiple pops in one iteration work correctly.
- **Integer overflow risk:** `i - j` — both are indices bounded by n ≤ 10⁵, well within int range. No overflow possible.
