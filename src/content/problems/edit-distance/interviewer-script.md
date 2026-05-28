## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Operations are insert, delete, and replace — all cost 1?
- Case-sensitive?
- Empty strings are valid inputs? (Editing '' to 'abc' costs 3 insertions.)"

### 2. State the brute force (90 seconds)
"Recursive: if characters match, recurse on the rest. Else try all 3 operations and take min. Exponential. Top-down with memoization is O(m×n). Bottom-up DP is also O(m×n) and avoids stack overhead."

### 3. Walk through the optimal approach (3 minutes)
"2D DP. dp[i][j] = min edits to convert word1[0..i-1] to word2[0..j-1].

Base cases: dp[0][j]=j (insert j chars into empty string). dp[i][0]=i (delete all i chars).

Recurrence:
- If word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1] (no operation needed).
- Else: dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
  → dp[i-1][j-1] = replace, dp[i-1][j] = delete from word1, dp[i][j-1] = insert into word1.

Trace 'horse' → 'ros':
```
     ''  r  o  s
''    0  1  2  3
h     1  1  2  3
o     2  2  1  2
r     3  2  2  2
s     4  3  3  2
e     5  4  4  3
```
Answer dp[5][3]=3. ✓"

### 4. State complexity before coding
"O(m×n) time and space. Can optimize to O(min(m,n)) space using a rolling array. I'll implement the full 2D version first."

### 5. After coding
"Empty to empty: dp[0][0]=0. 'abc' to '': dp[3][0]=3 (3 deletes). '' to 'abc': dp[0][3]=3 (3 inserts). ✓"
