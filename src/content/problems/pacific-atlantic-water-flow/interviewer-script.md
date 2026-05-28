## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Water flows to adjacent cells with less than or equal height — so equal heights are allowed?
- The output is a list of [row, col] pairs in any order?
- Corner cells touch both oceans — does that mean corner cells are always in the answer? I think yes: top-left touches Pacific and also if it can reach Atlantic."

### 2. State the brute force (90 seconds)
"The simplest approach would be to run a DFS from every cell, simulating water flowing downhill, and check if each cell can reach both oceans. That gives O((m*n)^2) time — a full DFS per cell. For a 200x200 grid that's way too slow. We can do better by reversing the direction."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that instead of simulating flow downward from each cell, I can reverse direction and flow uphill from each ocean's border. A cell can reach the Pacific if I can travel uphill from the Pacific border to that cell. I run two separate DFS passes — one from the Pacific border, one from the Atlantic border — and take the intersection.

My approach:
Step 1: Create two visited arrays, pacificReach and atlanticReach.
Step 2: DFS from all Pacific border cells (top row, left column). In the DFS, only move to neighbors with height >= current height.
Step 3: DFS from all Atlantic border cells (bottom row, right column). Same rule.
Step 4: Collect cells marked true in both arrays.

Let me trace through a small 3x3:
```
1 2 2
3 2 3
2 4 2
```
Pacific DFS from top row and left column: (0,0),(0,1),(0,2),(1,0),(2,0) as starting points. From (1,0) height=3: can go to (1,1) height=2? No, 2 < 3. Can go to (2,0)? Already border. From (0,1) height=2: can go to (1,1) height=2? Yes, equal. Mark (1,1). From (1,1) can go to (2,1) height=4? Yes. Mark (2,1)... and so on.
The intersection gives the answer cells."

### 4. State complexity before coding
"This will be O(m * n) time — each cell visited at most twice — and O(m * n) space for the two arrays and recursion stack. Sound good? I'll start coding."

### 5. After coding
"Let me check: a 1x1 grid with height [[5]]. It touches both oceans. Both DFS passes mark (0,0). Result = [[0,0]]. Correct. Also: all same heights — every cell can reach both oceans since equal height allows flow, so the answer is all cells. Looks good."
