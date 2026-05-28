## Cases to mention to the interviewer

- **Null root:** Not possible per constraints (tree has at least 1 node), but if it were, `depth(null)` returns 0, `maxDiameter` stays 0. Return 0.
- **Single node:** `[1]`. `depth(1)`: left=0, right=0, candidate=0, maxDiameter=0. Return 1. Answer: 0 (no edges). ✓
- **Path graph (skewed tree):** `1→2→3→4→5` (all right children). Diameter is 4 (path from 1 to 5). DFS: at node 1, leftDepth=0, rightDepth=4 → candidate=4. maxDiameter=4. ✓
- **Diameter not through root:** Star-shaped tree where root has two deep subtrees. Root's leftDepth + rightDepth gives the diameter. Always handled because `maxDiameter` is updated at every node including the root.
- **Balanced tree:** `[1,2,3,4,5,6,7]`. Diameter passes through root: leftDepth=2, rightDepth=2, diameter=4. Checked at root's update step.
- **All left children (skewed left):** `[1,2,null,3,null,4,null]`. Diameter = 3. At node 1: leftDepth=3, rightDepth=0 → candidate=3. maxDiameter=3. ✓
- **Diameter measured in edges, not nodes:** A 2-node tree has diameter 1, not 2. The formula `leftDepth + rightDepth` with null-returns-0 gives edge count. Verify with single-edge tree: node with one child → left=1, right=0, diameter=1. ✓
