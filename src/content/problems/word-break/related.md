## Same pattern, different problem
- **Word Break II (LC #140):** Returns all actual segmentations (not just whether it's possible) — requires backtracking or memoization of actual splits, not just booleans.
- **Palindrome Partitioning (LC #131):** Partitions a string where each part satisfies a property — same "try all split points" structure but wants all partitions (backtracking) rather than existence (DP).
- **Decode Ways (LC #91):** 1-D DP on strings where dp[i] depends on dp[i-1] and dp[i-2] — same style of "is this prefix valid?" propagation.
- **Coin Change (LC #322):** 1-D DP where dp[i] = min over all coins of (dp[i-coin] + 1) — "can we reach sum i?" has the same flavor as "can we segment prefix of length i?"

## When this pattern applies
String segmentation DP applies when: you need to determine if a string can be split into parts satisfying some property (dictionary membership, palindrome-ness, etc.), and a split is valid if *both* the current part is valid and the prefix before it is valid. The template: `dp[i] = OR over j < i of (dp[j] AND isValid(s[j..i-1]))`. Use a HashSet for O(1) property checks. For counting or optimizing, change OR to SUM or MIN/MAX.
