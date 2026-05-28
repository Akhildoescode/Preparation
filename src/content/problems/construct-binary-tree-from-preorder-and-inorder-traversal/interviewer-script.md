## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- All values in the tree are unique, correct? That's what allows me to look up the root in the inorder array unambiguously.
- The arrays are guaranteed to represent a valid binary tree, so I don't need to validate them?
- I should return the root of the reconstructed tree?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to recursively identify the root as preorder[0], then do a linear scan of inorder to find where that root sits, split, and recurse on the left and right halves. That gives us O(n²) time because the linear scan happens at every level. We can do better with a HashMap."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that preorder[0] is always the root of the current subtree, and once I find that value in the inorder array, everything to its left is the left subtree and everything to its right is the right subtree. So my approach is:
Step 1 — pre-build a HashMap: value → inorder index.
Step 2 — define build(preStart, inStart, size): if size is 0, return null.
Step 3 — root = preorder[preStart], find its inorder index `mid`, compute leftSize = mid - inStart.
Step 4 — recurse for left with preStart+1, inStart, leftSize and for right with preStart+1+leftSize, mid+1, size-leftSize-1.

Let me trace: preorder=[3,9,20,15,7], inorder=[9,3,15,20,7].
HashMap: {9→0, 3→1, 15→2, 20→3, 7→4}.
build(0, 0, 5): root=3, mid=1, leftSize=1.
  Left: build(1, 0, 1): root=9, mid=0, leftSize=0. Left/right null. Returns node 9.
  Right: build(2, 2, 3): root=20, mid=3, leftSize=1.
    Left: build(3, 2, 1): root=15. Returns node 15.
    Right: build(4, 4, 1): root=7. Returns node 7.
  Returns node 20 with left=15, right=7.
Root 3 with left=9, right=20. Correct tree."

### 4. State complexity before coding
"This will be O(n) time and O(n) space for the HashMap. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single element — build(0, 0, 1): root = preorder[0], leftSize = 0, both recursive calls hit size==0 and return null. Returns a leaf node. Correct. Any concerns about the approach or the code?"
