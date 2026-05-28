## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I code:
- The array has n elements containing distinct values from [0, n], with exactly one missing?
- Can the missing number be 0 or n (the boundaries)?
- Is O(n) time with O(1) space expected, or is O(n log n) with sorting acceptable?"

### 2. State the brute force (90 seconds)
"I could sort the array and scan for the first gap — O(n log n). Or use a HashSet to check which number in [0..n] is absent — O(n) time but O(n) space. The cleanest O(n) time O(1) space solution uses either the Gauss sum formula or XOR."

### 3. Walk through the optimal approach (3 minutes)
"Math approach: the sum of 0 through n is n*(n+1)/2. Subtract the sum of all array elements. The difference is the missing number.

Example: nums = [3, 0, 1]. n = 3. Expected sum = 3*4/2 = 6. Actual sum = 3+0+1 = 4. Missing = 6 - 4 = 2. Correct!

I'll also describe the XOR approach since it's common in bit-manipulation discussions: XOR all indices 0..n together with all values. Every present number appears as both an index and a value — the pair XORs to 0. The missing number has no matching value, so it remains."

### 4. State complexity before coding
"O(n) time, O(1) space for both approaches. The math approach is slightly simpler to explain; I'll implement it."

### 5. After coding
"Edge cases: missing 0 (array = [1,2,...,n]), expected sum = n*(n+1)/2, actual = n*(n+1)/2 - 0 = n*(n+1)/2 - well actually actual is 1+2+...+n = n*(n+1)/2, so missing = 0. Correct. Missing n (array = [0,1,...,n-1]): expected sum = n*(n+1)/2, actual = 0+1+...+(n-1) = n*(n-1)/2, difference = n. Correct."
