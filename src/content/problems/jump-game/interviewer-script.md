## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- nums[i] represents the *maximum* jump length from index i — I can jump fewer steps, correct?
- Can nums[i] be 0? Yes — 0 means we're stuck at that position unless we can reach a later index another way.
- Is the array guaranteed to be non-empty? What if n=1 (already at the last index)?"

### 2. State the brute force (90 seconds)
"DP approach: dp[i] = true if index i is reachable. Mark all indices from i+1 to i+nums[i] as reachable for each reachable i. O(n²) time. But we can do it in O(n) by just tracking the maximum reachable index."

### 3. Walk through the optimal approach (3 minutes)
"Greedy insight: instead of tracking which indices are reachable, track the *farthest* reachable index — call it maxReach.

At each index i:
- If i > maxReach: we can't reach here, return false.
- Otherwise: maxReach = max(maxReach, i + nums[i]).

Trace: nums = [2, 3, 1, 1, 4].
- i=0: 0 ≤ 0 (maxReach=0). maxReach = max(0, 0+2) = 2.
- i=1: 1 ≤ 2. maxReach = max(2, 1+3) = 4.
- i=2: 2 ≤ 4. maxReach = max(4, 2+1) = 4.
- i=3: 3 ≤ 4. maxReach = max(4, 3+1) = 4.
- i=4: 4 ≤ 4. maxReach = max(4, 4+4) = 8. Loop ends. Return true.

Trace: nums = [3, 2, 1, 0, 4].
- i=0: maxReach=3. i=1: maxReach=3. i=2: maxReach=3. i=3: maxReach=3. i=4: 4 > 3 → return false. Correct — we get stuck at index 3 which has value 0."

### 4. State complexity before coding
"O(n) time, O(1) space. Simple and elegant."

### 5. After coding
"Edge case: n=1 — loop runs once at i=0, maxReach = max(0, nums[0]) ≥ 0, returns true. Single element always reachable since we start there."
