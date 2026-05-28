## Reference solution

**Complexity:** O(n log n) time, O(n) space.

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        // Sort by start time to bring potentially overlapping intervals adjacent
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];  // the interval being extended

        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];

            if (next[0] <= current[1]) {
                // Overlap: extend the current interval's end if necessary
                current[1] = Math.max(current[1], next[1]);
            } else {
                // No overlap: finalize the current interval and move to the next
                merged.add(current);
                current = next;
            }
        }

        // Don't forget the last interval (not finalized inside the loop)
        merged.add(current);

        return merged.toArray(new int[0][]);
    }
}
```

## Line-by-line notes
- **`Arrays.sort(..., (a, b) -> a[0] - b[0])`:** Sorts by start time ascending. Using `a[0] - b[0]` works here since intervals are integers; for general use, prefer `Integer.compare(a[0], b[0])` to avoid overflow.
- **`current = intervals[0]`:** We maintain `current` as the interval being actively extended. Starting with the first sorted interval.
- **`next[0] <= current[1]`:** Overlap condition: the next interval starts at or before the current one ends. The `<=` correctly handles touching intervals (e.g., [1,3] and [3,5] → [1,5]).
- **`merged.add(current)` after the loop:** The last `current` is never pushed inside the loop — always add it at the end.

## Common bugs to avoid
- **Forgetting to add the last `current` after the loop:** The last merged interval is never finalized inside the loop (it's only finalized when the next interval doesn't overlap — which never happens for the last interval). Must add it manually.
- **`next[0] < current[1]` (strict less than):** Misses the case where intervals share exactly one endpoint ([1,3] and [3,5]) — should be `<=`.
- **Modifying `intervals[i]` directly:** If you modify the input array in place, you might lose original data needed for subsequent comparisons. Use a separate `current` variable.
