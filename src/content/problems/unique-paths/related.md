## Same pattern, different problem
- **Unique Paths II (LC #63):** Same DP with obstacles — set dp[j]=0 when an obstacle is encountered and propagate zeros correctly.
- **Minimum Path Sum (LC #64):** Same grid traversal but minimize the sum of values along the path — change `+=` to `min(from above, from left) + grid[i][j]`.
- **Longest Common Subsequence (LC #1143):** 2-D DP where dp[i][j] depends on dp[i-1][j], dp[i][j-1], and dp[i-1][j-1].
- **Climbing Stairs (LC #70):** The 1-D version of this pattern — `dp[i] = dp[i-1] + dp[i-2]`.

## When this pattern applies
2-D DP applies when the state depends on positions in a grid or on two sequences, and the answer at each cell is derived from a bounded number of neighboring cells. The Unique Paths recurrence (`dp[i][j] = dp[i-1][j] + dp[i][j-1]`) appears when counting paths in a grid with restricted movement. The rolling row/column optimization reduces space from O(m · n) to O(min(m, n)) when the recurrence only looks at the previous row/column.
