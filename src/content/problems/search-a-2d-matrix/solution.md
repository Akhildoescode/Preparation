## Reference solution

**Complexity:** O(log(m·n)) time, O(1) space.

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int lo = 0, hi = m * n - 1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            // Map virtual 1D index to 2D coordinates
            int val = matrix[mid / n][mid % n];

            if (val == target) {
                return true;
            } else if (val < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return false;
    }
}
```

## Line-by-line notes
- **`hi = m * n - 1`:** The virtual array has m·n elements indexed 0 through m·n-1.
- **`matrix[mid / n][mid % n]`:** Integer division gives the row; remainder gives the column. This works because each row has exactly `n` elements.
- **Standard binary search body:** Once we have `val`, this is identical to the basic binary search template.

## Common bugs to avoid
- **Using `mid / m` instead of `mid / n`:** The row index is determined by dividing by the number of *columns* (n), not rows (m).
- **Off-by-one on `hi`:** Initialize `hi = m * n - 1` (zero-indexed last element), not `m * n`.
- **Empty matrix:** Guard with `if (m == 0 || n == 0) return false;` at the top if the problem doesn't guarantee non-empty input.
