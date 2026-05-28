## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the array be empty, or is length guaranteed to be at least 1?
- Are there any constraints on the values — for example, are they bounded integers or arbitrary?
- Should I return true at the first duplicate found, or does it need to be the earliest-occurring one?"

### 2. State the brute force (90 seconds)
"The simplest approach would be a nested loop: for each element at index i, scan every element at index j greater than i and check for equality. That gives us O(n²) time and O(1) space. We can do better because we are re-scanning elements we have already seen."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that a HashSet gives us O(1) membership testing — if I keep a running set of seen values, I can check 'have I seen this before?' in constant time before each insert. So my approach is:

Step 1: Create an empty HashSet.
Step 2: For each number in the array, check if the set already contains it.
Step 3: If yes, return true. If no, insert it and move on.
Step 4: If we finish the loop, return false.

Let me trace through a small example: `[3, 1, 4, 3]`.
- i=0: set is empty, insert 3. Set: {3}.
- i=1: 1 not in set, insert. Set: {3, 1}.
- i=2: 4 not in set, insert. Set: {3, 1, 4}.
- i=3: 3 IS in set → return true immediately."

### 4. State complexity before coding
"This will be O(n) time and O(n) space — one pass through the array, and in the worst case the set holds all n elements. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with `[1, 2, 3]` — the set fills up without a hit, we return false. Now `[1, 1]` — on the second element we hit immediately and return true. Edge case: empty array — the loop never runs, we return false, which is correct because there are no duplicates. Looks correct. Any concerns about the approach or the code?"
