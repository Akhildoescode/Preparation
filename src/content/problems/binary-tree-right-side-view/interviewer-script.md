## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The right-side view means the last visible node at each depth level — the rightmost node at each level, correct?
- Should I return values in top-to-bottom order?
- For an empty tree, I return an empty list?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to do a DFS and track the current depth; keep a map from depth to node value, updating the value whenever we visit a node at that depth. If we do a right-first DFS, the first node we see at each depth is the rightmost. That gives us O(n) time and O(n) space. But BFS is more natural for level-order problems, so I'll use that."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that BFS processes nodes level by level, and the last node processed in each level is the one visible from the right. So my approach is:
Step 1 — seed the queue with the root.
Step 2 — at the start of each level, snapshot the queue size so I know how many nodes belong to this level.
Step 3 — process exactly that many nodes; the last one's value goes into the result.
Step 4 — enqueue left and right children as I go.

Let me trace through:
```
    1
   / \
  2   3
   \   \
    5   4
```
Level 0: queue=[1], size=1. Process 1, it's last → result=[1]. Enqueue 2, 3.
Level 1: queue=[2,3], size=2. Process 2 (not last, skip), process 3 (last) → result=[1,3]. Enqueue 5, 4.
Level 2: queue=[5,4], size=2. Process 5 (not last), process 4 (last) → result=[1,3,4]. Return [1,3,4]."

### 4. State complexity before coding
"This will be O(n) time and O(n) space for the queue. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node — queue starts with that node, size=1, first iteration is also last, value added to result, return [root.val]. For null input, we return immediately with an empty list. Looks correct. Any concerns about the approach or the code?"
