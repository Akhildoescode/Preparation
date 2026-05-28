## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- A '0' by itself is invalid — it can only appear as part of '10' or '20'?
- What if the string starts with '0'? That means zero ways to decode (no valid letter maps to 0).
- Can the string be empty? Return 1 for empty (one way — the empty decoding)."

### 2. State the brute force (90 seconds)
"Recursively try taking the next 1 or 2 digits. At each step, branch into both options and count valid complete decodings. O(2^n) without memoization. The key observation: dp[i] depends only on dp[i-1] and dp[i-2] — this is a Fibonacci-like DP."

### 3. Walk through the optimal approach (3 minutes)
"dp[i] = number of ways to decode s[0..i-1].

Case 1 (single digit): if s[i-1] != '0', we can take s[i-1] as a letter (1-9 are all valid). dp[i] += dp[i-1].

Case 2 (two digits): if the two-digit number s[i-2..i-1] is between 10 and 26 (valid letters), dp[i] += dp[i-2].

Trace: s = '226'.
- dp[0]=1, dp[1]=1 (s[0]='2' != '0')
- i=2: s[1]='2' != '0' → dp[2] += dp[1] = 1. Two-digit: '22' ∈ [10,26] → dp[2] += dp[0] = 1. dp[2]=2.
- i=3: s[2]='6' != '0' → dp[3] += dp[2] = 2. Two-digit: '26' ∈ [10,26] → dp[3] += dp[1] = 1. dp[3]=3.
Answer: 3 ('2'+'2'+'6'=BBF, '22'+'6'=VF, '2'+'26'=BZ). Correct!"

### 4. State complexity before coding
"O(n) time, O(1) space with rolling variables. Coding now."

### 5. After coding
"Tricky cases: '10' — single digit '0' is invalid (dp[i-1] not added), but '10' is valid as a pair (dp[i-2] is added). '30' — '0' alone invalid, '30' > 26 so pair also invalid. dp=0 for this position onward."
