## Same pattern, different problem
- **Permutations (LC #46):** Backtracking without a `start` constraint and with a `used[]` array — every ordering is distinct so all positions can access all elements.
- **Subsets (LC #78):** Uses the same `start` index to generate distinct subsets, but records every partial state, not just when remaining==0.
- **Combination Sum II (LC #40):** Same structure but each candidate can be used only once, and input may have duplicates — requires `start=i+1` and skipping `candidates[i] == candidates[i-1]` at the same recursion level.
- **Palindrome Partitioning (LC #131):** Backtracking that partitions a string — different domain, same choose-recurse-unchoose template.

## When this pattern applies
Use backtracking with a `start` index when generating all *combinations* (order-independent selections) from a candidate set. The `start` parameter is the key: it prevents "going backward" to earlier candidates, ensuring each unique multiset is generated exactly once. When reuse is allowed, pass `i` to the next call; when reuse is forbidden, pass `i+1`. Sorting candidates first enables `break`-based pruning when candidates exceed the remaining budget.
