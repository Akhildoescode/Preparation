## Cases to mention to the interviewer

- **Null root:** Return empty list immediately. The early null check avoids offering null to the queue.
- **Single node:** Queue starts with [root]. levelSize=1. Dequeue root, no children. Result: [[root.val]].
- **Skewed tree (all left or all right children):** Each level has exactly one node. The result has n inner lists, each with one element. BFS naturally handles this — levelSize is always 1.
- **Full binary tree:** Last level has n/2 nodes. The queue's maximum size is n/2 at the last level. Space is O(n).
- **Large tree with wide levels:** For a complete binary tree of height h, the last level has 2^h nodes. The queue may hold all of them simultaneously — O(n) space in the worst case.
- **Nodes with values ±Integer.MAX_VALUE:** No numerical computation, just storing values. Handles any int range.
- **Tree with only null children:** Some nodes may have one child — the other is null. The null checks before `queue.offer` prevent NPE and correctly skip missing children.
