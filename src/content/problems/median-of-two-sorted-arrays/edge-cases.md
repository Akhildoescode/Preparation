## Cases to mention to the interviewer

- **One empty array:** `nums1=[], nums2=[1,2,3]` — binary search range is [0,0], i=0 always, j=half. Returns the median of nums2.
- **Arrays of very different sizes:** `nums1=[1], nums2=[1,2,3,4,5,6,7]` — ensure the shorter array is searched to keep `j` valid.
- **Odd total length:** `[1,3] and [2]` → merged [1,2,3], median=2. Return the max of the left partition.
- **Even total length:** `[1,2] and [3,4]` → merged [1,2,3,4], median=2.5. Return the average of the two middle elements.
- **All elements in one array smaller than all in the other:** `[1,2] and [3,4]` — partition lands cleanly with no cross-violations.
- **Duplicate values across arrays:** `[1,1] and [1,1]` — the algorithm handles duplicates correctly; comparisons use ≤ so equal values don't cause an infinite loop.
- **Integer overflow in median average:** If both middle elements are near `Integer.MAX_VALUE`, `(a + b)` overflows. Use `a + (b - a) / 2.0` or cast to long first.
