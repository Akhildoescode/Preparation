## Same pattern, different problem
- **Kth Smallest Element in a BST (#230):** In-order traversal of a BST yields sorted order. This problem uses the same property — count nodes during in-order traversal to find the kth smallest.
- **Lowest Common Ancestor of a BST (#235):** Uses BST properties (not present in general LCA) — if both p and q are less than root, go left; if both greater, go right; otherwise root is LCA.
- **Recover Binary Search Tree (#99):** Two nodes are swapped — find them by doing in-order traversal and looking for out-of-order pairs.
- **Serialize and Deserialize BST (#449):** Exploits the BST constraint to encode more compactly than a general tree.

## When this pattern applies
Use **DFS with valid range propagation** when you need to validate or constrain values in a tree relative to ancestor constraints — not just immediate parent constraints. The key is that "valid" is not a local property (checking neighbors is insufficient) but a global one that accumulates along the path from root. Passing `[min, max]` bounds down the recursion is the O(n) way to propagate all ancestor constraints without storing the path explicitly. Use `long` bounds by default to avoid edge cases with integer extremes.
