## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- k is guaranteed to be valid — between 1 and the total number of nodes — so I don't need to handle an invalid k?
- This is a BST, meaning left child < parent < right child with no duplicates?
- Is this a one-time query, or would there be many repeated queries on the same tree? For repeated queries, I might augment each node with a subtree size for O(log n) per query."

### 2. State the brute force (90 seconds)
"The simplest approach would be to collect all values in any traversal into an array, sort it, and return element k-1. That gives us O(n log n) time. We can do better because a BST is already sorted — we just need to use the right traversal."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that in-order traversal of a BST visits nodes in ascending order. So the kth node we visit in in-order is exactly the kth smallest. So my approach is:
Step 1 — do in-order DFS: go left, process current node, go right.
Step 2 — maintain a counter; increment it when we visit a node.
Step 3 — when the counter hits k, record the value and stop recursing.

Let me trace through this BST:
```
    5
   / \
  3   6
 / \
2   4
 \
  1? 
```
Let's use a cleaner example: [3,1,4,null,2], k=1.
In-order: visit 1 (count=1, k=1 → result=1, stop). Done. Return 1.

For k=2: visit 1 (count=1), then 2 (count=2, k=2 → result=2, stop). Return 2."

### 4. State complexity before coding
"This will be O(h + k) time and O(h) space. For a balanced BST that's O(log n + k). Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node and k=1 — inorder visits the root, count becomes 1, equals k, result set. Returns correct value. For a right-skewed BST with k=1, we dive all the way left (no left children), hit the root, count=1=k, done. Correct. Any concerns about the approach or the code?"
