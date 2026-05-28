## What to say, in order

### 1. Clarifying questions (60 seconds)
"Confirming:
- The input intervals are already sorted by start time and non-overlapping?
- Should I return a new array, or can I modify in place?
- Can the new interval be empty (start == end)? Any interval, even a single point, can be inserted."

### 2. State the brute force (90 seconds)
"Add the new interval to the list and run the full Merge Intervals algorithm — O(n log n) due to sorting. Since the input is already sorted, we can do this in O(n) by splitting into three zones: before, overlapping, and after the new interval."

### 3. Walk through the optimal approach (3 minutes)
"Three zones:
1. All input intervals that end before newInterval starts — copy as-is.
2. All intervals overlapping with newInterval — expand newInterval to cover them.
3. All remaining intervals after the merged newInterval — copy as-is.

Example: intervals=[[1,3],[6,9]], newInterval=[2,5].
- Zone 1: [1,3] ends at 3, newInterval starts at 2. 3 < 2? No! So zone 1 is empty (the condition intervals[i][1] < newInterval[0]=2 fails for [1,3]).
- Zone 2: intervals[0][0]=1 ≤ newInterval[1]=5? Yes → merge: newInterval=[min(2,1), max(5,3)]=[1,5]. i=1. intervals[1][0]=6 ≤ 5? No. Exit zone 2.
- Add [1,5].
- Zone 3: Add [6,9].
Result: [[1,5],[6,9]]. Correct!"

### 4. State complexity before coding
"O(n) time, O(n) space for output. Coding now."

### 5. After coding
"The boundary conditions are: zone 1 ends when `intervals[i][1] < newInterval[0]` fails. Zone 2 ends when `intervals[i][0] > newInterval[1]`. These cleanly partition the input."
