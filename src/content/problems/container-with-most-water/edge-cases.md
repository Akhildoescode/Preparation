## Cases to mention to the interviewer

- **Minimum input (two elements):** `height = [a, b]` — only one container possible. The loop runs once, computes `min(a, b) * 1`, and terminates. No special handling needed.

- **All equal heights (e.g., [5, 5, 5, 5]):** Every inner pair has the same height; the widest pair (first and last) gives the maximum area. The algorithm naturally picks this up on the very first iteration and all subsequent steps only find equal or smaller areas.

- **Monotonically increasing heights (e.g., [1, 2, 3, 4, 5]):** The left pointer advances at every step because the left wall is always shorter. The winner might be found early (wide + medium heights) or late — the algorithm handles this without special cases.

- **One very tall wall and all others short (e.g., [1, 1, 1, 100, 1, 1]):** The answer is determined by the short partners, not the giant wall. The giant wall can never be the binding constraint when paired with a short neighbor, so correctly the algorithm picks the widest pairing involving reasonably tall walls.

- **Heights with zeros (e.g., [0, 5, 3, 0]):** A container touching a zero-height wall holds no water — area = 0. The `Math.min` returns 0, so these pairs contribute nothing and the zero-height pointer is immediately retired.

- **Integer overflow risk:** `height[i]` up to 10,000 and `n` up to 100,000 gives a max product of 10^9, which fits in a 32-bit `int` (max ~2.1 × 10^9). Still worth mentioning to show awareness; use `long` if constraints were relaxed.
