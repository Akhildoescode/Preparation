## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can the array contain duplicates? (Yes — they don't extend a consecutive sequence, we just ignore them.)
- Does 'consecutive' mean integers differing by exactly 1?
- The required time complexity is O(n), so sorting is not allowed?
- What's the expected return for an empty array? (0)"

### 2. State the brute force (90 seconds)
"The obvious O(n log n) solution: sort the array, then scan for the longest consecutive run (skip duplicates). But the problem requires O(n), so I'll use a HashSet instead."

### 3. Walk through the optimal approach (3 minutes)
"I put all numbers into a HashSet for O(1) lookup. Then, for each number, I only start counting a sequence from that number if `n-1` is NOT in the set — making `n` the start of its sequence. This prevents re-counting from the middle of a sequence.

If n IS a start, I keep checking n+1, n+2, ... until the next number isn't in the set.

Key argument for O(n): each number is visited at most twice — once as a candidate start (immediately skipped if not a start), once as part of a counting pass from its true start. Total iterations ≤ 2n.

Trace `[100, 4, 200, 1, 3, 2]`:
- n=1: 0 not in set → start. Count: 1,2,3,4 → length=4. ✓
- n=2,3,4: skipped (each has n-1 in set).
- n=100,200: starts, but isolated → length=1 each.
Max length: 4."

### 4. State complexity before coding
"O(n) time (building set + counting), O(n) space for the set. I'll code it."

### 5. After coding
"Test with duplicates: `[1, 2, 2, 3]`. Set = {1,2,3}. n=1: start, count to 3 → length=3. n=2: 1 in set → skip. n=2 again: skipped (iterating set, no duplicates). n=3: 2 in set → skip. Answer: 3. ✓ Duplicates are naturally handled since the HashSet deduplicates them."
