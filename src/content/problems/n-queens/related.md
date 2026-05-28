## Same pattern, different problem
- **Permutations (LC #46):** Simpler backtracking — no diagonal constraint, just a `used[]` array for columns. Think of N-Queens as Permutations with extra diagonal constraints.
- **Sudoku Solver (LC #37):** Constraint-satisfaction backtracking in 2D — each row, column, and 3×3 box must contain distinct digits, similar multi-constraint structure.
- **Word Search (LC #79):** Grid backtracking with adjacency constraints — structurally identical choose-recurse-unchoose, different validity predicate.
- **Combination Sum (LC #39):** Backtracking with a budget constraint — simpler than N-Queens since constraints are local (current sum) not global (entire board).

## When this pattern applies
N-Queens is the archetype of constraint-satisfaction backtracking: placing items one-at-a-time where each placement must respect *global constraints* that depend on all prior placements. The key efficiency insight is tracking constraint sets incrementally (column, main-diagonal, anti-diagonal sets) rather than re-checking the entire board for each candidate — O(1) conflict check instead of O(n). Use this pattern whenever: you place elements into a structure one at a time, validity depends on all prior placements, and you need all valid complete configurations.
