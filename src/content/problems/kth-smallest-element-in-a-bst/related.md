## Same pattern, different problem
- **Validate Binary Search Tree:** Both problems exploit the BST in-order property. Validation checks that the in-order sequence is strictly increasing; this problem counts along the same sequence.
- **Binary Tree Right Side View:** A good contrast — that problem requires BFS, while this one requires DFS. Illustrates that choosing the right traversal order is half the battle.
- **Lowest Common Ancestor of a Binary Tree:** Another BST-specific approach exists: since the BST is sorted, LCA is the first node whose value falls between the two targets. Both problems reward understanding BST structure.
- **Find Median from Data Stream:** Kth smallest is the generalization of median. If you solve kth smallest efficiently with subtree sizes, you're one step from a balanced-BST-based median finder.

## When this pattern applies
Apply BST in-order traversal whenever the problem exploits the sorted order of BST values. The signal words are "kth smallest", "kth largest" (reverse in-order), "range query [lo, hi]", or "next greater/smaller element". In-order is the bridge between the tree structure and the sorted array it implicitly represents. Early termination is always possible once you've visited k nodes — always mention it.
