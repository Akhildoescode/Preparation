## Same pattern, different problem
- **Maximum Depth of Binary Tree:** Same recursive post-order skeleton; instead of swapping pointers, it aggregates depths with Math.max.
- **Same Tree:** Uses the same "recurse on both children, then decide at this node" structure, but reads instead of mutates.
- **Binary Tree Level Order Traversal:** If you prefer an iterative BFS solution for invertTree, you will use the exact same queue-based level-order loop, just adding a swap inside the loop.
- **Diameter of Binary Tree:** Another post-order DFS where the return value (depth) is different from the quantity being computed (diameter) — a good contrast to build intuition for what to return vs. what to track.

## When this pattern applies
Use post-order DFS for any in-place tree mutation where the correct state of a node depends on its children already being in their final state. The pattern is: recurse left, recurse right, then do the work at the current node. Inversion is the simplest example; more complex versions include flattening a tree to a linked list or converting to a different tree form.
