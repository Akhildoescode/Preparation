## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few questions before I start:
- Can the same candidate appear multiple times in a combination? Yes — unlimited reuse.
- Are all candidates distinct and positive? And is target positive?
- Is there a specific output order required, or is any order of combinations acceptable?"

### 2. State the brute force (90 seconds)
"I could enumerate all multisets of candidates and filter those summing to target. Without ordering constraints, I'd generate duplicates — [2,3] and [3,2] would appear as distinct entries even though they represent the same combination. Backtracking with a `start` index cleanly avoids this."

### 3. Walk through the optimal approach (3 minutes)
"Key idea: I only consider candidates at index `start` and beyond in each recursive call. This builds every combination in non-decreasing order, so each is generated exactly once.

Since elements can be reused, I recurse with the same `start` index (not `start+1`).

Example: candidates=[2,3,6,7], target=7.
- Pick 2 (start=0): remaining=5. Pick 2 (start=0): remaining=3.
  - Pick 2: remaining=1. 2>1, break.
  - Pick 3: remaining=0 → record [2,2,3].
  - Pick 6: 6>3, break.
- Pick 2, then Pick 3 (start=1): remaining=2. 3>2, break.
- Pick 3 (start=1): remaining=4. Pick 3: remaining=1. 3>1, break. Pick 6: 6>4, break.
- Pick 6 (start=2): remaining=1. 6>1, break.
- Pick 7 (start=3): remaining=0 → record [7].
Result: [[2,2,3],[7]]."

### 4. State complexity before coding
"Exponential time — O(n^(T/M)) — but unavoidable since we output all combinations. O(T/M) recursion depth. Coding now."

### 5. After coding
"Edge cases: single candidate equals target → [[candidate]]. No valid combination → []. Target smaller than smallest candidate → immediate break in loop, return []."
