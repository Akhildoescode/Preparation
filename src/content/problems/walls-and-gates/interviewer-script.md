## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- INF is defined as Integer.MAX_VALUE (2^31 - 1), and I should update it in place in the given grid?
- If no gate is reachable from a room, the room stays as INF — not -1 or any other value?
- Walls (-1) are never updated and act as blockers — BFS doesn't pass through them?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to run BFS from every gate individually and for each empty room keep the minimum distance found across all runs. That's O(k * m * n) where k is the number of gates — potentially O((m*n)^2). We can collapse all runs into a single O(m*n) multi-source BFS."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that all gates are equivalent — the nearest gate is what matters. I seed the BFS queue with all gates at once. Because BFS explores in order of distance, the first time a room is reached it's always from the nearest gate.

My approach:
Step 1: Scan the grid and add all gate positions (value 0) to the queue.
Step 2: BFS. For each cell dequeued, check four neighbors. If a neighbor is INF, set it to current distance + 1 and enqueue.
Step 3: Walls (-1) and already-set rooms (value < INF) are skipped automatically.

Let me trace through:
```
INF  -1   0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
```
Gates at (0,2) and (3,0). Start queue = [(0,2),(3,0)], distance=0.
- Level 1: from (0,2): neighbor (0,3)=INF → set to 1, enqueue. Neighbor (1,2)=INF → set to 1, enqueue. From (3,0): neighbor (2,0)=INF → set to 1, enqueue.
- Level 2: from (0,3): neighbor (1,3)=-1 skip. from (1,2): (1,1)=INF→2, (2,2)=INF→2. from (2,0): (2,1)=-1 skip.
- Continue... rooms fill with their correct minimum distances."

### 4. State complexity before coding
"This will be O(m * n) time and O(m * n) space for the queue. Sound good? I'll start coding."

### 5. After coding
"Let me verify: a grid with only walls and gates — no INF rooms. Queue is seeded with gates, BFS runs but finds no INF neighbors, grid unchanged. Correct. A grid with no gates at all — queue is empty, BFS never runs, all INF rooms stay INF. Correct."
