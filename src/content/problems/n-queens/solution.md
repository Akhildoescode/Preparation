## Reference solution

**Complexity:** O(n!) time, O(n²) space.

```java
class Solution {
    private List<List<String>> result;
    private Set<Integer> cols, diag1, diag2;
    private char[][] board;
    private int n;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        result = new ArrayList<>();
        cols  = new HashSet<>();
        diag1 = new HashSet<>();  // row - col: constant along each main diagonal (↘)
        diag2 = new HashSet<>();  // row + col: constant along each anti-diagonal (↗)

        board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');

        backtrack(0);
        return result;
    }

    private void backtrack(int row) {
        if (row == n) {
            // All n queens placed — record the board state
            List<String> snapshot = new ArrayList<>();
            for (char[] r : board) snapshot.add(new String(r));
            result.add(snapshot);
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row - col, d2 = row + col;
            // Skip this column if it or either diagonal is already occupied
            if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue;

            // Place queen and mark all three attack sets
            board[row][col] = 'Q';
            cols.add(col); diag1.add(d1); diag2.add(d2);

            backtrack(row + 1);

            // Remove queen and unmark (backtrack)
            board[row][col] = '.';
            cols.remove(col); diag1.remove(d1); diag2.remove(d2);
        }
    }
}
```

## Line-by-line notes
- **`row - col` for main diagonal:** All cells (r, c) on the same "↘" diagonal share the same `r - c` value. This can be negative — Integer HashSet handles that fine.
- **`row + col` for anti-diagonal:** All cells on the same "↗" diagonal share the same `r + c`. Ranges from 0 to 2*(n-1).
- **`Arrays.fill(row, '.')`:** Pre-fills every cell with '.'. We only change cells to 'Q'/'.' during backtracking, so the snapshot at row==n is always correct.
- **`new String(r)` at solution time:** Converts the char[] row to an immutable String. Only done when an actual solution is found, so the O(n²) cost is proportional to the number of solutions.

## Common bugs to avoid
- **Confusing `row - col` and `row + col`:** Main diagonals (↘) use `row - col`; anti-diagonals (↗) use `row + col`. Swapping them makes queens on the same diagonal appear safe.
- **`cols.remove(col)` vs `cols.remove(Integer.valueOf(col))`:** `HashSet.remove(int)` would auto-box to Integer, so either form works in Java — but be aware of the distinction between `List.remove(int index)` and `List.remove(Object)`.
- **Not restoring `board[row][col] = '.'` on backtrack:** Without this, the board snapshot at future solution nodes contains stale 'Q' values from previous branches.
