## Cases to mention to the interviewer

- **Single bar:** `[5]` — push 0, sentinel triggers pop: height=5, stack empty, width=1, area=5. Returns 5.
- **All equal heights:** `[3, 3, 3]` — no pops until sentinel. Sentinel pops each bar; the last one popped (index 0) has stack empty, width=3 (the full array). Area = 3×3 = 9. The full-width rectangle is found correctly.
- **Strictly increasing heights:** `[1, 2, 3, 4]` — no pops until sentinel. All bars are popped by the sentinel. The widest rectangles (those extending left) are computed correctly by the empty-stack branch of the width formula.
- **Strictly decreasing heights:** `[4, 3, 2, 1]` — every new bar triggers pops of taller bars to its left. Each bar becomes its own right boundary quickly. The tallest bar (index 0, height 4) gets width=1.
- **All zeros:** `[0, 0, 0]` — sentinel pops bars of height 0. All areas = 0. Returns 0. No rectangle of positive area exists.
- **Single tall bar surrounded by zeros:** `[0, 5, 0]` — index 1 (height 5) is pushed, then i=2 (height 0) pops it: height=5, width=2-0-1=1, area=5. Returns 5. The zeros correctly bound the tall bar.
- **Integer overflow risk:** Heights up to 10⁴ and n up to 10⁵ gives max area 10⁹ — fits in `int`. If constraints are larger, use `long` for the area computation.
