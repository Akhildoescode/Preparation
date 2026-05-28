## Same pattern, different problem
- **Insert Interval (LC #57):** Insert a new interval into a sorted non-overlapping list — requires handling three zones: before the new interval, overlapping, and after.
- **Non-overlapping Intervals (LC #435):** Minimum intervals to remove so none overlap — greedy sort by end time.
- **Meeting Rooms (LC #252):** Can a person attend all meetings? Sort by start, check for any overlap — merge intervals prerequisite.
- **Meeting Rooms II (LC #253):** Minimum conference rooms — sort by start, use a min-heap tracking end times of active meetings.

## When this pattern applies
Sort-then-merge applies to any interval problem where you need to combine overlapping ranges. The signal: "given a set of [start, end] intervals, merge/cover/count." Sort by start time — this is always the first step. After sorting, adjacent intervals in the sorted order are the only candidates for merging (no interval can overlap with a non-adjacent interval without also overlapping with the ones between them). The merge pass is O(n): compare each new interval's start with the running current's end.
