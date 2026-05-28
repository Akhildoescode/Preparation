## Cases to mention to the interviewer

- **Single candidate equals target:** `candidates=[7], target=7` → `[[7]]`. One iteration, remaining drops to 0.
- **No valid combination:** `candidates=[3,5], target=7` — 3+3=6, 3+5=8, 5+5=10, none equal 7. Returns `[]`.
- **Target smaller than all candidates:** All candidates exceed `remaining` on the first loop iteration — the `break` triggers immediately, returning `[]`.
- **Multiple copies needed:** `candidates=[2], target=6` → `[[2,2,2]]`. Recursing with `i` (not `i+1`) is essential.
- **Candidates include 1:** `candidates=[1,2], target=4` — many valid combinations; ensure recursion terminates (remaining hits 0, not < 0, since we break when candidate > remaining).
- **Large target with small candidates:** Can lead to deep recursion (depth T/M). With T=40 and M=1, depth is 40 — fine for typical constraints.
