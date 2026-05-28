## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the input node be null, meaning an empty graph? I should return null in that case.
- The graph is connected and undirected — so every node is reachable from the given node and every edge appears in both directions in neighbor lists?
- Node values are unique integers from 1 to 100?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to do a first pass to collect all nodes and create their clones, then a second pass to wire up the neighbor lists. That gives us O(V + E) time but requires two full traversals. We can do it in one DFS pass. The real complexity either way is O(V + E) so the optimization is about code cleanliness."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that I need a map from original node to cloned node. This serves two purposes: it prevents infinite loops on cycles, and it ensures every reference to the same original node resolves to the exact same clone object.

My approach is:
Step 1: Create a HashMap.
Step 2: DFS from the given node. If the node is already in the map, return its clone immediately.
Step 3: Otherwise, create the clone, insert it into the map immediately before recursing, then recurse on each neighbor and add results to the clone's neighbor list.

Let me trace through: nodes 1-2-3-4 in a cycle, starting at node 1.
- Visit 1: create clone(1), map[1]=clone(1). Recurse into neighbor 2.
- Visit 2: create clone(2), map[2]=clone(2). Recurse into neighbor 1 → already in map, return clone(1). Add clone(1) to clone(2)'s neighbors. Recurse into neighbor 3.
- Visit 3: create clone(3), recurse into 2 → map hit, recurse into 4.
- Visit 4: create clone(4), recurse into 3 → map hit, recurse into 1 → map hit. Done.
All edges are correctly mirrored."

### 4. State complexity before coding
"This will be O(V + E) time since each node and edge is processed once, and O(V) space for the map and recursion stack. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node that has no neighbors — input is node(1), neighbors=[]. DFS: not in map, create clone(1), no neighbors to recurse, return clone(1). Correct. Now with two nodes connected to each other: node(1) neighbors=[node(2)], node(2) neighbors=[node(1)]. DFS(1): create clone(1), recurse DFS(2): create clone(2), recurse DFS(1) → map hit, return clone(1). Add clone(1) to clone(2)'s list. Return clone(2). Add clone(2) to clone(1)'s list. Result is a valid two-node undirected clone."
