## Pattern: Backtracking — Choose/Explore/Unchoose

Subsets is the foundational backtracking problem. The `start` index advancing forward (not resetting to 0) is what prevents duplicate subsets. Master this pattern before tackling permutations or combinations.

## Related problems

- **Subsets II (LC 90):** Same as Subsets but `nums` may contain duplicates. Fix: sort first, skip `nums[i] == nums[i-1]` when `i > start`.
- **Combination Sum (LC 39):** Choose elements that sum to target; elements can be reused. Change: pass `i` (not `i+1`) in recursive call, add pruning when current sum exceeds target.
- **Combination Sum II (LC 40):** Each number used once, no duplicate combinations. Sort + skip duplicate logic like Subsets II.
- **Permutations (LC 46):** All orderings — start resets to 0 but track `used[]` array to avoid reuse. No `start` parameter needed.
- **Permutations II (LC 47):** Permutations with duplicates. Sort + skip when `nums[i] == nums[i-1] && !used[i-1]`.
- **Letter Combinations of a Phone Number (LC 17):** Backtracking over a fixed branching factor (up to 4 letters per digit). No `start` — each recursion level corresponds to one digit.
- **Palindrome Partitioning (LC 131):** At each index, try all valid palindrome prefixes; recurse on the remainder.

## Backtracking template

```java
void backtrack(/* params */, int start, List<T> current, List<List<T>> result) {
    if (/* base condition */) {
        result.add(new ArrayList<>(current)); // always copy
        return;
    }
    for (int i = start; i < choices.length; i++) {
        // optional: pruning / duplicate skip
        current.add(choices[i]);          // choose
        backtrack(/* ... */, i + 1, current, result); // explore
        current.remove(current.size() - 1); // unchoose
    }
}
```

For subsets, the base condition is implicit (add before the loop) — every node, not just leaves, is a valid result.
