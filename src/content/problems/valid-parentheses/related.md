## Same pattern, different problem
- **Daily Temperatures:** Uses a stack to track unresolved items waiting for a future event — the same "push when open, resolve when we find the match" structure, just applied to indices waiting for a warmer day.
- **Largest Rectangle in Histogram:** Uses a monotonic stack where popping triggers computation — the pop-and-act mechanic is the same as popping an opener when a closer is found.
- **Min Stack:** Directly extends the stack data structure with an auxiliary tracking stack — builds on the same ArrayDeque discipline.
- **Decode String:** Uses a stack to track characters and repeat counts when entering/exiting nested brackets — same LIFO nesting structure as valid parentheses.

## When this pattern applies
Reach for a stack whenever the problem has a matching or resolution structure where the most recent unresolved item must be resolved first. The signal is nested or LIFO semantics: "undo the last action", "match the most recent opener", "find the nearest boundary to the left/right". If the resolution event (a closing bracket, a warmer day, a smaller bar) applies to the most recently seen open event, a stack is the right tool.
