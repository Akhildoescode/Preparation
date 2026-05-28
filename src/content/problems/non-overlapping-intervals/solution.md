## Reference solution

**Complexity:** O(n log n) time, O(log n) space (sort stack).

```java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Sort by end time: earlier-ending intervals leave more room for future ones
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);

        int count   = 0;                      // number of intervals removed
        int prevEnd = Integer.MIN_VALUE;       // end of the last kept interval

        for (int[] interval : intervals) {
            if (interval[0] < prevEnd) {
                // This interval overlaps with the last kept interval
                // Remove it (it ends no earlier than prevEnd by sort order)
                count++;
            } else {
                // No overlap — keep this interval, update the boundary
                prevEnd = interval[1];
            }
        }

        return count;
    }
}
```

## Line-by-line notes
- **Sort by end time `a[1] - b[1]`:** Earlier-ending intervals are processed first. This is the key greedy choice — the Activity Selection Problem is solved by always picking the earliest-ending compatible interval.
- **`interval[0] < prevEnd` (strict less than):** Two intervals sharing exactly one endpoint are *not* overlapping. Using `<=` would incorrectly remove intervals that merely touch.
- **`count++` on overlap:** We "remove" the current interval. The current interval has the minimum possible end time among all intervals starting before `prevEnd`; removing it (vs. removing the previous one) is the optimal greedy choice.
- **`prevEnd = interval[1]`:** Only update when keeping — the new "wall" is this interval's end.

## Common bugs to avoid
- **Sorting by start time instead of end time:** Sorting by start gives the wrong greedy order. Sort by end time for the Activity Selection Problem.
- **`interval[0] <= prevEnd`:** Incorrectly treats touching endpoints as overlapping, causing extra removals.
- **Counting kept intervals and subtracting from n:** `n - kept` and counting removals directly are equivalent; either is fine, but be consistent.
