## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- A subsequence is not required to be contiguous — correct? Just maintaining relative order.
- Are there any character constraints (e.g., only lowercase letters)?
- Should I return the length, or the actual subsequence? The problem asks for length."

### 2. State the brute force (90 seconds)
"Generating all 2^m subsequences of text1 and checking each against text2 is O(2^m · n). DP reduces this to O(m·n) by recognizing overlapping subproblems: the LCS of any two prefixes depends on shorter prefix LCSes already computed."

### 3. Walk through the optimal approach (3 minutes)
"dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]. Two cases:

1. text1[i-1] == text2[j-1]: the characters match — they must both be in the LCS. dp[i][j] = dp[i-1][j-1] + 1.

2. They don't match: the LCS skips one character — dp[i][j] = max(dp[i-1][j], dp[i][j-1]).

Trace: text1='abcde', text2='ace'.
```
    ''  a  c  e
''   0  0  0  0
a    0  1  1  1
b    0  1  1  1
c    0  1  2  2
d    0  1  2  2
e    0  1  2  3
```
dp[5][3] = 3. Correct ('ace' is the LCS)."

### 4. State complexity before coding
"O(m·n) time and space. Can reduce to O(n) space with a rolling row. Coding now."

### 5. After coding
"To reconstruct the actual subsequence (not just its length), trace back through the dp table: when dp[i][j] = dp[i-1][j-1]+1, the character at i-1 (or j-1) is in the LCS; otherwise, go in the direction of the larger dp value."
