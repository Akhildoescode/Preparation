## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Unlimited supply of each coin denomination?
- Return -1 if the amount can't be made?
- Coin denominations are positive integers?
- Is amount 0 a valid input? (Expected return: 0 coins.)"

### 2. State the brute force (90 seconds)
"Recursively try all coin combinations. Exponential without memoization. With memoization, it's top-down DP — O(amount × |coins|). I'll use bottom-up DP which is cleaner and avoids recursion overhead."

### 3. Walk through the optimal approach (3 minutes)
"Build dp array of size amount+1. dp[0]=0 (0 coins for amount 0). All others initialized to infinity (unreachable). For each amount a from 1 to amount, try each coin c: if a≥c and dp[a-c]≠∞, update dp[a] = min(dp[a], dp[a-c]+1).

The key insight: to make amount a using coin c, we need dp[a-c] coins plus 1 more. Since a-c < a, it's already computed.

Trace coins=[1,2,5], amount=11:
- dp=[0,1,1,2,2,1,2,2,3,3,2,3]
- dp[10]=2 (5+5), dp[11]=dp[10]+1=3 (5+5+1). ✓"

### 4. State complexity before coding
"O(amount × |coins|) time, O(amount) space. I'll code it."

### 5. After coding
"Test amount=0: dp[0]=0, loop doesn't run. Return 0. ✓ Test impossible: coins=[2], amount=3. dp[1]=∞, dp[3]=∞. Return -1. ✓"
