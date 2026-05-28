## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Return nodes as a list of lists, where each inner list is one level?
- For a null root, return an empty list?
- Left-to-right order within each level?"

### 2. State the brute force (90 seconds)
"DFS with level tracking also works — DFS(node, level) appends the node's value to result[level]. Both DFS and BFS are O(n). But BFS is the more natural choice for level-order and is what interviewers expect."

### 3. Walk through the optimal approach (3 minutes)
"I'll use a queue (ArrayDeque) for BFS. The key insight for separating levels: before processing each level, snapshot `queue.size()` — that tells me exactly how many nodes are at the current level. I dequeue exactly that many, add their children, and record the level.

Let me trace `[3, 9, 20, null, null, 15, 7]`:
- Start: queue=[3].
- Level 0: size=1. Dequeue 3 → level=[3]. Enqueue 9, 20.
- Level 1: size=2. Dequeue 9 → no children. Dequeue 20 → enqueue 15, 7. Level=[9,20].
- Level 2: size=2. Dequeue 15, 7 → no children. Level=[15,7].
- Queue empty. Done.
Result: [[3],[9,20],[15,7]]."

### 4. State complexity before coding
"O(n) time and O(n) space (queue holds at most one full level, which is n/2 nodes in a complete tree). Coding now."

### 5. After coding
"Test with null root: skip the initial enqueue, result is empty, return empty list immediately. ✓ Test single node: one level, one element. ✓"
