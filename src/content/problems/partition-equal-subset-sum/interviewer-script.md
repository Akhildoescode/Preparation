## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Are all numbers positive? Yes — important since negative numbers would change the approach.
- Can numbers be repeated in the array?
- What's the constraint on array length and values? n <= 200, nums[i] <= 100 — so max sum is 20,000 and target <= 10,000. The DP table is manageable."

### 2. State the brute force (90 seconds)
"Check all 2^n subsets for a sum equal to totalSum/2. O(2^n). With n=200, completely infeasible. This is a classic 0/1 Knapsack problem solvable in O(n * target) with DP."

### 3. Walk through the optimal approach (3 minutes)
"First check: if totalSum is odd, return false immediately (can't split evenly). Otherwise target = totalSum / 2.

DP: dp[s] = can we pick a subset summing to exactly s? Start with dp[0]=true.

For each number, iterate s from target down to num: dp[s] |= dp[s - num].

Why high to low? To ensure each number is used at most once — if we went low to high, the current number could be 'used twice' by updating dp[s-num] before reaching dp[s].

Trace: nums = [1, 5, 11, 5], sum=22, target=11.
- dp = [T,F,F,F,F,F,F,F,F,F,F,F] (index 0..11)
- num=1: dp[1]=dp[0]=T → [T,T,F,...,F]
- num=5: iterate 11..5: dp[6]=dp[1]=T; dp[5]=dp[0]=T → [T,T,F,F,F,T,T,F,F,F,F,F]
- num=11: dp[11]=dp[0]=T → return true!"

### 4. State complexity before coding
"O(n * target) time, O(target) space. I'll implement the 1-D DP with high-to-low iteration."

### 5. After coding
"Early exit optimization: if dp[target] becomes true during processing, we can return immediately without processing the remaining numbers."
