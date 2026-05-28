## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Rot spreads only to the four cardinal neighbors, not diagonally — correct?
- If there are no fresh oranges at all initially, should I return 0?
- If there are fresh oranges but no rotten ones, I should return -1 since they can never rot?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to simulate minute by minute: scan the whole grid each minute, collect newly rotten oranges, update the grid, repeat. That gives us O((m*n)^2) in the worst case — we might scan the whole grid once per minute and there could be m*n minutes. We can do better with multi-source BFS."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that all rotten oranges spread simultaneously — this is a multi-source BFS where all sources start in the queue together. Each BFS level equals exactly one minute.

My approach is:
Step 1: Scan the grid, enqueue all rotten oranges and count fresh ones.
Step 2: BFS level by level. For each cell dequeued, try all four neighbors. If a neighbor is fresh, mark it rotten, decrement fresh count, enqueue it.
Step 3: After BFS, if fresh count is still > 0, return -1. Otherwise return minutes elapsed.

Let me trace through:
```
2 1 1
1 1 0
0 1 1
```
- Start: queue = [(0,0)], fresh = 6, minutes = 0.
- Level 1: process (0,0) → rot (0,1) and (1,0). Queue = [(0,1),(1,0)], fresh = 4, minutes = 1.
- Level 2: process (0,1) → rot (0,2). Process (1,0) → rot (1,1). Queue = [(0,2),(1,1)], fresh = 2, minutes = 2.
- Level 3: process (0,2) → no new neighbors. Process (1,1) → rot (2,1). Queue = [(2,1)], fresh = 1, minutes = 3.
- Level 4: process (2,1) → rot (2,2). Queue = [], fresh = 0, minutes = 4.
- fresh == 0, return 4."

### 4. State complexity before coding
"This will be O(m * n) time since each cell is processed at most once, and O(m * n) space for the queue. Sound good? I'll start coding."

### 5. After coding
"Let me verify two edge cases. Grid = [[0]]: no fresh, no rotten — freshCount=0 at start, BFS does nothing, return 0. Grid = [[1]]: freshCount=1, queue is empty, BFS never runs, freshCount > 0, return -1. Both correct."
