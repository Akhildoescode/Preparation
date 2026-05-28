## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start coding:
- Can the array contain all negative numbers? If so, the answer is the largest single element, right?
- Should I return just the sum, or also the subarray indices?
- Is the array non-empty? (LeetCode guarantees n ≥ 1, but worth confirming.)
- Any constraints on element size that could cause overflow? With 32-bit ints and n up to 10⁵, the max sum is about 10⁹ which fits in an int, but I'll use long if you prefer."

### 2. State the brute force (90 seconds)
"A brute force would try every start and end index. For each start i, scan right and track the running sum, updating a global max. That's O(n²) time. With n up to 10⁵ that's 10¹⁰ operations — too slow."

### 3. Walk through the optimal approach (3 minutes)
"The key insight is Kadane's algorithm. At each position, I ask: does the current running sum help or hurt? If the sum going into position i is negative, I should just start fresh at i, because a negative prefix can only reduce the total. So:

```
currentSum = max(nums[i], currentSum + nums[i])
maxSum = max(maxSum, currentSum)
```

Let me trace `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:
- Start: current = -2, max = -2
- 1: current = max(1, -1) = 1, max = 1
- -3: current = max(-3, -2) = -2, max = 1
- 4: current = max(4, 2) = 4, max = 4
- -1: current = 3, max = 4
- 2: current = 5, max = 5
- 1: current = 6, max = 6 ← answer

The best subarray is [4, -1, 2, 1] with sum 6."

### 4. State complexity before coding
"O(n) time, O(1) space — one pass, two variables. Very clean. I'll code it up."

### 5. After coding
"Edge case: all negatives, say `[-5, -3, -1]`. Let's trace:
- current = -5, max = -5
- current = max(-3, -8) = -3, max = -3
- current = max(-1, -4) = -1, max = -1
Answer: -1 — the least negative single element. Correct.

Any questions about the code?"
