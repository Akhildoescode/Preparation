## Cases to mention to the interviewer

- **All zeros:** `[0, 0, 0]`. One valid triplet: [0,0,0]. The deduplication logic must not produce it multiple times — after finding it with i=0, the inner duplicate-skip advances `left` and `right` past each other, ending the inner loop. i=1 is also 0 but gets skipped by the outer duplicate check.
- **No valid triplet:** `[1, 2, 3]`. Smallest possible sum is 1+2+3=6 > 0. The `nums[i] > 0` early-exit triggers at i=0 and the function returns an empty list immediately.
- **All same non-zero value:** `[-1, -1, -1]`. Sum = -3 ≠ 0. Returns empty list. The outer loop only runs for i=0 (i=1,2 are skipped by duplicate check), and the two pointers find no valid pair.
- **Multiple triplets sharing an element:** `[-4, -1, -1, 0, 1, 2]`. Two triplets: [-1,-1,2] and [-1,0,1]. Both fixed elements (both -1s) are handled by one iteration of i because the second -1 at i=2 is skipped by the outer duplicate check.
- **Very large or very small values:** Sum of three `Integer.MAX_VALUE / 3` values could overflow — with three ints summing to MAX_VALUE, intermediate addition is safe. But `Integer.MIN_VALUE + Integer.MIN_VALUE` can overflow. Use `(long)` cast if needed.
- **Length less than 3:** The problem guarantees n ≥ 3, but if it didn't, the loop condition `i < nums.length - 2` would never execute and we'd return an empty list — correct behavior.
