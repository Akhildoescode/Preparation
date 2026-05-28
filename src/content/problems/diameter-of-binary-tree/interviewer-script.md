## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- Diameter is measured in edges, not nodes, right? (A single-node tree has diameter 0.)
- The path can go through any node — it doesn't need to pass through the root?
- Can the tree be empty (null root)? Expected return: 0."

### 2. State the brute force (90 seconds)
"For each node, compute depth of left subtree + depth of right subtree as the candidate diameter. If depth is recomputed recursively from scratch for each node, that's O(n²) — we revisit nodes many times. The fix: compute depths bottom-up once, updating the diameter along the way."

### 3. Walk through the optimal approach (3 minutes)
"I'll do a post-order DFS that returns the depth at each node and updates a global max diameter as a side effect.

At each node: left_depth = dfs(left child), right_depth = dfs(right child). The path through this node has length left_depth + right_depth. Update maxDiameter. Return 1 + max(left_depth, right_depth) to the parent.

Let me trace a path-shaped tree `[1,2,3,4,5]` (1 is root, 2 is left child, 3 is right child, 4 and 5 are children of 2):
- dfs(4): left=0, right=0, diameter candidate=0, return 1.
- dfs(5): similarly return 1.
- dfs(2): left=1, right=1, candidate=2, maxDiameter=2, return 2.
- dfs(3): return 1.
- dfs(1): left=2, right=1, candidate=3, maxDiameter=3, return 3.
Answer: 3 (path 4→2→1→3 or 5→2→1→3)."

### 4. State complexity before coding
"O(n) time, O(h) space. Clean post-order DFS. I'll use an instance variable for maxDiameter since Java doesn't have integer references. Coding now."

### 5. After coding
"Test: single node → dfs returns 1 but maxDiameter is updated with 0+0=0. Return 0. ✓ Two nodes 1→2: dfs(2)=1, dfs(1): left=1,right=0, candidate=1, return 1. Answer: 1. ✓"
