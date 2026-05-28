## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks before I dive in:
- Can heights be 0? Yes — that means a pit at that position.
- Heights are non-negative integers, correct?
- Are there at least 2 bars? (Water requires walls on both sides.)
- Should I handle all-equal heights, where no water is trapped?"

### 2. State the brute force (90 seconds)
"The brute force: for each position i, scan left to find the tallest bar on the left, scan right to find the tallest on the right, then water at i = max(0, min(maxLeft, maxRight) - height[i]). This is O(n²). A prefix-array optimization stores left/right maxes in O(n) space and reduces to O(n) time, but I can match that with O(1) space using two pointers."

### 3. Walk through the optimal approach (3 minutes)
"The key observation: water at position i is `min(maxLeft, maxRight) - height[i]`. If I know which side has the smaller maximum, I can compute the water for that side *without* knowing the other side's full detail — because the smaller side is the bottleneck.

Two pointers from both ends:
- If height[left] ≤ height[right]: left side is the bottleneck. Update maxLeft, add maxLeft - height[left] to water, advance left++.
- Else: right side is the bottleneck. Update maxRight, add to water, right--.

Let me trace `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`:
- left=0(0), right=11(1): 0≤1, maxL=0, water+=0, left→1
- left=1(1), right=11(1): 1≤1, maxL=1, water+=0, left→2
- left=2(0), right=11(1): 0<1, maxL stays 1, water+=1-0=1, left→3
... after all steps, water = 6."

### 4. State complexity before coding
"O(n) time, O(1) space. Two pointers, four scalar variables. Clean and optimal. Coding now."

### 5. After coding
"Test with flat input `[3, 3, 3]`: left=0, right=2. h[l]=h[r]=3, go left branch: maxL=3, water+=3-3=0, l→1. Now l=1, r=2: h[1]=3≤h[2]=3, maxL=3, water+=0, l→2. l≥r, stop. Total water=0. Correct — no gaps to trap water."
