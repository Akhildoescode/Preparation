## Same pattern, different problem
- **Combination Sum (LC #39):** Backtracking from numbers instead of letters; uses a `start` index to avoid duplicate combinations. Different domain, same template.
- **Permutations (LC #46):** Decision tree where the choices at each level depend on what has been used — `used[]` array instead of a fixed per-slot set of options.
- **Subsets (LC #78):** Records every node in the decision tree (not just leaves).
- **N-Queens (LC #51):** More constrained backtracking — choices have validity conditions that depend on prior choices.

## When this pattern applies
Use this template whenever you must enumerate all combinations formed by making one independent choice per slot, where each slot has a fixed set of options determined by input (phone digit, grid position, etc.) rather than by prior choices. The decision tree has exactly ∏(options per slot) leaves. The key distinction from permutations: here, each slot's choice is *independent* — choosing 'a' for digit '2' does not restrict what letters are available for digit '3'. Compare to permutations where picking element i reduces the pool for all subsequent slots.
