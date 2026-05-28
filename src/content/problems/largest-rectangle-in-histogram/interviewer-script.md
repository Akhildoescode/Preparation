## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can heights contain zeros — a bar of height 0?
- Is the array guaranteed to be non-empty?
- Are heights non-negative integers, and is the answer guaranteed to fit in a 32-bit int, or should I use long?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to check every pair of left and right boundaries, find the minimum height in that range, and compute the area. That's O(n²) time. We can do O(n) with a monotonic increasing stack that finds each bar's left and right extent in a single pass."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the largest rectangle using bar j as the shortest bar extends from the nearest shorter bar on its left to the nearest shorter bar on its right. A monotonic increasing stack tells us both boundaries simultaneously: when a shorter bar triggers a pop of bar j, the current index is j's right boundary, and the new stack top is j's left boundary. So my approach is:

Step 1: Append a sentinel height of 0 to flush remaining bars at the end.
Step 2: Maintain a monotonic increasing stack of indices.
Step 3: When heights[i] < heights[top], pop top as j, compute width = i - newTop - 1 (or i if stack empty), compute area = height × width.
Step 4: Push i.

Let me trace through `[2, 1, 5, 6, 2, 3]` with sentinel 0 appended:
- i=0: push 0. Stack: [0].
- i=1: 1 < 2. Pop 0 (h=2). Stack empty, width=1, area=2×1=2. Push 1. Stack: [1].
- i=2: 5 > 1. Push. Stack: [1,2].
- i=3: 6 > 5. Push. Stack: [1,2,3].
- i=4: 2 < 6. Pop 3 (h=6), width=4-2-1=1, area=6. Pop 2 (h=5), width=4-1-1=2, area=10. 2 > 1. Push 4. Stack: [1,4].
- i=5: 3 > 2. Push. Stack: [1,4,5].
- i=6 (sentinel 0): Pop 5 (h=3), width=6-4-1=1, area=3. Pop 4 (h=2), width=6-1-1=4, area=8. Pop 1 (h=1), stack empty, width=6, area=6.
- Max area = 10."

### 4. State complexity before coding
"This will be O(n) time and O(n) space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `[5]` — push 0, sentinel triggers pop: h=5, stack empty, width=1, area=5. Returns 5. Edge case: `[0, 0]` — bars of height 0. Areas are 0. No rectangle formed. Correct. Any concerns about the approach or the code?"
