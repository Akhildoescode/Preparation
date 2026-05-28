## Same pattern, different problem
- **Binary Tree Maximum Path Sum (#124):** Same post-order DFS structure with a global max updated at each node. The "gain" from each side uses `max(0, gain)` instead of raw depth to handle negative values.
- **Balanced Binary Tree (#110):** Also uses post-order DFS that returns depth — if left and right depths differ by more than 1, the tree is unbalanced. Identical recursion structure.
- **Longest Univalue Path (#687):** Post-order DFS where the return value is the length of the longest path of same-value nodes extending downward from the current node. Same "update global max, return local max" pattern.

## When this pattern applies
Use **post-order DFS with a global maximum updated at each internal node** when the answer involves a path that can "bend" at some node (i.e., go down into two different subtrees from that node). The function returns the longest path *downward* from each node, and at each node you consider using the node as the "bend point." This pattern appears whenever the question asks for the longest/best path between any two nodes in a tree.
