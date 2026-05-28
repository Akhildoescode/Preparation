## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- I should modify the tree in-place and return the root, correct? Not build a new tree?
- For an empty tree, I just return null?
- Is there any constraint on tree size I should worry about for stack depth?"

### 2. State the brute force (90 seconds)
"There's no fundamentally slow approach here — any correct solution visits every node once, so O(n) is unavoidable. The question is just whether I use recursive DFS or iterative BFS. I'll go with recursive DFS since it's the most concise. That gives us O(n) time and O(h) space."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that to mirror a tree, at every single node I just swap its left and right child pointers, and the recursive calls handle the subtrees. So my approach is:
Step 1 — base case: if node is null, return null.
Step 2 — recurse into both children first (post-order).
Step 3 — swap node.left and node.right.
Step 4 — return node.

Let me trace through:
```
    4
   / \
  2   7
 / \ / \
1  3 6  9
```
invertTree(1) → null swap → returns 1. invertTree(3) → returns 3. invertTree(2): left=3, right=1, swap → left=1? Wait — post-order means I've already inverted subtrees, then I swap. So invertTree(2): after recursing, node 2's inverted left=1, right=3; swap gives left=3, right=1. Similarly invertTree(7) gives left=9, right=6. Root 4 swaps: left=7-subtree, right=2-subtree. Final tree: 4 → {7→{9,6}, 2→{3,1}}. That's the correct mirror."

### 4. State complexity before coding
"This will be O(n) time and O(h) space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node — null children swapped are still null, returns the node. For null input, base case returns null immediately. Looks correct. Any concerns about the approach or the code?"
