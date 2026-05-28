## Same pattern, different problem
- **Subsets (LC #78):** Backtracking that records every prefix (not just complete sequences) — uses a `start` index instead of a `used` array.
- **Combination Sum (LC #39):** Backtracking where the order does not matter (combinations, not permutations); uses `start` to avoid duplicates, and elements can be reused.
- **N-Queens (LC #51):** Backtracking with additional constraints (column/diagonal conflicts); the choose-recurse-unchoose structure is identical to permutations.
- **Word Search (LC #79):** Backtracking on a 2D grid — the mark-visited/unmark-on-backtrack pattern mirrors the `used[]` array here.

## When this pattern applies
Backtracking with a `used[]` array applies when you need all *ordered arrangements* (permutations) of a set of distinct elements. The signal: every ordering counts as distinct, each element appears exactly once, and you need all valid outcomes. Compare to combination problems where a `start` index is used instead of `used[]` — that's when order doesn't matter and elements can't be reused. The template is always: try each valid choice → mark chosen → recurse → unmark (backtrack).
