## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- Is a single character always a palindrome? Yes — I'll treat it as one.
- Are empty substrings allowed in a partition? I'll assume no — each part must have at least one character.
- Is there a constraint on string length? For n > ~20 the output explodes exponentially."

### 2. State the brute force (90 seconds)
"There are 2^(n-1) ways to place cuts in a string of length n. Trying all of them and filtering for all-palindrome partitions costs O(2^n · n). Backtracking achieves the same bound but prunes earlier: we only recurse when the current prefix is a palindrome."

### 3. Walk through the optimal approach (3 minutes)
"My approach: precompute a DP table where `dp[i][j]` tells me in O(1) whether `s[i..j]` is a palindrome. Then during backtracking, at each `start` position, try all `end` values. Only recurse when `dp[start][end-1]` is true — i.e., only when the current segment is a palindrome.

Trace: s='aab', start=0.
- end=1: 'a' — palindrome. current=['a'], recurse start=1.
  - end=2: 'a' — palindrome. current=['a','a'], recurse start=2.
    - end=3: 'b' — palindrome. current=['a','a','b'], start==3 → record.
  - end=3: 'ab' — not palindrome. Skip.
- end=2: 'aa' — palindrome. current=['aa'], recurse start=2.
  - end=3: 'b' — palindrome. current=['aa','b'], start==3 → record.
- end=3: 'aab' — not palindrome. Skip.
Result: [['a','a','b'], ['aa','b']]."

### 4. State complexity before coding
"O(n · 2^n) time with O(n²) DP table. The DP is a worthwhile investment — without it, each palindrome check in the loop is O(n), adding another factor. Coding now."

### 5. After coding
"I can note: in the DP table, the `j - i <= 2` guard handles single characters (i==j) and two-character strings (i+1==j) where accessing `dp[i+1][j-1]` would be out of bounds or `i+1 > j-1`."
