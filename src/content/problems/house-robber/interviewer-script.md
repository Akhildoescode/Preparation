## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can the amount in each house be negative? I'll assume non-negative — the problem says 'money stashed.'
- Can the array be empty? I'll return 0 if so.
- Is the street linear (not circular)? Circular is a follow-up problem (House Robber II)."

### 2. State the brute force (90 seconds)
"The naive approach: try all 2^n subsets of houses and filter those with no two adjacent houses. This is O(2^n) and completely impractical. The key observation is that the decision for each house only depends on the previous two states — classic 1-D DP."

### 3. Walk through the optimal approach (3 minutes)
"At each house i, I have two choices: rob it or skip it.

If I rob house i: I gain nums[i], but I couldn't have robbed house i-1, so the best from before house i-1 is dp[i-2].
If I skip house i: I keep the best result from houses 0..i-1, which is dp[i-1].

Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).

Trace: nums = [2, 7, 9, 3, 1].
- dp[0] = 2
- dp[1] = max(2, 7) = 7
- dp[2] = max(7, 2+9) = max(7, 11) = 11
- dp[3] = max(11, 7+3) = max(11, 10) = 11
- dp[4] = max(11, 11+1) = max(11, 12) = 12
Answer: 12 (rob houses 0, 2, 4 for 2+9+1=12). Correct!"

### 4. State complexity before coding
"O(n) time, O(1) space with rolling variables. Coding now."

### 5. After coding
"The follow-up — House Robber II — wraps the street into a circle, making the first and last houses adjacent. That requires two passes of this same logic: one excluding the first house, one excluding the last."
