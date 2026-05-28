## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Substring means contiguous characters — correct? Not subsequence.
- If multiple palindromes of maximum length exist, should I return any one of them?
- Single characters count as palindromes of length 1?"

### 2. State the brute force (90 seconds)
"Check all O(n²) substrings, verify each is a palindrome in O(n). Total O(n³). We can get O(n²) by expanding from each possible center."

### 3. Walk through the optimal approach (3 minutes)
"Key insight: every palindrome has a center — either a single character (odd-length like 'aba') or a pair (even-length like 'abba'). There are 2n-1 possible centers. For each, I expand outward as long as the characters on both sides match.

For s = 'babad':
- Center 'a' at i=1: expand: s[0]='b' == s[2]='b' → expand further: i-1 < 0. Palindrome 'bab', length 3.
- Center 'a' at i=3: s[2]='b', s[4]='d' — no match. Length 1.
- Center between i=1 and i=2 ('ab'): s[1]='a' != s[2]='b'. Length 0 (even, no expansion).
- Max is 'bab' (or 'aba', both length 3). Return either.

The result tracking: when I find a longer palindrome of length `len`, the start index is `i - (len-1)/2`."

### 4. State complexity before coding
"O(n²) time, O(1) space for the expand approach. The DP approach is O(n²) time and O(n²) space — expand is better. Manacher's is O(n) but complex — I won't implement it unless asked."

### 5. After coding
"For the DP approach: dp[i][j] = (s[i]==s[j]) && (j-i<=2 || dp[i+1][j-1]). Fill from shorter substrings to longer. Same O(n²) time, O(n²) space. I prefer expand-around-center in interviews."
