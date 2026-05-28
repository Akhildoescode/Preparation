## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Is depth measured in nodes or edges? I want to return the number of nodes on the longest root-to-leaf path, so a single-node tree has depth 1 — is that right?
- Can the tree be null, meaning an empty tree? I would return 0 in that case."

### 2. State the brute force (90 seconds)
"The simplest approach would be a DFS that visits every node and at each node returns 1 plus the max of its children's depths. There's actually no smarter approach here — you have to visit all n nodes because any of them could be deepest. That gives us O(n) time, and this IS the optimal solution."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the depth of a node equals 1 plus the maximum depth of its two children, and the depth of null is 0. So my approach is:
Step 1 — base case: if the node is null, return 0.
Step 2 — recurse: compute leftDepth and rightDepth by calling the function on both children.
Step 3 — combine: return 1 + max(leftDepth, rightDepth).

Let me trace through a small example. Say the tree is:
```
    3
   / \
  9  20
    /  \
   15   7
```
maxDepth(15) = 1 + max(0, 0) = 1. maxDepth(7) = 1. maxDepth(20) = 1 + max(1, 1) = 2. maxDepth(9) = 1. maxDepth(3) = 1 + max(1, 2) = 3. We return 3, which is correct."

### 4. State complexity before coding
"This will be O(n) time because we visit each node once, and O(h) space for the recursion stack where h is the tree height — O(log n) balanced, O(n) skewed. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node — maxDepth called on that node returns 1 + max(0, 0) = 1. For null input, the base case immediately returns 0. For a skewed left-only tree, we chain down the left side and each level adds 1, giving the correct count. Looks correct. Any concerns about the approach or the code?"
