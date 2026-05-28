## Cases to mention to the interviewer

- **Empty array `nums = []`:** `start = 0 = nums.length`, loop doesn't execute, `result.add(new ArrayList<>())` adds one empty subset. Result: `[[]]`. Correct — the power set of the empty set is `{∅}`.
- **Single element `nums = [5]`:** First call adds `[]`, then adds `5`, recurse (adds `[5]`), unchoose. Result: `[[], [5]]`. Two subsets = 2¹ = 2. ✓
- **All elements included:** Final result always has 2ⁿ subsets (verified: n=3 → 8 subsets, n=4 → 16).
- **Order of subsets in output:** The problem says any order is valid. Backtracking naturally produces subsets in lexicographic order of index selection: `[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]` for `[1,2,3]`.
- **Mutation hazard:** If you add `current` directly instead of `new ArrayList<>(current)`, all entries in `result` point to the same list — all become empty when backtracking finishes. Always copy.
- **Distinct integers guaranteed:** LeetCode constraints say all elements are distinct, so no duplicate handling is needed. For Subsets II (with duplicates), sort first and skip `nums[i] == nums[i-1]` when `i > start`.
- **Large n (n=10):** 2¹⁰ = 1024 subsets, total elements across all subsets = n × 2^(n-1) = 5120. Still fast.
- **Negative numbers:** Backtracking works regardless of values — we're choosing by index, not value. A subset like `[-2, 0, 1]` is produced correctly.
