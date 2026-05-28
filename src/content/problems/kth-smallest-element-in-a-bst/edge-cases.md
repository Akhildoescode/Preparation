## Cases to mention to the interviewer

- **Empty input / null root:** The problem guarantees k is valid, so a null root with k ≥ 1 cannot occur. If it could, `inorder(null, k)` immediately returns and `result` stays 0 — worth noting.
- **Single node:** k must be 1. In-order visits the sole node, count becomes 1, equals k, result is set. Returns correctly.
- **k = 1 (find minimum):** The traversal dives all the way down the left spine of the BST and returns at the leftmost node. O(h) time, no right subtrees touched.
- **k = n (find maximum):** The traversal must visit every node in order. Time is O(n), same as brute force. Mention that for k close to n, the algorithm degrades gracefully.
- **Right-skewed BST:** The leftmost node is the root itself (no left children). In-order hits the root first, count=1, so k=1 returns immediately. For k=2 it would then go right, and so on.
- **Repeated queries on the same tree:** For a stream of k queries, augment each BST node with its subtree size. Then binary-search down the tree: if k ≤ leftSubtreeSize, go left; if k == leftSubtreeSize+1, return current; else subtract and go right. Each query becomes O(log n) for a balanced BST.
