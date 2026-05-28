## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- The robot can only move right or down, correct? No diagonal, no moving backward.
- Are there any obstacles? This version (LC #62) has none — LC #63 adds obstacles.
- What are the constraints on m and n? They're up to 100, so a 100×100 DP table is fine."

### 2. State the brute force (90 seconds)
"Recursively enumerate all paths: at each cell, move right or down and count completions. O(2^(m+n)) without memoization. With memoization (top-down DP), it becomes O(m·n). I'll implement the bottom-up version."

### 3. Walk through the optimal approach (3 minutes)
"dp[i][j] = number of distinct paths to reach (i,j). The only ways to arrive are from above or from the left:
dp[i][j] = dp[i-1][j] + dp[i][j-1].

Base cases: the entire top row is 1 (only one way to reach any cell in row 0 — go straight right). The entire left column is 1 (only go straight down).

Trace for m=3, n=3:
```
1  1  1
1  2  3
1  3  6
```
dp[1][1]=1+1=2, dp[1][2]=2+1=3, dp[2][1]=1+2=3, dp[2][2]=3+3=6.
Answer: 6.

I can also note: the answer is C(m+n-2, m-1) = C(4,2) = 6. Combinatorics gives a O(1) formula."

### 4. State complexity before coding
"O(m·n) time, O(n) space with the rolling row optimization. Coding now."

### 5. After coding
"I can mention: for m=1 or n=1, there's exactly 1 path (straight right or straight down). The initialization of dp to all 1s handles this case."
