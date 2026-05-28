## Understanding the problem
Given an m×n matrix where each row is sorted left-to-right and the first integer of each row is greater than the last integer of the previous row, determine if a target value exists. The matrix is effectively a sorted 1D array laid out in 2D.

## Brute force
Check every cell. O(m·n) time. Completely ignores the sorted structure.

## Key insight
Because rows are sorted and each row's first element is greater than the previous row's last element, the whole matrix in row-major order is a single sorted sequence of m·n elements. We can binary search this virtual 1D array and map each index back to `(row, col)` = `(mid / n, mid % n)`.

## Optimal approach
1. Set `lo = 0`, `hi = m * n - 1`.
2. While `lo <= hi`:
   - `mid = lo + (hi - lo) / 2`
   - `row = mid / n`, `col = mid % n`
   - Compare `matrix[row][col]` to `target`, narrow accordingly.
3. Return `true` if found, `false` if loop exits.

## Why this works
The index-to-(row,col) mapping is bijective for a fixed number of columns `n`. Standard binary search correctness holds because the underlying virtual 1D sequence is fully sorted.

## Complexity
- Time: O(log(m·n)) = O(log m + log n) because we binary search over m·n elements
- Space: O(1)
