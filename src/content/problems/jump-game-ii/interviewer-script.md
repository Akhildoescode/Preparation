## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- The problem guarantees the last index is always reachable?
- nums[i] is the maximum jump length — I can jump fewer steps, correct?
- Should I return the minimum number of jumps, not the jumps themselves?"

### 2. State the brute force (90 seconds)
"DP: dp[i] = minimum jumps to reach index i. For each reachable i, update all indices i+1 to i+nums[i]. O(n²). The greedy approach does this in O(n) by scanning each 'level' of reachability."

### 3. Walk through the optimal approach (3 minutes)
"Think of it as BFS levels. Level 0 = {index 0}. Level 1 = all indices reachable from level 0 in one jump. Level 2 = all new indices reachable from level 1 in one more jump, etc.

I track `curEnd` (the farthest index in the current level) and `farthest` (the farthest reachable from this level). When i == curEnd, make a jump and advance curEnd to farthest.

Trace: nums = [2, 3, 1, 1, 4].
- jumps=0, curEnd=0, farthest=0.
- i=0: farthest=max(0,2)=2. i==curEnd? Yes → jumps=1, curEnd=2.
- i=1: farthest=max(2,4)=4. i==curEnd? No.
- i=2: farthest=max(4,3)=4. i==curEnd? Yes → jumps=2, curEnd=4.
- i=3 and i=4: loop ends at i=n-2=3.
At i=3: farthest=max(4,4)=4. i==curEnd? No (3 ≠ 4). Loop ends at i=n-2=3. Return jumps=2.
Verify: [2,3,1,1,4] — jump to index 1 (nums[1]=3), jump to index 4. 2 jumps. Correct."

### 4. State complexity before coding
"O(n) time, O(1) space. Elegant greedy."

### 5. After coding
"The loop runs up to index n-2 (not n-1) because we don't need to jump from the last index — we only need to *reach* it."
