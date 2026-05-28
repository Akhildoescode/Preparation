## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Two meetings in the same room overlap if one starts before the other ends? (Is [1,5] and [5,10] overlapping — do we treat end as exclusive or inclusive?)
- Return the minimum number of rooms, not the actual assignment?
- Intervals can be unsorted?
- Can intervals be empty (start==end)?"

### 2. State the brute force (90 seconds)
"Sort by start time. For each meeting, scan all earlier meetings to see if any are still running. O(n²). Better: use a min-heap of active room end times for O(n log n)."

### 3. Walk through the optimal approach (3 minutes)
"Sort by start time. Min-heap of end times of currently in-use rooms. For each meeting [s, e]:
- If heap is non-empty and heap.peek() ≤ s: a room is free (its meeting ended). Reuse it — poll from heap.
- Add e to heap (this meeting's end time occupies a room, either the reused or a new one).
Heap size = answer (rooms currently occupied = peak rooms needed).

Trace [[0,30],[5,10],[15,20]] sorted already:
- [0,30]: heap empty → new room. heap={30}. size=1.
- [5,10]: heap.peek()=30 > 5 → no room free. New room. heap={10,30}. size=2.
- [15,20]: heap.peek()=10 ≤ 15 → room free! Poll 10. Add 20. heap={20,30}. size=2.
Answer: 2. ✓"

### 4. State complexity before coding
"O(n log n) sorting + O(n log n) heap operations = O(n log n) total. O(n) space. I'll code it."

### 5. After coding
"Single meeting: heap ends with 1 element. Return 1. All overlapping: heap never shrinks — each meeting adds a room. Return n. ✓"
