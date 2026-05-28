## Understanding the problem
Given two integer arrays `preorder` and `inorder` representing the preorder and inorder traversal of the same binary tree, reconstruct and return the tree. All values are unique. You are guaranteed that the arrays represent a valid binary tree.

## Brute force
For each recursive call, scan the inorder array linearly to find the root's position. This gives O(n) per level and O(n²) overall for a balanced tree, worse for skewed. The fix is to pre-build a HashMap from value to inorder index for O(1) lookup.

## Key insight
In a preorder traversal, the first element is always the root of the current subtree. Once you know the root's value, finding it in the inorder array splits the array: everything to its left is the left subtree, everything to its right is the right subtree. The size of the left inorder slice tells you exactly how many elements to consume from preorder for the left subtree.

## Optimal approach — Recursive tree_dfs with index arithmetic
- Pattern: tree_dfs, divide-and-conquer on array slices.
- Pre-process: build `Map<Integer, Integer> inorderIndex` mapping each value to its inorder position.
- Define `build(preStart, inStart, size)`:
  - If `size == 0`, return null.
  - `rootVal = preorder[preStart]` — first element of the preorder slice is the root.
  - `mid = inorderIndex.get(rootVal)` — root's index in inorder array.
  - `leftSize = mid - inStart` — number of nodes in the left subtree.
  - `root.left  = build(preStart + 1, inStart, leftSize)` — left subtree slice.
  - `root.right = build(preStart + 1 + leftSize, mid + 1, size - leftSize - 1)` — right subtree.
  - Return `root`.
- Invariant: `build(preStart, inStart, size)` correctly reconstructs the subtree whose preorder traversal starts at `preorder[preStart]` and whose inorder traversal occupies `inorder[inStart .. inStart+size-1]`.

## Why this works
Preorder uniquely identifies the root of each subproblem, and inorder uniquely partitions its nodes into left vs. right subtrees. Together, these two constraints leave only one possible tree structure. The HashMap makes each level's root lookup O(1), so each of the n nodes is processed in constant time.

## Complexity
- Time: O(n) because each node is created exactly once and the HashMap lookup is O(1).
- Space: O(n) for the HashMap plus O(h) for the recursion stack. Overall O(n).
