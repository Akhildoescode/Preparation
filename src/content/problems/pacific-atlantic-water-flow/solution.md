## Reference solution

**Complexity:** O(m * n) time, O(m * n) space.

```java
class Solution {
    private int[][] heights;
    private int rows, cols;
    private final int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        this.heights = heights;
        rows = heights.length;
        cols = heights[0].length;

        boolean[][] pacific  = new boolean[rows][cols];
        boolean[][] atlantic = new boolean[rows][cols];

        // DFS uphill from Pacific border (top row + left column)
        for (int c = 0; c < cols; c++) dfs(0, c, pacific);
        for (int r = 0; r < rows; r++) dfs(r, 0, pacific);

        // DFS uphill from Atlantic border (bottom row + right column)
        for (int c = 0; c < cols; c++) dfs(rows - 1, c, atlantic);
        for (int r = 0; r < rows; r++) dfs(r, cols - 1, atlantic);

        // Intersection: cells reachable from both oceans
        var result = new ArrayList<List<Integer>>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.add(List.of(r, c));
                }
            }
        }
        return result;
    }

    private void dfs(int r, int c, boolean[][] visited) {
        visited[r][c] = true;
        for (var dir : dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            // Move uphill (or flat): neighbor height >= current, and not yet visited
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                    && !visited[nr][nc]
                    && heights[nr][nc] >= heights[r][c]) {
                dfs(nr, nc, visited);
            }
        }
    }
}
```

## Line-by-line notes
- **Two separate boolean arrays:** Each tracks reachability from one ocean. The intersection step at the end is a simple double loop.
- **Border seed loops:** Four loops seed the DFS starting points. Top/bottom rows seed columns; left/right columns seed rows. Corner cells appear in two loops but the `visited` check prevents double-processing.
- **`heights[nr][nc] >= heights[r][c]`:** This is the reversed flow condition. In real water flow, water goes from high to low. Reversed: we travel from low to high (uphill) to find which cells can drain here.
- **`!visited[nr][nc]` guard:** Prevents re-visiting and infinite recursion in flat plateaus where many neighbors have equal height.
- **`List.of(r, c)`:** Java 9+ immutable list factory — clean for constructing the output pairs.

## Common bugs to avoid
- Using `<= heights[r][c]` instead of `>= heights[r][c]` in the DFS condition — easy to get the direction of the reversal wrong. Think: "we're traveling uphill from the ocean, so neighbors must be at least as high."
- Seeding only rows OR columns for a border — top row seeds column indices 0..cols-1, and left column seeds row indices 0..rows-1. Both are needed for complete coverage.
- Forgetting the `!visited` check — creates infinite loops on equal-height plateaus.
- Running a single DFS that tries to track both oceans simultaneously — much harder to get right; two separate passes are cleaner and equally efficient.
