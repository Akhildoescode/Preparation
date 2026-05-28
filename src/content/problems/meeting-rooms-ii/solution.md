## Reference solution

**Complexity:** O(n log n) time, O(n) space.

```java
class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by start time
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        // Min-heap of end times — top = earliest ending meeting
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int[] interval : intervals) {
            // If the earliest-ending meeting finishes before this one starts, reuse that room
            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
                minHeap.poll(); // free the room
            }
            minHeap.offer(interval[1]); // assign room, track end time
        }

        return minHeap.size(); // rooms still occupied = total rooms needed
    }
}
```

## Line-by-line notes
- **Sort by start time:** Processes meetings chronologically. We assign a room to each meeting as we encounter it in time order.
- **Min-heap of end times:** Each element in the heap = the end time of a meeting occupying a room. The heap top always gives us the room that becomes free earliest.
- **`minHeap.peek() <= interval[0]`:** If the earliest-ending room frees up by the time this meeting starts, we can reuse it. `≤` not `<` because a meeting ending at time 10 and another starting at time 10 don't overlap (one ends, then the other starts).
- **`minHeap.poll()` + `minHeap.offer(interval[1])`:** Remove the freed end time, add the new end time — conceptually "reassign" that room to the new meeting.
- **If no room is free:** Skip the `poll()`. Just `offer(interval[1])` — this opens a new room.
- **`minHeap.size()` at the end:** Each element in the heap represents a room currently holding a meeting. The maximum rooms needed at any point equals the final heap size after processing all meetings in start-time order.

## Two-pointer alternative
Sort start and end times separately. Use two pointers:
```java
Arrays.sort(starts); Arrays.sort(ends);
int rooms = 0, endPtr = 0;
for (int start : starts) {
    if (start < ends[endPtr]) rooms++;
    else endPtr++;
}
return rooms;
```
Counts concurrent meetings without a heap. O(n log n) time, O(n) space.
