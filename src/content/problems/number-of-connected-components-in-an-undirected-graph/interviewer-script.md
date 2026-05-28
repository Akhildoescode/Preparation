## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The graph is undirected — each edge connects two nodes in both directions?
- Can there be duplicate edges or self-loops in the input?
- n can be up to around 2000 and edges up to n*(n-1)/2 — so the graph could be dense?"

### 2. State the brute force (90 seconds)
"The simplest approach would be DFS or BFS: iterate over all nodes, and for each unvisited node launch a DFS to mark all reachable nodes, incrementing a counter each time. That's O(V + E) time. It's a perfectly valid solution. I'll also mention Union-Find, which is equally O(V + E) but uses a different data structure that's worth knowing and often preferred when you're processing edges one at a time."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that Union-Find is designed exactly for component tracking. I start with n separate components and merge them as I process edges.

My approach:
Step 1: Initialize parent[i] = i and rank[i] = 0 for all i. Set components = n.
Step 2: For each edge (u, v), find the roots of u and v with path compression. If roots differ, union them (attach smaller rank under larger) and decrement components.
Step 3: Return components.

Let me trace: n=5, edges=[[0,1],[1,2],[3,4]].
- Start: parent=[0,1,2,3,4], components=5.
- Edge (0,1): find(0)=0, find(1)=1. Different → union, components=4. parent=[0,0,2,3,4].
- Edge (1,2): find(1)=0, find(2)=2. Different → union, components=3. parent=[0,0,0,3,4].
- Edge (3,4): find(3)=3, find(4)=4. Different → union, components=2. parent=[0,0,0,3,3].
- Return 2. Correct — components are {0,1,2} and {3,4}."

### 4. State complexity before coding
"This will be O(n * α(n)) ≈ O(n) time with path compression and union by rank, and O(n) space. Sound good? I'll start coding."

### 5. After coding
"Let me verify: n=3, edges=[] — no edges, components stays at 3. Correct: three isolated nodes. n=3, edges=[[0,1],[1,2],[0,2]] — edge (0,1) unites, (1,2) unites, (0,2) finds same root → no union. Final components=1. Correct."
