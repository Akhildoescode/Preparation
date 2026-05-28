## Understanding the problem

You have an `m x n` matrix of non-negative heights. Water can flow from a cell to an adjacent cell (up, down, left, right) if the neighbor's height is less than or equal to the current cell's height. The Pacific Ocean touches the top and left borders; the Atlantic Ocean touches the bottom and right borders. Return all cells from which water can flow to both oceans.

## Brute force

For each cell, run a DFS/BFS simulating water flowing downhill and check if it reaches both oceans. This is O((m\*n)^2) — a full traversal per cell. For a 200×200 grid that is 1.6 billion operations, far too slow.

## Key insight

Instead of simulating flow from each cell downward (hard, many starting points), reverse the direction: do BFS/DFS upward from each ocean's border. A cell is reachable from the Pacific if water can flow from it to the Pacific, which is equivalent to water being able to flow upward (to equal or higher cells) from the Pacific border to that cell. Take the intersection of cells reachable from both oceans.

## Optimal approach

Pattern: **graph\_dfs (reverse BFS/DFS from shores)**.

1. Create two boolean grids: `pacific[m][n]` and `atlantic[m][n]`.
2. Run DFS from every cell on the Pacific border (top row + left column). In this reverse DFS, move to a neighbor only if `neighbor.height >= current.height` (water can flow from neighbor down to current, meaning neighbor can reach the ocean through current). Mark cells reachable in `pacific`.
3. Run the same DFS from every Atlantic border cell (bottom row + right column). Mark cells in `atlantic`.
4. Collect all `(r, c)` where both `pacific[r][c]` and `atlantic[r][c]` are true.

## Why this works

We reversed the direction of flow: instead of asking "can water from (r,c) reach the ocean?" we ask "can we travel uphill from the ocean to (r,c)?" These questions are equivalent — if uphill travel is possible from ocean to cell, then downhill flow is possible from cell to ocean. The intersection gives exactly the cells that can drain to both oceans.

## Complexity
- Time: O(m * n) because each cell is visited at most twice — once for each ocean's DFS.
- Space: O(m * n) because the two boolean arrays and the recursion stack each use O(m * n) space in the worst case.
