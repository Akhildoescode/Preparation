## Same pattern, different problem
- **Max Area of Island (#695):** Same flood-fill DFS/BFS, but instead of counting islands, accumulate the size of each island and return the maximum.
- **Pacific Atlantic Water Flow (#417):** Reverse flood-fill from both ocean borders — same DFS traversal, but starting from edges rather than all cells.
- **Rotting Oranges (#994):** Multi-source BFS starting from all rotten oranges simultaneously — the BFS version of flood-fill, counting the number of "waves."
- **Clone Graph (#133):** DFS on a general graph (not a grid) — same visited-tracking logic, but nodes are referenced rather than addressed by grid coordinates.

## When this pattern applies
Use **flood-fill DFS/BFS** to count or process connected components in a grid or graph. The signal: "count groups of connected cells/nodes" or "mark all reachable cells from a starting point." In-place marking (setting visited cells to a sentinel value) eliminates the need for a separate visited array at the cost of modifying the input. For problems where the grid must be preserved, use a separate `boolean[][] visited`. Always mention the DFS-vs-BFS trade-off for very large grids (BFS is stack-safe; DFS risks overflow).
