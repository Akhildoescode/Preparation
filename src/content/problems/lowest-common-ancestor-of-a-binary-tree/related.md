## Same pattern, different problem
- **Lowest Common Ancestor of a BST (#235):** When the tree IS a BST, you can use its ordering property: if both p and q are smaller than root, go left; if both larger, go right; otherwise root is the LCA. O(h) time, no need to visit all nodes.
- **Binary Tree Maximum Path Sum (#124):** Same post-order DFS that "decides" at each node based on information from both subtrees — the LCA pattern's twin.
- **Diameter of Binary Tree (#543):** Post-order DFS where you return depth and update a global max — structurally identical recursion.
- **Path Sum II (#113):** DFS that returns whether a path exists — the complement to LCA: track where you ARE on the path, not where the split is.

## When this pattern applies
Use **post-order DFS with upward propagation** when the answer requires combining information from both subtrees of some node. The classic form: recurse on both children, then make a decision at the current node based on what came back. If one return value from each child uniquely identifies the answer at the current node, post-order DFS solves it in O(n). Signals: "find the node where two targets split," "find the highest/lowest node satisfying a two-subtree condition."
