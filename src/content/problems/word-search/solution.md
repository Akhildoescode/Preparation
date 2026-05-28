## Reference solution

**Complexity:** O(m · n · 4^L) time, O(L) space (L = word length).

```java
class Solution {
    private char[][] grid;
    private String word;
    private int m, n;

    public boolean exist(char[][] board, String word) {
        this.grid = board;
        this.word = word;
        this.m = board.length;
        this.n = board[0].length;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }

    private boolean dfs(int r, int c, int idx) {
        // Bounds check and character match — both checked before accessing grid
        if (r < 0 || r >= m || c < 0 || c >= n) return false;
        if (grid[r][c] != word.charAt(idx)) return false;

        // All characters matched up to and including this one
        if (idx == word.length() - 1) return true;

        // Temporarily mark this cell as visited to prevent reuse on the current path
        char saved = grid[r][c];
        grid[r][c] = '#';

        // Try all four directions; short-circuit as soon as one succeeds
        boolean found = dfs(r + 1, c, idx + 1)
                     || dfs(r - 1, c, idx + 1)
                     || dfs(r, c + 1, idx + 1)
                     || dfs(r, c - 1, idx + 1);

        // Restore the cell so other paths (different starting points or branches) see the original
        grid[r][c] = saved;
        return found;
    }
}
```

## Line-by-line notes
- **`grid[r][c] = '#'` before recursing:** The sentinel prevents revisiting this cell in descendant calls. '#' won't match any letter in a real word, so it's safe as a sentinel.
- **`grid[r][c] = saved` after recursing:** Restores the grid regardless of whether `found` is true or false. Without this, subsequent outer-loop iterations would see a corrupted grid.
- **`||` short-circuit:** Java stops evaluating after the first `true` — efficient pruning once a valid path is found.
- **Bounds check before character check:** Checking bounds first avoids array index out-of-bounds exceptions from invalid `r` or `c`.

## Common bugs to avoid
- **Forgetting to restore the cell:** The most common bug. Without restoration, subsequent DFS branches see '#' where there should be a letter, missing valid paths.
- **`idx == word.length()` instead of `idx == word.length() - 1`:** Would cause `word.charAt(idx)` to throw `StringIndexOutOfBoundsException` before the success check triggers.
- **Not checking bounds before character access:** `grid[r][c]` with invalid `r`/`c` throws `ArrayIndexOutOfBoundsException`; always check bounds first.
