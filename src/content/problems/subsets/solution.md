## Reference solution

**Complexity:** O(n × 2ⁿ) time, O(n × 2ⁿ) space (output dominates).

```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current)); // snapshot BEFORE choosing — adds empty set on first call

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);          // choose
            backtrack(nums, i + 1, current, result); // explore (i+1 ensures no duplicates)
            current.remove(current.size() - 1); // unchoose
        }
    }
}
```

## Line-by-line notes
- **`result.add(new ArrayList<>(current))`:** Added at the top of each recursive call — before choosing any element. This captures the empty set on the first call, single-element sets after the first level, and so on. Every node in the decision tree is a valid subset.
- **`for (int i = start; i < nums.length; i++)`:** Starting from `start` (not 0) ensures we only look forward — prevents duplicates like both `[1,2]` and `[2,1]`.
- **`new ArrayList<>(current)`:** Must copy — `current` is mutated during backtracking. Adding the reference directly would give all empty lists at the end.
- **`i + 1` in recursive call:** Advance start past the current element so we never pick the same index again.
- **`current.remove(current.size() - 1)`:** Remove the last element (the one just added). This is the "unchoose" step that restores state.

## Iterative bit-mask alternative
```java
public List<List<Integer>> subsets(int[] nums) {
    int n = nums.length;
    List<List<Integer>> result = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> subset = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if ((mask >> i & 1) == 1) subset.add(nums[i]);
        }
        result.add(subset);
    }
    return result;
}
```
Each of the 2ⁿ bitmasks represents a subset: bit i set means nums[i] is included. Elegant but less flexible for follow-ups (e.g., Subsets II with duplicates).
