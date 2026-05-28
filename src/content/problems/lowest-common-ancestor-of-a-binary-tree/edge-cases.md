## Cases to mention to the interviewer

- **One node is the ancestor of the other:** p=5, q=4 where 4 is a descendant of 5. LCA = 5. The early `root == p` return fires at node 5, propagating 5 upward. The side that contains 4 also returns 5 (not 4), because 5 is encountered first. ✓
- **p and q are the same node:** Not possible per problem constraints, but if it were, the early `root == p` check returns p immediately at the first encounter. LCA = p. ✓
- **p or q is the root:** LCA = root. The early `root == p || root == q` check fires immediately, returning root. ✓
- **p and q are siblings:** In different subtrees of their parent. The parent gets non-null from both left and right → returns itself as LCA. ✓
- **p and q are at the same depth but in the same subtree:** Say both are in the left subtree. The right recursion returns null. The left returns their LCA. Propagated upward correctly.
- **p is a leaf, q is deep in another subtree:** Handled by the traversal — the leaf returns itself; the subtree with q propagates q (or their LCA). The first common ancestor gets non-null from both sides.
- **Null root:** `root == null` → returns null. Since problem guarantees p and q exist (and thus root is not null), this is a theoretical case only.
