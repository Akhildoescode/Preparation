## Understanding the problem
A robot starts at the top-left corner of an m×n grid and must reach the bottom-right corner. The robot can only move right or down at each step. How many distinct paths are there? The grid has obstacles-free cells; every cell is reachable in this version.

## Brute force
Recursively explore all paths from (0,0) to (m-1,n-1), counting those that reach the destination. Each step branches into 2 choices (right or down), giving O(2^(m+n)) time with massive redundancy from overlapping subproblems.

## Key insight
The number of ways to reach cell (i,j) equals the number of ways to reach (i-1,j) (from above) plus the number of ways to reach (i,j-1) (from the left). These are the only two ways to arrive at (i,j) given we can only move right or down. This recurrence builds from the base cases: any cell in the first row or first column has exactly 1 path (forced to go only right or only down).

## Optimal approach
**2-D DP:**
- `dp[i][j]` = number of paths to reach (i,j).
- Base: `dp[0][j] = 1` for all j (top row), `dp[i][0] = 1` for all i (left column).
- Recurrence: `dp[i][j] = dp[i-1][j] + dp[i][j-1]` for i,j > 0.
- Answer: `dp[m-1][n-1]`.

**Space-optimized (1-D DP):**
Process row by row. `dp[j] += dp[j-1]` where `dp[j]` represents the number of paths to the current row's column j. Initialize all to 1 (top row). After m-1 passes, `dp[n-1]` is the answer.

**Math (combinatorics):** The robot makes exactly (m-1) down moves and (n-1) right moves in any order. Total paths = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! · (n-1)!).

## Why this works
The 2-D DP correctly enumerates paths via the recurrence because every path to (i,j) passes through either (i-1,j) or (i,j-1) — never both (since we can't move up or left). The count of paths through each is exactly dp[i-1][j] and dp[i][j-1] respectively.

## Complexity
- Time: O(m · n) — fill the entire grid
- Space: O(n) with the 1-D rolling row approach
