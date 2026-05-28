## Same pattern, different problem
- **Trapping Rain Water:** Can be solved with a monotonic stack where popping triggers a water-volume computation between the popped bar and the current bar — the same pop-and-compute structure, just measuring water instead of area.
- **Daily Temperatures:** Uses a monotonic decreasing stack (instead of increasing) where popping records the days-until-warmer answer — the same "pop when invariant is violated, record answer at pop time" mechanic.
- **Valid Parentheses:** The entry-level pop-on-match stack problem — the discipline of checking the stack top before popping is the same here; the trigger and computation are just different.
- **Maximal Rectangle (LC 85):** Extends this exact problem to a 2D binary matrix by reducing each row to a histogram problem and running this algorithm row by row.

## When this pattern applies
Use a monotonic increasing stack for problems that need the "nearest smaller element" to both the left and right of each bar simultaneously. The pop event is the moment when both boundaries become known: the current index is the right boundary and the new stack top is the left boundary. Problems with the pattern "for each element, find how far it can extend in both directions before hitting a smaller/larger constraint" — histograms, water trapping, building visibility — all reduce to this single-pass technique.
