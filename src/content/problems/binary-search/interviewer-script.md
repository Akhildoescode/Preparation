## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Is the array guaranteed to be sorted in ascending order?
- Are there duplicate values? The problem says 'distinct' but I want to confirm.
- Should I return the index, or -1 if not found? And is there only one valid answer?"

### 2. State the brute force (90 seconds)
"The simplest approach is a linear scan — iterate through every element and return the index when we find the target. That's O(n) time and O(1) space. But we're ignoring the fact that the array is sorted, so we can do much better."

### 3. Walk through the optimal approach (3 minutes)
"Since the array is sorted, I can use binary search. The key observation is: if I look at the middle element and it's less than the target, then the target must be somewhere to the right — I can completely ignore the left half. If the middle element is greater, I ignore the right half. This halves my search space each step.

My approach:
- Maintain lo and hi pointers, both inclusive.
- At each step, compute mid as lo plus (hi minus lo) divided by 2 — the extra care avoids integer overflow.
- Compare nums[mid] to target, narrow accordingly.

Let me trace through: nums = [-1, 0, 3, 5, 9, 12], target = 9.
- lo=0, hi=5, mid=2. nums[2]=3 < 9, so lo=3.
- lo=3, hi=5, mid=4. nums[4]=9 == 9. Return 4."

### 4. State complexity before coding
"This is O(log n) time since we halve the range each step, and O(1) space since we only use two pointers. Sound good? I'll start coding."

### 5. After coding
"Let me trace with a missing target: nums = [-1, 0, 3, 5, 9, 12], target = 2.
- lo=0, hi=5, mid=2. nums[2]=3 > 2, hi=1.
- lo=0, hi=1, mid=0. nums[0]=-1 < 2, lo=1.
- lo=1, hi=1, mid=1. nums[1]=0 < 2, lo=2.
- lo=2 > hi=1. Loop exits, return -1. Correct."
