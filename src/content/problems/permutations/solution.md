## Reference solution

**Complexity:** O(n · n!) time, O(n) auxiliary space (excluding output).

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] used,
                           List<Integer> current, List<List<Integer>> result) {
        // Base case: all elements placed — record this permutation
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;          // skip elements already in current

            // Choose: place nums[i] at the next position
            used[i] = true;
            current.add(nums[i]);

            backtrack(nums, used, current, result);

            // Unchoose: restore state for the next sibling branch
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}
```

## Line-by-line notes
- **`new ArrayList<>(current)`:** Must copy the list before adding to result — if we add `current` directly, all result entries would reference the same mutable list that ends up empty after backtracking.
- **`used[i] = true` before recursion, `used[i] = false` after:** This is the backtracking template — choose → recurse → unchoose. The state must be exactly restored after each recursive call.
- **`current.remove(current.size() - 1)`:** Removes the last element by *index*, which is more correct than removing by value when dealing with duplicate integers (LC #47).

## Common bugs to avoid
- **Adding `current` directly to result:** Results in all entries pointing to the same list, which ends up empty after all backtracking completes. Always copy with `new ArrayList<>(current)`.
- **Forgetting to restore `used[i] = false`:** Elements appear permanently in-use across sibling branches, producing far fewer permutations than expected.
- **Using `current.remove(Integer.valueOf(nums[i]))` instead of `current.remove(current.size() - 1)`:** The value-based remove finds the *first* occurrence of that value, which breaks if the input has duplicates (LC #47 variant).
