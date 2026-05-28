## Same pattern, different problem
- **Palindrome Partitioning (LC #131):** Uses a precomputed dp[i][j] palindrome table — the same DP formulation as the 2-D DP approach to this problem, but applied to partitioning.
- **Longest Palindromic Subsequence (LC #516):** Find the longest palindromic subsequence (not substring) — requires LCS-style 2-D DP.
- **Valid Palindrome (LC #125):** Check if a string (ignoring non-alphanumeric) is a palindrome — simpler two-pointer check, same palindrome concept.
- **Longest Common Subsequence (LC #1143):** The expand-around-center approach generalizes to "find properties at each center," and the palindrome DP is a special case of 2-D string DP.

## When this pattern applies
Expand-around-center applies whenever you need to find the longest/all palindromic substrings. The signal: "find a palindrome (contiguous) in a string." For each possible center (2n-1 centers total), expand while the palindrome property holds. O(n²) time, O(1) space. The DP approach (dp[i][j] = palindrome?) is useful when you need all palindromic intervals (e.g., for Palindrome Partitioning's precomputation). Manacher's algorithm achieves O(n) but is only worth coding if explicitly requested — the expand approach is preferred for interview settings.
