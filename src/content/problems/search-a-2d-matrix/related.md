## Same pattern, different problem
- **Binary Search:** The same lo/hi/mid template; this problem is a 2D wrapper.
- **Search a 2D Matrix II (LC #240):** The matrix in that version is sorted only along rows and columns independently (not globally), so this approach doesn't work — you'd use a staircase search from the top-right corner instead.
- **Find Minimum in Rotated Sorted Array:** Both problems reduce a structured search space to a binary search by exploiting a sorted property.
- **Koko Eating Bananas:** Binary search on an answer space rather than a position — shows that the same template applies to diverse problems.

## When this pattern applies
Use binary search on a 2D matrix when the entire matrix in row-major order forms a globally sorted sequence (i.e., the last element of row i < first element of row i+1). If only rows and columns are independently sorted, a staircase search or binary search per row is needed instead.
