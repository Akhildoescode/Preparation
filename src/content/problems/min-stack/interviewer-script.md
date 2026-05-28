## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Are `pop()` and `top()` guaranteed to be called on a non-empty stack, or do I need to handle those errors?
- Can pushed values be negative or zero, not just positive integers?
- Is the space constraint also O(1), or is O(n) extra space acceptable?"

### 2. State the brute force (90 seconds)
"The simplest approach would be a single stack for values, and for `getMin()` scan the whole stack to find the minimum. That's O(1) for push/pop/top but O(n) for getMin. We can get O(1) for all operations by tracking the running minimum in a second auxiliary stack."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that when we push a value, we already know the new minimum — it's min(new value, current minimum). When we pop, the minimum reverts to what it was before. A parallel min-tracking stack records the minimum at each stack depth, so we can restore it in O(1) on every pop. So my approach is:

On push: push val to main stack, push min(val, current min) to min stack.
On pop: pop from both stacks.
top(): peek main stack.
getMin(): peek min stack.

Let me trace through push(5), push(3), push(7), pop():
- push(5): main=[5], min=[5]. getMin=5.
- push(3): 3<5 → new min=3. main=[5,3], min=[5,3]. getMin=3.
- push(7): 7>3 → new min=3. main=[5,3,7], min=[5,3,3]. getMin=3.
- pop(): remove 7 from main, remove 3 from min. main=[5,3], min=[5,3]. getMin still 3."

### 4. State complexity before coding
"All four operations are O(1). Space is O(n) for the two stacks. Sound good? I'll start coding."

### 5. After coding
"Let me trace through push(-1) when current min is 0: min(-1, 0) = -1, so minStack gets -1. getMin returns -1. Pop: both stacks lose -1, getMin reverts to 0. Correct. Edge case: single element pushed then popped then pushed again — works correctly because minStack mirrors mainStack size. Any concerns about the approach or the code?"
