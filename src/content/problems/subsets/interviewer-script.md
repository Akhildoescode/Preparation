## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Elements are distinct? (Yes — no deduplication needed.)
- Return all 2ⁿ subsets, including the empty set?
- Order of subsets in the result doesn't matter?
- Order of elements within a subset doesn't matter — [1,2] and [2,1] are the same subset?"

### 2. State the brute force (90 seconds)
"I can build subsets iteratively: start with [[]], then for each element, for each existing subset, create a new subset with the element added. O(n × 2ⁿ). The backtracking approach is equivalent but uses recursion and is the pattern the interviewer wants to see."

### 3. Walk through the optimal approach (3 minutes)
"Backtracking: DFS where at each step I try including and not including each remaining element. I record the current path at every node (not just leaves) since every partial selection is a valid subset.

`backtrack(start, current)`:
- Add copy of `current` to result.
- For i from start to n-1:
  - Add nums[i], recurse with start=i+1, remove nums[i].

The `i+1` ensures we don't re-use elements and don't generate duplicates.

Trace [1,2,3]:
- Start: record []. Add 1: record [1]. Add 2: record [1,2]. Add 3: record [1,2,3]. Back to [1,2]. Back to [1]. Add 3: record [1,3]. Back to []. Add 2: record [2]. Add 3: record [2,3]. Back to []. Add 3: record [3].
Result: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]. 8 subsets for n=3. ✓"

### 4. State complexity before coding
"O(n × 2ⁿ) time, O(n) extra space. I'll code it."

### 5. After coding
"Empty input: n=0. backtrack(0,[]): record []. No loop iterations. Return [[]]. ✓"
