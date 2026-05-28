## Same pattern, different problem
- **Serialize and Deserialize Binary Tree:** The inverse workflow — encode a tree into a string, then rebuild it. The deserialization step uses similar recursive divide-and-conquer logic.
- **Same Tree:** Once you build the tree, you could call isSameTree to verify the reconstruction — a nice mental check that ties both problems together.
- **Binary Tree Level Order Traversal:** Contrasting traversal: this problem consumes preorder+inorder arrays, while level-order produces a different traversal. Understanding all three traversals is the prerequisite for this problem.
- **Kth Smallest Element in a BST:** Both problems exploit structural properties of specific traversal orders (inorder for BST = sorted; inorder here = subtree boundary marker).

## When this pattern applies
Use this divide-and-conquer tree reconstruction pattern whenever you have two complementary traversal arrays of a tree with unique values. Preorder + inorder, or postorder + inorder, are both sufficient to uniquely reconstruct a binary tree; preorder + postorder is not (without unique values). The core trick — use one traversal to find the root, use the other traversal to measure subtree sizes — generalizes to any pair where one identifies the root and the other partitions.
