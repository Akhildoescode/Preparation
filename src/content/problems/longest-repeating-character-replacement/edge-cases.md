## Cases to mention to the interviewer

- **Empty string:** The loop never executes, `l` stays 0, and `s.length() - l = 0`. Correct.

- **Single character string (e.g., "A", k=0):** The loop runs once, `maxCount=1`, window size=1, condition `1-1 > 0` is false. We return 1. Correct.

- **k = 0 (no replacements):** The window is valid only if all characters are the same. `maxCount` equals window size only when the whole window is one character. For "AABBB" with k=0, the answer is 3 (the B run). The algorithm naturally handles this because any mixed window triggers the shrink.

- **k >= s.length() (unlimited replacements):** Every possible window is valid — we can replace everything. The window expands to the full string and never shrinks. Return `s.length()`.

- **All identical characters (e.g., "AAAAA", k=2):** `maxCount` equals window size at every step, replacements needed = 0, window grows to full length. Return `s.length()`.

- **Alternating characters (e.g., "ABABAB", k=1):** At any given window, the best single-char frequency is roughly half the window. Valid window size = `2*k + 1` = 3 for k=1. Confirm the algorithm does not over-extend.

- **Integer overflow risk:** Window sizes are at most n ≈ 100,000 and k fits in an `int`. No overflow concern for this problem.
