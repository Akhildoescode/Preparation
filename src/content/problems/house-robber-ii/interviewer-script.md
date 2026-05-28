## What to say, in order

### 1. Clarifying questions (60 seconds)
"Confirming a few things:
- The circular constraint means house 0 and house n-1 are neighbors?
- n ≥ 3 in the constraints, so I don't need to handle n=1 or n=2 specially? Actually, I'll handle n=1 separately just in case.
- Non-negative amounts only?"

### 2. State the brute force (90 seconds)
"Same as House Robber I — try all subsets with the added wrap-around adjacency. O(2^n). The DP approach needs to account for the circular coupling between house 0 and house n-1."

### 3. Walk through the optimal approach (3 minutes)
"The key insight: in a circle, you can't rob both the first and last house. So split into two cases:
- Case 1: Rob from houses 0 to n-2 (exclude the last house).
- Case 2: Rob from houses 1 to n-1 (exclude the first house).

Run the linear House Robber on each range and return the max.

Example: nums = [2, 3, 2].
- Case 1: houses [2, 3] → max(2, 3) = 3.
- Case 2: houses [3, 2] → max(3, 2) = 3.
- Answer: max(3, 3) = 3.

Example: nums = [1, 2, 3, 1].
- Case 1: houses [1,2,3] → dp: 1, 2, max(2,1+3)=4. Result: 4.
- Case 2: houses [2,3,1] → dp: 2, 3, max(3,2+1)=3. Result: 3.
- Answer: max(4, 3) = 4."

### 4. State complexity before coding
"O(n) time, O(1) space — two passes with rolling variables. I'll refactor the linear rob into a helper."

### 5. After coding
"Edge case: n=1 (single house in a circle). Both subranges would be empty without the guard — `if (n == 1) return nums[0]` handles it before the two calls."
