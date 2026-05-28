## Same pattern, different problem
- **Largest Rectangle in Histogram:** Uses a monotonic increasing stack (instead of decreasing) where popping triggers an area computation — the same pop-and-act mechanic, just a different trigger condition and computation.
- **Trapping Rain Water:** Can be solved with a monotonic stack approach — pop when a taller bar is found and compute the trapped water, same "resolve pending items on a trigger" logic.
- **Valid Parentheses:** The simpler version of this pattern — push openers, pop and check on closers. Here the "check" is a temperature comparison instead of a bracket match.
- **Min Stack:** Extends the stack concept by tracking auxiliary information (running minimum) alongside the main data — same ArrayDeque discipline.

## When this pattern applies
Use a monotonic stack whenever each element needs to find its "nearest greater (or smaller) element" to the left or right. The invariant is that the stack remains sorted (increasing or decreasing) by maintaining it: pop any element that violates the sort order and at that moment of popping, you know the triggering element is the answer for the popped element. "Next greater element", "next smaller element", "days until warmer", "nearest taller building" — all are instances of this pattern.
