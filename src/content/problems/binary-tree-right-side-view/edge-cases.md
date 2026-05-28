## Cases to mention to the interviewer

- **Empty input / null root:** Return an empty list. Handled by the early null check before seeding the queue.
- **Single node:** The queue has one node, levelSize=1, i=0 == levelSize-1, so that node's value is added. Returns a list with one element.
- **Left-skewed tree (no right children):** At every level, the only node is the left child of the level above. That single node is also the last node in its level, so it correctly appears in the right-side view.
- **Tree where a left subtree is deeper than the right subtree:** Nodes from the left subtree at deeper levels are still visible from the right because there are no right-side nodes at that depth. BFS handles this correctly — the last node in the level is whichever subtree is longer.
- **Complete binary tree (full levels):** The queue width peaks at n/2 at the bottom level, confirming O(n) space is tight for this case.
- **Integer overflow risk:** Node values are read, not summed, so no overflow risk. However, if the problem were asking for a level sum instead, int overflow on large values would be worth mentioning.
