## Understanding the problem
Given two strings text1 and text2, find the length of their longest common subsequence (LCS). A subsequence need not be contiguous — it's formed by deleting some characters from the original string while maintaining relative order. For example, LCS("abcde","ace") = 3 ("ace").

## Brute force
Generate all 2^m subsequences of text1 and check which ones are also subsequences of text2, tracking the longest. O(2^m · n) time — impractical.

## Key insight
Let dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1].
- If `text1[i-1] == text2[j-1]` (characters match): these characters must be in the LCS — `dp[i][j] = dp[i-1][j-1] + 1`.
- If they don't match: the LCS comes from skipping one of them — `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

## Optimal approach
1. Create a `(m+1) × (n+1)` DP table, initialized to 0.
2. For i from 1 to m, j from 1 to n:
   - If `text1[i-1] == text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1`
   - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
3. Return `dp[m][n]`.

**Space optimization:** Since each row only depends on the previous row, reduce to O(n) space with a rolling array.

## Why this works
`dp[i][j]` is well-defined because both shorter subproblems (dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) are already computed when we compute dp[i][j]. The character match case correctly extends a known LCS by 1. The mismatch case correctly takes the best LCS that doesn't use the current character from either string (equivalent to skipping one string's current character).

## Complexity
- Time: O(m · n) — fill the entire table
- Space: O(m · n) full table; O(n) with rolling row optimization
