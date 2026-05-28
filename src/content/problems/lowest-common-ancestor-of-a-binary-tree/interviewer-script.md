## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- Both p and q are guaranteed to exist in the tree?
- A node can be an ancestor of itself — so if p is an ancestor of q, p is the LCA?
- This is a general binary tree, not a BST, so I can't use BST properties?"

### 2. State the brute force (90 seconds)
"Find the path from root to p and from root to q (DFS). Walk both paths and find the last common node. O(n) time, O(h) space for the paths. I'll show the one-pass recursive approach that's more elegant and uses the same space."

### 3. Walk through the optimal approach (3 minutes)
"Post-order DFS. The function returns the LCA if found, or a target node (p or q) if only one target is in this subtree, or null if neither is here.

Rules at each node:
1. If null → return null.
2. If node is p or q → return node immediately. (It could be the LCA if the other is in its subtree.)
3. Recurse on left and right.
4. If both sides return non-null → this node is the LCA (p and q are in different subtrees). Return this node.
5. Otherwise return whichever side is non-null (propagate the single found node upward).

Trace `[3,5,1,6,2,0,8,null,null,7,4]`, p=5, q=1:
- At 3: left recursion finds 5, right recursion finds 1. Both non-null → return 3. ✓

Trace p=5, q=4 (4 is descendant of 5):
- At 5: immediately return 5. Right subtree of 3 doesn't contain 4, returns null. Left side returns 5, right null → propagate 5 up. LCA=5. ✓"

### 4. State complexity before coding
"O(n) time, O(h) space. I'll code it."

### 5. After coding
"The guarantee that both p and q exist means the function always returns a non-null value from the root call — either a target node or their LCA."
