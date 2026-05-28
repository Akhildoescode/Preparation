## Pattern: Greedy + Min-Heap (Interval Scheduling)

Meeting Rooms II typifies the "interval scheduling" pattern: sort by start time, use a min-heap to track ongoing tasks. The heap size at the end gives the maximum simultaneous demands. This pattern applies whenever you need to allocate resources (rooms, threads, workers) to tasks with overlapping time windows.

## Related problems

- **Meeting Rooms I (LC 252):** Determine if one person can attend all meetings (no overlaps). Sort by start; check if any `intervals[i][0] < intervals[i-1][1]`. No heap needed — just O(n log n) sort + O(n) scan.
- **Task Scheduler (LC 621):** Minimum CPU intervals to execute tasks with cooldown n. Uses frequency counts + greedy — the min-heap pattern appears in a simulation variant.
- **Minimum Interval to Include Each Query (LC 2406):** Sort intervals and queries, use a min-heap to track active intervals — advanced application of the same pattern.
- **Car Pooling (LC 1094):** Passengers board and deboard at stops; check if capacity exceeded. Model as start/end events, sort, sweep.
- **Employee Free Time (LC 759):** Given schedules for multiple employees, find common free intervals. Merge sorted intervals, find gaps.
- **Merge Intervals (LC 56):** Sort by start time; greedily merge overlapping intervals. Similar sort step, different action.
- **Insert Interval (LC 57):** Insert a new interval into a sorted list, merging as needed. O(n) scan after finding the insertion point.

## Interval problem checklist

1. **Sort** by start time (or end time, depending on the goal).
2. **Sweep** chronologically — use a heap or two pointers to track ongoing state.
3. **Track the metric** (max simultaneous, count merged, etc.) at each event.
4. **Handle touching intervals** carefully — `start == end` of prior: overlap or not?
