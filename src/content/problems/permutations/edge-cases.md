## Cases to mention to the interviewer

- **Single element:** `nums = [5]` — exactly one permutation `[[5]]`. The inner loop tries index 0, marks it used, adds nums[0], reaches base case, adds copy, backtracks.
- **Two elements:** `nums = [1, 2]` — two permutations `[[1,2],[2,1]]`. Easy to verify by hand that both orderings are produced.
- **Negative numbers:** The algorithm is purely index-based and doesn't care about the sign of values.
- **Large n:** At n=8 there are 40,320 permutations. The output size is inherently O(n · n!) — this is expected and unavoidable.
- **Duplicates (Permutations II, LC #47):** This problem guarantees distinct elements. With duplicates, you'd sort first and skip `nums[i] == nums[i-1]` when `!used[i-1]` to avoid generating duplicate permutations.
