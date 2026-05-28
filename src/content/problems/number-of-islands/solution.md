## Reference solution

**Complexity:** O(n × m) time, O(n × m) space (recursion stack for DFS).

```java
class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j); // flood-fill this island
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int i, int j) {
        // Bounds check and water/already-visited check
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') {
            return;
        }

        // Mark as visited by setting to '0' (water/visited)
        grid[i][j] = '0';

        // Explore all 4 neighbors
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}
```

## Line-by-line notes
- **In-place marking `grid[i][j] = '0'`:** We modify the input grid to mark visited cells. This avoids a separate `boolean[][] visited` array. If the problem requires the grid to be unchanged afterward, either use a copy or a separate visited array.
- **Mark BEFORE recursing:** Set `grid[i][j] = '0'` before the recursive calls. This prevents the recursion from re-visiting the current cell through a neighbor (which would cause infinite recursion).
- **Bounds check first in the condition:** Short-circuit evaluation ensures we check bounds before accessing `grid[i][j]`. The conditions are ordered to fail-fast on out-of-bounds.
- **4-directional exploration:** Only up, down, left, right — diagonal connections are not considered for island formation per the problem definition.

## Common bugs to avoid
- **Not marking before recursing:** If you mark after all 4 recursive calls, each neighbor re-enters the current cell, causing stack overflow on large islands.
- **Checking `!= '0'` instead of `== '1'`:** The grid may hypothetically contain other characters. `== '1'` is explicit and safe.
- **Stack overflow on large grids:** For grids of size 300×300 with all land, the DFS stack depth can be 90,000 — exceeding Java's default stack size. BFS (iterative with a queue) avoids this and is the safer choice for very large grids. Mention this trade-off to the interviewer.
