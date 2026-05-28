## Understanding the problem
Given two strings `word1` and `word2`, find the minimum number of operations (insert a character, delete a character, replace a character) to convert `word1` into `word2`. This is the classic Levenshtein distance problem.

## Brute force
Recursive: at each step, if characters match, recurse on both suffixes; else try all three operations and take the minimum. Exponential without memoization.

## Key insight
2-D DP: `dp[i][j]` = minimum edit distance to convert `word1[0..i-1]` to `word2[0..j-1]`. Recurrence:
- If `word1[i-1] == word2[j-1]`: `dp[i][j] = dp[i-1][j-1]` (no operation needed).
- Else: `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])` — replace, delete from word1, insert into word1.

## Optimal approach — Bottom-up 2D DP
- `dp` is `(m+1) × (n+1)`.
- Base cases: `dp[i][0] = i` (delete i chars from word1 to get empty string); `dp[0][j] = j` (insert j chars).
- Fill row by row, left to right.

Trace `word1="horse"`, `word2="ros"`:
```
    ""  r  o  s
""   0  1  2  3
h    1  1  2  3
o    2  2  1  2
r    3  2  2  2
s    4  3  3  2
e    5  4  4  3
```
Answer: `dp[5][3] = 3`. ✓ (horse → rorse → rose → ros)

## Why this works
Each cell `dp[i][j]` uses only `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]` — all previously computed. The three operations correspond exactly to: replacing the current characters (diagonal), deleting from word1 (up), inserting into word1/deleting from word2 (left).

## Complexity
- Time: O(m × n).
- Space: O(m × n), optimizable to O(min(m, n)) using a rolling row.
