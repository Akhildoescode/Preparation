## Understanding the problem
Given an array of meeting time intervals `[start, end]`, find the minimum number of conference rooms required so no two meetings in the same room overlap. A meeting occupies a room from `start` (inclusive) to `end` (exclusive, or inclusive depending on convention — clarify).

## Brute force
For each meeting, check against all others to see if it overlaps with any currently running meeting. O(n²). Maintain a count of rooms — hard to keep track correctly.

## Key insight
Sort meetings by start time. Use a **min-heap of end times** (currently occupied rooms). For each new meeting: if the earliest-ending room finishes before or when this meeting starts, reuse that room (pop from heap, push new end time). Otherwise, add a new room. The heap size at any point = rooms needed so far.

## Optimal approach — Greedy with Min-Heap
1. Sort intervals by start time.
2. `heap = PriorityQueue<Integer>` (min end times).
3. For each interval `[start, end]`:
   - If `!heap.isEmpty() && heap.peek() <= start`: `heap.poll()` (reuse that room).
   - `heap.offer(end)` (this meeting ends at `end`).
4. Return `heap.size()` (number of rooms currently occupied = peak rooms needed).

Trace `[[0,30],[5,10],[15,20]]`:
- Sort by start: [0,30],[5,10],[15,20].
- [0,30]: heap empty → new room. heap={30}.
- [5,10]: heap.peek()=30 > 5 → new room. heap={10,30}.
- [15,20]: heap.peek()=10 ≤ 15 → reuse! poll 10. offer 20. heap={20,30}.
Answer: heap.size() = 2. ✓

## Why this works
By sorting by start time and always checking the earliest-ending room, we greedily assign rooms optimally. If the earliest-ending room finishes before the next meeting starts, reusing it is always safe (no overlap). If not, no room is free and we need a new one. The heap size equals the maximum number of concurrent meetings at any point.

## Complexity
- Time: O(n log n) — sorting + O(log n) per heap operation.
- Space: O(n) for the heap (worst case all meetings overlap).
