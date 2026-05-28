## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Are intervals guaranteed to be [start, end] with start ≤ end?
- Can two intervals share exactly one endpoint, like [1,3] and [3,5]? Are those considered overlapping? I'll assume yes — [1,3] and [3,5] merge to [1,5].
- Can the input be empty? I'll return an empty array."

### 2. State the brute force (90 seconds)
"Pairwise comparison — O(n²) per pass, repeated until no merges. Very slow. Sorting by start time brings overlapping intervals together, making the merge a single O(n) linear pass after the sort."

### 3. Walk through the optimal approach (3 minutes)
"Sort by start time. Then scan left-to-right, maintaining the last merged interval.

If the current interval's start ≤ last merged interval's end: they overlap. Extend the end to max(last.end, current.end).
Otherwise: finalize the last merged interval and start a new one.

Trace: intervals = [[1,3],[2,6],[8,10],[15,18]].
After sort: [[1,3],[2,6],[8,10],[15,18]].
- Start with [1,3].
- [2,6]: 2 ≤ 3 → overlap. last = [1, max(3,6)] = [1,6].
- [8,10]: 8 > 6 → no overlap. Save [1,6], start [8,10].
- [15,18]: 15 > 10 → no overlap. Save [8,10], start [15,18].
Result: [[1,6],[8,10],[15,18]]."

### 4. State complexity before coding
"O(n log n) for sorting, O(n) for the merge pass. Overall O(n log n). Coding now."

### 5. After coding
"Edge case: single interval — sort is trivial, merge loop adds it directly. Edge case: all intervals disjoint — none merge, output equals sorted input."
