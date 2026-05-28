## What to say, in order

### 1. Clarifying questions (60 seconds)
"Confirming:
- Two intervals [a,b] and [b,c] that share only an endpoint — do they count as overlapping? The problem treats them as non-overlapping (sharing an endpoint is OK).
- All intervals have start < end?
- We want the minimum *number* removed, not which ones specifically?"

### 2. State the brute force (90 seconds)
"Try all 2^n subsets and find the largest non-overlapping set. O(2^n). The Activity Selection greedy solves this in O(n log n): sort by end time, always pick the earliest-ending non-overlapping interval."

### 3. Walk through the optimal approach (3 minutes)
"Insight: to maximize the intervals we *keep*, sort by end time and greedily select intervals that don't overlap with the last selected. This leaves the most room for future intervals.

Equivalently: scan sorted intervals. When two overlap, remove the one with the later end (which is the current one, since we're sorted by end). `count++`. When they don't overlap, update prevEnd.

Trace: intervals = [[1,2],[2,3],[3,4],[1,3]].
Sort by end: [[1,2],[2,3],[1,3],[3,4]].
- prevEnd = -infinity.
- [1,2]: 1 >= -infinity → keep. prevEnd=2.
- [2,3]: 2 >= 2 → keep. prevEnd=3.
- [1,3]: 1 < 3 → overlap! Remove. count=1.
- [3,4]: 3 >= 3 → keep. prevEnd=4.
Return count=1. Check: keeping [[1,2],[2,3],[3,4]] — 3 intervals, non-overlapping. Removed [1,3]. Correct."

### 4. State complexity before coding
"O(n log n) sort + O(n) scan. O(n log n) overall."

### 5. After coding
"The answer `n - kept` where `kept` = number of intervals we kept is the same as counting removals directly — I count removals inline."
