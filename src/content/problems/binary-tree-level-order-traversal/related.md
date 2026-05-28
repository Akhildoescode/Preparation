## Same pattern, different problem
- **Binary Tree Right Side View (#199):** Level-order traversal — keep only the last element of each level (rightmost visible node). Direct application.
- **Average of Levels in Binary Tree (#637):** Level-order traversal — average the values in each level. Same BFS skeleton, different aggregation.
- **Maximum Width of Binary Tree (#662):** Level-order with index tracking — assign indices like a heap, track leftmost/rightmost at each level.
- **Rotting Oranges (#994):** Multi-source BFS on a grid — same "process all nodes at current distance before next distance" logic, applied to a 2D problem.

## When this pattern applies
Use **BFS with level-size snapshotting** whenever you need to process a tree (or graph) layer by layer and the layer boundaries matter for the answer. The signal: "group by depth," "process by level," "what is the state after k steps." In graph problems, each BFS "level" is an equidistant frontier from the source(s). The `levelSize` snapshot is the clean way to separate levels without using two queues or sentinel markers.
