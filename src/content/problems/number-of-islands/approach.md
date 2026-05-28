## Understanding the problem
Given a 2D grid of `'1'` (land) and `'0'` (water), count the number of islands. An island is a maximal group of horizontally or vertically connected `'1'` cells. Diagonal connections don't count.

## Brute force / only approach
There's no better-than-O(n×m) approach since every cell must be examined at least once. The question is how to correctly count and mark connected components.

## Key insight
Every time we find an unvisited `'1'`, we've found a new island. Use DFS or BFS to mark all cells reachable from this `'1'` as visited (set to `'0'` — in-place marking avoids an extra visited array). After the traversal, all cells in this island are marked. Continue scanning for the next `'1'`.

## Optimal approach — DFS flood-fill
1. Iterate through every cell `(i, j)`.
2. If `grid[i][j] == '1'`:
   - Increment island count.
   - DFS from `(i, j)` to mark all connected land as `'0'`.
3. Return count.

**DFS:** Given `(i, j)`, if out of bounds or `grid[i][j] != '1'`, return. Otherwise set `grid[i][j] = '0'`, then recurse on all 4 neighbors (up, down, left, right).

Trace `[['1','1','0'],['0','1','0'],['1','0','1']]`:
- (0,0)='1': count=1. DFS marks (0,0),(0,1),(1,1)='0'. Grid becomes `[['0','0','0'],['0','0','0'],['1','0','1']]`.
- (2,0)='1': count=2. DFS marks (2,0)='0'.
- (2,2)='1': count=3. DFS marks (2,2)='0'.
Answer: 3. ✓

## Why this works
DFS from any `'1'` visits all cells in the same island exactly once, setting them to `'0'`. After DFS, every `'1'` in the grid belongs to a NOT-yet-counted island. The outer loop finds each island's starting point exactly once (the first `'1'` we encounter that hasn't been flooded by a previous DFS).

## Complexity
- Time: O(n×m) — each cell is visited at most twice (once by the outer scan, once by DFS that sets it to '0').
- Space: O(n×m) for the DFS call stack in the worst case (a grid of all '1's).
