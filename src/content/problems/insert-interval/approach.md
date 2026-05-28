## Understanding the problem
Given a sorted list of non-overlapping intervals and a new interval to insert, return the merged list. The input is already sorted and non-overlapping — we only need to find where the new interval fits and handle overlaps with it specifically.

## Brute force
Add the new interval to the list, sort, then run the merge-intervals algorithm. O(n log n).

## Key insight
Since the input is already sorted and non-overlapping, we can split it into three zones with a single O(n) pass:
1. **Before:** Intervals that end before the new interval starts — add directly to output.
2. **Overlapping:** Intervals that overlap with the new interval — merge them all into the new interval.
3. **After:** Intervals that start after the new interval ends — add directly to output.

Two intervals [a,b] and [c,d] overlap if a ≤ d and c ≤ b.

## Optimal approach
```
result = []
i = 0, n = intervals.length
newInterval = given new interval

// Zone 1: add all intervals ending before newInterval starts
while i < n and intervals[i][1] < newInterval[0]:
    result.add(intervals[i++])

// Zone 2: merge all overlapping intervals into newInterval
while i < n and intervals[i][0] <= newInterval[1]:
    newInterval[0] = min(newInterval[0], intervals[i][0])
    newInterval[1] = max(newInterval[1], intervals[i][1])
    i++

result.add(newInterval)  // add the merged interval

// Zone 3: add remaining intervals
while i < n:
    result.add(intervals[i++])

return result
```

## Why this works
Zone 1 processes intervals guaranteed not to overlap (they end before newInterval starts). Zone 2 processes all intervals overlapping with newInterval, expanding newInterval to cover them all. Zone 3 processes intervals guaranteed not to overlap (they start after the merged newInterval ends). The three-zone split is exhaustive and mutually exclusive.

## Complexity
- Time: O(n) — single pass through all intervals
- Space: O(n) for the output
