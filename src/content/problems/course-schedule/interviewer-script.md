## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The pair [a, b] means b is a prerequisite of a — so the directed edge goes b → a meaning 'take b before a'?
- Can there be duplicate prerequisite pairs in the input, or self-loops like [a, a]?
- numCourses with zero prerequisites — should I return true? Yes, nothing to block."

### 2. State the brute force (90 seconds)
"The simplest approach would be to use topological sort: repeatedly find a node with in-degree zero, remove it and its outgoing edges, and check if all nodes are removed. If we get stuck with remaining nodes but no zero-in-degree node, there's a cycle. This is Kahn's algorithm and runs in O(V + E). Alternatively, I'll use DFS cycle detection which is slightly more concise to code."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that finishing all courses is possible if and only if the directed graph has no cycle. I'll use DFS with three states: 0=unvisited, 1=in current path, 2=fully explored.

My approach:
Step 1: Build adjacency list from prerequisites.
Step 2: For each unvisited node, run DFS.
Step 3: In DFS, mark node as state 1. For each neighbor: if state 1, cycle detected. If state 0, recurse. After processing all neighbors, mark as state 2.

Let me trace through: numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]].
- Adjacency list: 0→[1,2], 1→[3], 2→[3], 3→[].
- DFS(0): state[0]=1. Recurse DFS(1): state[1]=1. Recurse DFS(3): state[3]=1. No neighbors. state[3]=2. Back to DFS(1): state[1]=2. Back to DFS(0): recurse DFS(2): state[2]=1. Neighbor 3 is state 2 → skip. state[2]=2. state[0]=2.
- No cycle found. Return true."

### 4. State complexity before coding
"This will be O(V + E) time and O(V + E) space for the adjacency list and state array. Sound good? I'll start coding."

### 5. After coding
"Let me verify the cycle case: numCourses=2, prerequisites=[[0,1],[1,0]].
- Adjacency list: 0→[1]... wait, let me re-read. [a,b] means take b before a, so edge b→a. [0,1] means edge 1→0. [1,0] means edge 0→1.
- Adjacency list: 1→[0], 0→[1].
- DFS(0): state[0]=1. Neighbor 1: state[1]=0, recurse DFS(1): state[1]=1. Neighbor 0: state[0]=1 → cycle! Return true from hasCycle. Correct, return false."
