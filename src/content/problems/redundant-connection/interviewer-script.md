## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Nodes are labeled 1 to n (1-indexed), not 0-indexed — I'll need to handle that in the Union-Find initialization?
- The problem guarantees exactly one redundant edge — the graph has exactly one cycle?
- If there are multiple edges that could be removed to break the cycle, I return the one that appears last in the input array?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to try removing each edge one at a time and check if the remaining graph is a valid tree using DFS. That's O(n^2) — n edges times O(n) tree check each. We can find the redundant edge in one pass with Union-Find."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that if I process edges in order using Union-Find, the first edge whose two endpoints are already connected is the one creating the cycle — and since we want the last such edge if there are ties, processing in forward order and returning the first cycle hit gives us exactly what we want (since there's only one cycle, there's only one such edge).

My approach:
Step 1: Initialize Union-Find for nodes 1 to n.
Step 2: For each edge (u, v) in order: find roots of u and v. If same root → return [u, v]. Else union.

Let me trace: edges = [[1,2],[1,3],[2,3]].
- Start: parent=[_,1,2,3] (1-indexed).
- (1,2): find(1)=1, find(2)=2. Different → union. parent[2]=1.
- (1,3): find(1)=1, find(3)=3. Different → union. parent[3]=1.
- (2,3): find(2)=1, find(3)=1. Same root! → return [2,3]. Correct.

Another example: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]].
- (1,2): union. (2,3): union. (3,4): union. (1,4): find(1)=1, find(4)=1. Same root → return [1,4]. Correct."

### 4. State complexity before coding
"This will be O(n * α(n)) ≈ O(n) time and O(n) space. Sound good? I'll start coding."

### 5. After coding
"Let me check the 1-indexing: I initialize parent of size n+1, indices 0..n, and only use 1..n. That's fine — index 0 is unused. Let me also verify: edges = [[1,2]]: only one edge, can't form a cycle with one edge. But the problem guarantees a valid input with exactly one redundant edge, so edges.length == n and n >= 3. My loop will always find the answer."
