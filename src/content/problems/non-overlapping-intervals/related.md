## Same pattern, different problem
- **Merge Intervals (LC #56):** Merge overlapping intervals rather than removing — sort by start time (not end), then merge adjacently overlapping intervals.
- **Insert Interval (LC #57):** Insert one new interval into a sorted non-overlapping list.
- **Minimum Number of Arrows to Burst Balloons (LC #452):** Count minimum arrows to pop balloons — almost identical: sort by end, count "new arrows needed" when a balloon's start exceeds the current arrow position. Same Activity Selection structure.
- **Meeting Rooms (LC #252):** Determine if one person can attend all meetings — sort by start, check for any overlap.

## When this pattern applies
Activity Selection / non-overlapping interval greedy: sort by end time, greedily select the earliest-ending interval that doesn't conflict with the last selected. This maximizes the count of kept intervals (minimizing removals). The signal: "minimum intervals to remove (or maximum to keep) to eliminate overlaps." Sorting by end time is the defining characteristic — it's always wrong to sort by start time for this specific problem. Contrast with Merge Intervals (sort by start) and Meeting Rooms II (sort by start + heap for end times).
