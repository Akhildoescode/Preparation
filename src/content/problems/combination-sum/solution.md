## Reference solution

**Complexity:** O(n^(T/M)) time; O(T/M) space for recursion depth.

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);  // enables early termination via break
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remaining, int start,
                           List<Integer> current, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            // Sorted array: once a candidate exceeds remaining, all later ones will too
            if (candidates[i] > remaining) break;

            current.add(candidates[i]);
            // Pass i (not i+1) — the same candidate can be reused in this combination
            backtrack(candidates, remaining - candidates[i], i, current, result);
            current.remove(current.size() - 1);
        }
    }
}
```

## Line-by-line notes
- **`Arrays.sort(candidates)`:** Sorting enables the `break` statement — once `candidates[i] > remaining`, all subsequent candidates are also too large.
- **`start` parameter in the loop:** Prevents picking candidates that come before the current index, ensuring each unique combination is generated once in non-decreasing order.
- **Recurse with `i` not `i+1`:** Allows the same candidate to appear multiple times. Changing to `i+1` would give Combination Sum II behavior (each element used at most once).
- **`current.remove(current.size() - 1)`:** Remove by index (the last element just appended), not by value — safer and correct.

## Common bugs to avoid
- **Recursing with `i+1` instead of `i`:** Prevents reuse of the current candidate, giving wrong results for targets requiring a value more than once.
- **Not sorting before using `break`:** Without sorting, a value larger than `remaining` in the middle doesn't mean all later values are too large.
- **Forgetting to copy `current` when recording:** `result.add(current)` adds a reference to the mutable list; it will appear empty after backtracking completes.
