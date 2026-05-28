## Understanding the problem
Return the nodes of a binary tree grouped by level — all nodes at depth 0 together, all at depth 1 together, etc. — each level as its own list. This is a BFS (breadth-first search) traversal.

## Brute force / only approach
BFS with a queue is the natural and optimal approach. There's no better time complexity than O(n) since every node must be visited. The main implementation choice is how to separate levels.

## Key insight
At the start of each level, the queue contains exactly all nodes at that level. Record the queue's size before processing the level, then dequeue exactly that many nodes (they're the current level) and enqueue their children (the next level).

## Optimal approach — BFS with level-size tracking
1. Start with root in the queue (skip if null).
2. While queue is not empty:
   - `levelSize = queue.size()` — number of nodes at current level.
   - Process exactly `levelSize` nodes:
     - Dequeue, add to current level list.
     - Enqueue left and right children if non-null.
   - Add the current level list to the result.
3. Return result.

Trace tree `[3, 9, 20, null, null, 15, 7]`:
- Queue: [3]. levelSize=1. Dequeue 3 → level=[3]. Enqueue 9, 20.
- Queue: [9, 20]. levelSize=2. Dequeue 9 → level=[9], enqueue nothing. Dequeue 20 → level=[9,20], enqueue 15, 7.
- Queue: [15, 7]. levelSize=2. Dequeue both → level=[15,7].
Result: [[3],[9,20],[15,7]]. ✓

## Why this works
BFS processes nodes in FIFO order, naturally producing level-order. The `levelSize` snapshot separates levels — we dequeue only the nodes that were in the queue at the start of this iteration (current level), and any nodes enqueued during this iteration (children) form the next level.

## Complexity
- Time: O(n) — each node enqueued and dequeued exactly once.
- Space: O(n) — the queue holds at most O(n) nodes (the widest level, which for a complete binary tree is n/2).
