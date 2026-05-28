## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can words in the dictionary be reused multiple times in the segmentation?
- Is the comparison case-sensitive?
- Can the string or dictionary be empty? Empty string → true (vacuously segmentable). Empty dictionary → false unless s is also empty."

### 2. State the brute force (90 seconds)
"The naive approach: try splitting the string at every possible position, recursively checking if both parts can be segmented. This is exponential O(2^n) due to overlapping subproblems — for example, checking whether 'a' can start a valid segmentation multiple times for different splits. DP with memoization fixes this."

### 3. Walk through the optimal approach (3 minutes)
"I define dp[i] = true if the first i characters of s can be segmented. dp[0] = true (empty string).

For each i from 1 to n, I check all j from 0 to i-1: if dp[j] is true AND s[j..i-1] is in the dictionary, then dp[i] = true.

Trace: s = 'leetcode', wordDict = ['leet','code'].
- dp[0] = true
- i=1: j=0, s[0..0]='l' not in dict. dp[1]=false.
- i=2: j=0, 'le' not in dict; j=1, dp[1]=false. dp[2]=false.
- i=3: similarly false.
- i=4: j=0, dp[0]=true AND 'leet' in dict → dp[4]=true!
- i=5,6,7: j checks, none work.
- i=8: j=4, dp[4]=true AND s[4..7]='code' in dict → dp[8]=true!
Return dp[8]=true."

### 4. State complexity before coding
"O(n²) time, O(n) space. I'll also add the wordDict to a HashSet for O(1) word lookups."

### 5. After coding
"Optimization: find the max word length in the dictionary and only check substrings up to that length in the inner loop — avoids checking substrings longer than any word."
