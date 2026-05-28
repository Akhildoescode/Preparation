## Cases to mention to the interviewer

- **Empty input:** `intervals = []` → return 0. Handled by the early check `if (intervals.length == 0) return 0`.
- **Single meeting:** `[[5, 10]]` → return 1. Heap gets one element, size = 1.
- **No overlaps:** `[[1,2],[3,4],[5,6]]` → return 1. Each meeting starts after the previous ends; the same room is reused each time. Heap never grows beyond size 1.
- **All overlap:** `[[1,10],[2,11],[3,12]]` → return 3. Each meeting starts before any previous one ends; a new room is needed each time. Heap grows to 3.
- **Meetings touching exactly:** `[[1,5],[5,10]]` — does the meeting ending at 5 overlap with the one starting at 5? LeetCode uses `start < end` for overlap definition. If end ≤ next start, no overlap. Here `5 ≤ 5`, so we reuse the room. Answer: 1.
- **All same time:** `[[1,5],[1,5],[1,5]]` → return 3. All three start at the same time, all overlap. The heap will grow to 3 before any room is freed.
- **Sorting by start is crucial:** Without sorting, we might assign rooms out of order and over- or under-count. The sort ensures we process chronologically.
- **Using `a[0] - b[0]` for comparator:** Works for start times within int range. For very large values, use `Integer.compare(a[0], b[0])` to avoid integer overflow in the subtraction.
- **Why min-heap (not max-heap)?** We want to quickly check the earliest-ending meeting. Max-heap would give the latest ending time — unhelpful for freeing rooms.
