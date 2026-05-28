## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        // Zone 1: intervals that end before newInterval starts — no overlap
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i++]);
        }

        // Zone 2: merge all overlapping intervals into newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);  // add the (possibly expanded) merged interval

        // Zone 3: intervals that start after the merged newInterval ends — no overlap
        while (i < n) {
            result.add(intervals[i++]);
        }

        return result.toArray(new int[0][]);
    }
}
```

## Line-by-line notes
- **Zone 1 condition `intervals[i][1] < newInterval[0]`:** The current interval ends strictly before the new interval starts — no overlap possible. Strict `<` because `intervals[i][1] == newInterval[0]` means they share an endpoint and should be merged.
- **Zone 2 condition `intervals[i][0] <= newInterval[1]`:** The current interval starts at or before the new interval ends — they overlap. `<=` correctly handles touching endpoints.
- **`newInterval[0] = Math.min(...)`:** Expand the new interval's start to the left if an overlapping interval starts earlier.
- **`newInterval[1] = Math.max(...)`:** Expand the new interval's end to the right.

## Common bugs to avoid
- **Zone 1: `<` vs `<=`:** `intervals[i][1] <= newInterval[0]` would incorrectly skip intervals that touch the new interval's start — they should be merged.
- **Zone 2: `<` vs `<=`:** `intervals[i][0] < newInterval[1]` would miss intervals that start exactly at newInterval's end — they should be merged.
- **Forgetting to add `newInterval` after zone 2:** If zone 2 finds no overlaps at all, the new interval itself must still be added to the result.
