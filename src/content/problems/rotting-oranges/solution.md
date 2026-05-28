## Reference solution

**Complexity:** O(m * n) time, O(m * n) space.

```java
class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        var queue = new ArrayDeque<int[]>();
        int freshCount = 0;

        // Seed the queue with all initially rotten oranges; count fresh ones
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) queue.offer(new int[]{r, c});
                else if (grid[r][c] == 1) freshCount++;
            }
        }

        // No fresh oranges to rot
        if (freshCount == 0) return 0;

        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        int minutes = 0;

        // BFS level by level; each level = 1 minute
        while (!queue.isEmpty() && freshCount > 0) {
            minutes++;
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                var cell = queue.poll();
                for (var dir : dirs) {
                    int nr = cell[0] + dir[0];
                    int nc = cell[1] + dir[1];
                    // Only spread to fresh oranges
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;  // mark rotten to avoid re-processing
                        freshCount--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }

        return freshCount == 0 ? minutes : -1;
    }
}
```

## Line-by-line notes
- **queue.offer all rotten cells upfront:** This is what makes it multi-source BFS — all sources are in the queue before we start, so they all expand simultaneously.
- **`freshCount == 0` early return:** Avoids returning `minutes` which would be 0 from a BFS that never ran — but checking after BFS also works. Explicit early return is cleaner.
- **`levelSize` snapshot:** We capture `queue.size()` at the start of each level so the inner loop only processes cells from the current level, not newly added ones. This is the standard BFS level-tracking technique.
- **`grid[nr][nc] = 2` before enqueue:** Marks the cell as processed immediately to prevent another rotten neighbor from re-enqueuing it in the same or subsequent levels.
- **`freshCount > 0` in while condition:** Optimization — stop BFS early once all fresh oranges are gone rather than draining remaining rotten cells that won't produce new results.
- **Final ternary:** After BFS, any remaining fresh oranges are unreachable (isolated by walls or empty cells).

## Common bugs to avoid
- Not capturing `levelSize` before the inner loop — causes newly added cells to be counted in the current minute instead of the next.
- Marking `grid[nr][nc] = 2` after `queue.offer` rather than before — allows duplicate enqueues and incorrect `freshCount` decrement.
- Returning `minutes` when `freshCount > 0` — must return -1 in that case.
- Forgetting the `freshCount > 0` guard and always returning `minutes` — fails on grids with isolated fresh oranges.
