## Understanding the problem
Imagine standing to the right of a binary tree and looking left. You can see exactly one node per level — the rightmost node at that depth. Return a list of those values in order from top (root level) to bottom.

## Brute force
Perform a full BFS level-order traversal, collecting all nodes at each level into a list. After each level is collected, take the last element. This is already O(n) time and O(n) space and is essentially the optimal approach — there is no asymptotic improvement possible because you must check every node to find which one is rightmost at each level.

## Key insight
BFS processes nodes level by level. Within each level, the last node dequeued is the rightmost visible node. You do not need to store the entire level — you only need to know when you have processed the last node of the current level. This is the standard "process level by level using queue size snapshot" technique.

## Optimal approach — BFS level-order (tree_bfs)
- Pattern: tree_bfs with level boundary tracking.
- Initialize a queue with the root. If root is null, return an empty list.
- While the queue is not empty:
  1. Snapshot `levelSize = queue.size()` — the number of nodes in this level.
  2. Loop `levelSize` times, dequeuing each node.
  3. For the last iteration (i == levelSize - 1), record the node's value.
  4. Enqueue non-null left and right children.
- Invariant: at the start of each outer loop iteration, the queue contains exactly the nodes of the next level in left-to-right order.

## Why this works
Because we enqueue left before right, the nodes within each level are processed left-to-right. The last node processed in each level is therefore the rightmost one. Snapshotting `queue.size()` before the inner loop ensures we count exactly the current level's nodes even as we enqueue the next level's nodes during that same loop.

## Complexity
- Time: O(n) because every node is enqueued and dequeued exactly once.
- Space: O(n) because the queue can hold up to n/2 nodes at the widest level of a complete binary tree.
