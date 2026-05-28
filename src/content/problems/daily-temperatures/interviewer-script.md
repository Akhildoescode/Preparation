## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- If no warmer day exists for index i, the output should be 0 — is that right?
- Are temperatures guaranteed to be positive integers, or could they be floating point?
- Can the array be empty?"

### 2. State the brute force (90 seconds)
"The simplest approach would be a nested loop: for each day i, scan forward until I find a warmer day and record the distance. That's O(n²) time and O(1) extra space. We can do O(n) with a monotonic stack."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that when I encounter a warmer temperature, I can immediately resolve every previous unresolved day that was colder. I keep a stack of indices waiting for a warmer day. When temperatures[i] is warmer than the temperature at the top index, I pop it and record i minus that index as the answer. So my approach is:

Step 1: Initialise result array of zeros.
Step 2: For each index i, while the stack top's temperature is less than temperatures[i], pop and record the distance.
Step 3: Push i.
Step 4: Anything left in the stack stays 0.

Let me trace through `[73, 74, 75, 71, 72]`:
- i=0: stack empty, push 0. Stack: [0].
- i=1: 74 > 73 (top=0). Pop 0, result[0] = 1-0 = 1. Stack empty, push 1. Stack: [1].
- i=2: 75 > 74 (top=1). Pop 1, result[1] = 2-1 = 1. Stack empty, push 2. Stack: [2].
- i=3: 71 < 75. Push 3. Stack: [2, 3].
- i=4: 72 > 71 (top=3). Pop 3, result[3] = 4-3 = 1. 72 < 75 (top=2). Push 4. Stack: [2, 4].
- End: indices 2 and 4 remain — result[2]=0, result[4]=0.
- Result: [1, 1, 0, 1, 0]."

### 4. State complexity before coding
"This will be O(n) time and O(n) space. Each index is pushed and popped at most once. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `[90, 80, 70]` — all strictly decreasing. Push 0, 1, 2. Loop ends. Stack: [0, 1, 2]. All stay 0. Correct. Edge case: `[70, 70, 80]` — equal temperatures don't trigger a pop (strict greater-than), so indices 0 and 1 both wait for index 2. result = [2, 1, 0]. Any concerns about the approach or the code?"
