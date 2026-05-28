## Same pattern, different problem
- **Edit Distance (LC #72):** Same dp[i][j] structure — match: dp[i-1][j-1]; mismatch: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]). LCS and Edit Distance are dual problems.
- **Longest Common Substring (variation):** LCS but requiring contiguity — dp[i][j] = dp[i-1][j-1]+1 if match, else 0. The max dp[i][j] is the answer.
- **Unique Paths (LC #62):** Same dp[i][j] = dp[i-1][j] + dp[i][j-1] structure — different meaning (counting paths vs. LCS length).
- **Longest Palindromic Subsequence (LC #516):** LCS of the string with its reverse equals the longest palindromic subsequence length.

## When this pattern applies
2-D string DP applies when the answer for two sequences depends on answers for their prefixes, and the recurrence involves aligning or comparing characters at each position. The 3-case structure (match: use diagonal; skip text1's char: use above; skip text2's char: use left) is the LCS/Edit Distance template. Use it when asked about: longest common subsequence, edit distance, shortest common supersequence, or any "align two sequences" problem where skipping characters is allowed.
