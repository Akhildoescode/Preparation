## Pattern: 2-D Dynamic Programming (String Alignment)

Edit Distance is the canonical string DP problem. The 2-D table where `dp[i][j]` depends on `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]` (the three diagonal/left/above cells) appears in many string problems.

## Related problems

- **Longest Common Subsequence (LC 1143):** Count the longest common subsequence. `dp[i][j] = dp[i-1][j-1] + 1` if chars match, else `max(dp[i-1][j], dp[i][j-1])`. Edit distance uses LCS conceptually (the non-LCS characters are the ones that need editing).
- **Longest Common Substring:** Similar 2-D DP but requires contiguous matching. `dp[i][j] = dp[i-1][j-1] + 1` on match, else 0.
- **One Edit Distance (LC 161):** Binary check — determine if two strings differ by exactly one edit. Can be done in O(n) without DP.
- **Delete Operation for Two Strings (LC 583):** Minimum deletions to make two strings equal = `m + n - 2 × LCS(word1, word2)`.
- **Minimum ASCII Delete Sum (LC 712):** Like edit distance but cost is the ASCII value of deleted characters, not count.
- **Distinct Subsequences (LC 115):** Count distinct ways word1's subsequences match word2. Similar 2-D DP structure.
- **Regular Expression Matching (LC 10):** 2-D DP with `*` wildcard — each state depends on pattern character type.

## Key insight connecting these problems

All string DP problems follow the pattern: process `word1[0..i-1]` and `word2[0..j-1]` — when the last characters match, reduce to a smaller subproblem; when they don't, consider all possible last operations. The 2-D table captures all `O(m × n)` subproblems.
