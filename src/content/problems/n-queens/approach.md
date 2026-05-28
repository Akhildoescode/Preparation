## Understanding the problem
Place n queens on an n×n chessboard such that no two queens attack each other — no two queens share a row, column, or diagonal. Return all distinct configurations as string board representations. This is the canonical constraint-satisfaction backtracking problem.

## Brute force
Try every combination of n cells from n² and check validity. C(n²,n) possibilities — completely impractical for n ≥ 5.

## Key insight
Since queens attack an entire row, exactly one queen must go in each row. So place queens row by row: for row `r`, try every column `c`. Skip if column `c` or either diagonal is already occupied by a previously placed queen. Track conflicts with three sets: occupied columns, occupied main diagonals (characterized by `row - col`, constant along each main diagonal), and occupied anti-diagonals (characterized by `row + col`, constant along each anti-diagonal). Set lookups are O(1), making conflict checking cheap.

## Optimal approach
1. Maintain `cols`, `diag1` (row - col), `diag2` (row + col) as HashSets.
2. `backtrack(row)`:
   - If `row == n`: convert board to List<String>, add to results.
   - For `col` in 0..n-1:
     - If `col ∈ cols` or `row-col ∈ diag1` or `row+col ∈ diag2`: skip.
     - Place 'Q', add to sets, recurse for `row+1`, restore '.', remove from sets.

## Why this works
Placing one queen per row guarantees no row conflicts. The sets track column and diagonal conflicts globally. `row - col` is constant along any "/" diagonal and `row + col` is constant along any "\" diagonal — these two values uniquely identify the diagonal containing any cell. With O(1) lookups, each candidate column is checked in constant time.

## Complexity
- Time: O(n!) with pruning — branching factor decreases as more queens are placed; converting each solution is O(n²)
- Space: O(n) for the three sets and recursion stack, O(n²) for the board
