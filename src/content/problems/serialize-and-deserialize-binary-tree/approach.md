## Understanding the problem
Design an algorithm to convert a binary tree to a string (serialize) and reconstruct the original tree from that string (deserialize). The string must capture the tree's complete structure, including null children, so the reconstruction is exact.

## Brute force / common approaches
Level-order (BFS) serialization: store values level by level, using "null" for missing nodes. This works but requires knowing when to stop — null nodes in the last level are confusing.

## Key insight
Preorder (root, left, right) serialization with explicit null markers is clean and allows direct recursive deserialization. When deserializing, reading tokens left to right in preorder order reconstructs the tree correctly: the first token is always the root of the current subtree; if it's "null," the subtree is empty; otherwise recurse for left then right children.

## Optimal approach — Preorder DFS
**Serialize:** DFS preorder. Append `node.val + ","` for each node, `"null,"` for null children. Join into a single string.

**Deserialize:** Split by `","` into a token list. Use a queue (or index) to consume tokens in order. `buildTree()`:
- Poll next token.
- If `"null"`, return null.
- Create node with the integer value.
- Recursively build left child (next tokens).
- Recursively build right child (subsequent tokens).
- Return node.

Trace tree `[1, 2, 3, null, null, 4, 5]`:
- Serialize: `"1,2,null,null,3,4,null,null,5,null,null,"`
- Deserialize: poll 1 → node(1). poll 2 → node(2). poll null → left of 2 is null. poll null → right of 2 is null. poll 3 → node(3). poll 4 → node(4). poll null, null → leaf. poll 5 → node(5). poll null, null → leaf. Tree reconstructed. ✓

## Why this works
Preorder with explicit nulls is a unique encoding of a binary tree — each preorder traversal with null markers corresponds to exactly one binary tree. Reading tokens in the same preorder sequence naturally reconstructs each subtree: the root is always the first token consumed, then the left subtree (a complete preorder sequence), then the right.

## Complexity
- Time: O(n) for both serialize and deserialize.
- Space: O(n) for the string and token list.
