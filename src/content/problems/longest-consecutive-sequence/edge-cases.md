## Cases to mention to the interviewer

- **Empty array:** `[]`. The set is empty. The outer loop doesn't run. Return `maxLength = 0`. ✓
- **Single element:** `[7]`. Set = {7}. n=7: 6 not in set → start. 8 not in set → length=1. Return 1. ✓
- **All same element:** `[5, 5, 5]`. Set = {5}. Only one iteration. n=5: 4 not in set → length=1. Return 1. Duplicates collapsed by the set.
- **Already consecutive:** `[1, 2, 3, 4]`. Set = {1,2,3,4}. n=1: start, count to 4 → length=4. n=2,3,4: each skipped (n-1 in set). Return 4.
- **Multiple sequences:** `[10, 5, 3, 4, 100, 6]`. Sequences: [3,4,5,6] (length 4) and [10] and [100]. n=3: start, counts 3,4,5,6 → length=4. Max=4. ✓
- **Integer overflow when checking n-1:** If `n = Integer.MIN_VALUE`, then `n-1` underflows to `Integer.MAX_VALUE`. Since `Integer.MAX_VALUE` is unlikely to be in the set, this works accidentally, but you could mention it — in Java with `int` arithmetic it wraps silently. Not a real concern with LeetCode's constraints, but worth a note.
- **Large array with many duplicates:** `nums` has n=10⁵ elements but only 10 unique values. The HashSet holds 10 entries; all iterations are fast regardless of n.
