## Cases to mention to the interviewer

- **One empty string:** LCS = 0. The dp table's first row and column are all 0; dp[m][n] = 0.
- **Identical strings:** LCS = length of either string. dp[i][j] = dp[i-1][j-1]+1 at every step (all characters match).
- **No common characters:** e.g., text1="abc", text2="xyz". Every cell uses the max-of-neighbors formula, never the +1 formula. dp[3][3] = 0.
- **One string is a subsequence of the other:** e.g., text1="ace", text2="abcde". LCS = 3 = len(text1).
- **Single characters:** text1="a", text2="a" → 1. text1="a", text2="b" → 0.
- **Repeated characters:** text1="aab", text2="azb". LCS = 2 ("ab"). The DP handles this correctly without needing de-duplication.
