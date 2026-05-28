## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- Can n be 0? If so, there's 1 way to reach the top (do nothing).
- Are the only allowed moves 1-step and 2-step, nothing else?
- Is the expected answer an int, or could it overflow for large n?"

### 2. State the brute force (90 seconds)
"The naive recursive approach: at each step, branch into two choices (take 1 or 2 steps). This builds a binary tree of depth n — O(2^n) time. Many subproblems are recomputed; memoization or bottom-up DP fixes this."

### 3. Walk through the optimal approach (3 minutes)
"The recurrence: to reach step i, you either came from step i-1 (took 1 step) or step i-2 (took 2 steps). So the number of ways to reach i = ways(i-1) + ways(i-2). This is exactly the Fibonacci sequence.

Let me trace n=5:
- dp[0]=1, dp[1]=1
- dp[2] = dp[1]+dp[0] = 1+1 = 2
- dp[3] = dp[2]+dp[1] = 2+1 = 3
- dp[4] = dp[3]+dp[2] = 3+2 = 5
- dp[5] = dp[4]+dp[3] = 5+3 = 8
Answer: 8.

I can optimize to O(1) space by keeping only the last two values."

### 4. State complexity before coding
"O(n) time, O(1) space with the two-variable approach. Simple but important problem — Fibonacci DP is the foundation for many harder DP problems."

### 5. After coding
"Edge case n=1: prev2=1, prev1=1. Loop from i=2 to 1 — never executes. Return prev1=1. Correct (one way: take the single 1-step)."
