## What to say, in order

### 1. Clarifying questions (60 seconds)

"Before I start:
- Are all elements in the input array distinct? The problem says so, but I want to confirm — duplicates would require de-duplication logic.
- Should I return permutations in any specific order, or is any order acceptable?
- Is the input length small enough that O(n · n!) output is expected? For n=8 that's 40,320 permutations."

### 2. State the brute force (90 seconds)

"There's no way to generate all permutations faster than O(n · n!) since that's exactly how many we need to output. The question is how to enumerate them cleanly. The natural approach is backtracking: build a permutation element by element, and at each step try all remaining elements."

### 3. Walk through the optimal approach (3 minutes)

"My approach: maintain a `used` boolean array and a `current` list. At each recursive step, try every unused element, add it, recurse to fill the next position, then remove it and mark it unused again.

Let me trace nums = [1, 2, 3], depth 0:
- Try 1: current=[1]. Depth 1: try 2: current=[1,2]. Depth 2: try 3: current=[1,2,3] → add to results. Backtrack to [1,2]. Depth 2 done. Backtrack to [1]. Depth 1: try 3: current=[1,3]. Depth 2: try 2: [1,3,2] → add. Backtrack.
- Try 2: current=[2]. … and so on.

This systematically produces all 6 permutations."

### 4. State complexity before coding

"O(n · n!) time for generating and copying permutations. O(n) additional space for the recursion stack and `current` list. I'll start coding."

### 5. After coding

"Let me verify an edge case: n=1. Only one permutation — [nums[0]]. The loop tries index 0, adds nums[0], recurse with current.size()==1==nums.length, adds copy, backtracks. Returns [[nums[0]]]. Correct."
