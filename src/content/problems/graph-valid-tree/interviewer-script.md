## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The edges are undirected — each edge connects two nodes in both directions?
- Can there be duplicate edges or self-loops? Or should I treat those as immediate cycle indicators?
- What's a valid tree for n=1? I'd say n=1 with no edges is a valid tree — one node is trivially a tree."

### 2. State the brute force (90 seconds)
"The simplest approach would be to check two things: first that there are exactly n-1 edges (necessary condition), then run DFS from node 0 to verify all nodes are reachable. That's O(V + E) and completely correct. I'll use Union-Find instead, which integrates both checks elegantly — the edge count check handles the n-1 condition, and Union-Find catches any cycle."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that a valid tree has exactly n-1 edges and no cycles. Checking edge count is O(1). For cycles, Union-Find processes each edge and tells me immediately if adding it creates a cycle.

My approach:
Step 1: If edges.length != n-1, return false.
Step 2: Initialize Union-Find with n nodes.
Step 3: For each edge (u,v): find roots. If same root → cycle → return false. Else union.
Step 4: If we processed all edges without a cycle, return true.

Let me trace: n=5, edges=[[0,1],[0,2],[0,3],[1,4]].
- edges.length=4 = n-1=4. OK.
- (0,1): roots 0,1 different → union. parent[1]=0.
- (0,2): roots 0,2 different → union. parent[2]=0.
- (0,3): roots 0,3 different → union. parent[3]=0.
- (1,4): find(1)=0, find(4)=4 → different → union. parent[4]=0.
- No cycle. Return true.

Now n=4, edges=[[0,1],[1,2],[2,3],[1,3]]: edges.length=4 ≠ n-1=3 → return false immediately."

### 4. State complexity before coding
"This will be O(n * α(n)) ≈ O(n) time and O(n) space. Sound good? I'll start coding."

### 5. After coding
"Let me check n=1, edges=[]: edges.length=0 = n-1=0. Union-Find initialized, no edges to process. Return true. Correct — a single node is a valid tree. And n=2, edges=[[0,1],[0,1]]: edges.length=2 ≠ n-1=1 → return false immediately. Correct."
