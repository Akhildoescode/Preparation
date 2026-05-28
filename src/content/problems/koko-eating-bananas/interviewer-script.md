## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Koko must eat from one pile per hour? Can't split her eating across piles in one hour?
- If a pile has fewer bananas than k, she eats the whole pile in 1 hour?
- h ≥ n (number of piles)? Otherwise she can't even eat one pile per hour.
- We want the minimum integer speed — not the fractional minimum?"

### 2. State the brute force (90 seconds)
"Try speeds 1, 2, 3, ... until we find one that works. For each speed k, compute sum of ceil(pile/k) for all piles and check if ≤ h. O(max_pile × n) — too slow for large piles."

### 3. Walk through the optimal approach (3 minutes)
"Binary search on the answer. Speed ranges from 1 to max(piles). The feasibility function is monotone — if speed k works, any higher speed also works. So I binary search for the minimum feasible speed.

`canFinish(k)`: sum ceil(pile/k) for all piles. Return sum ≤ h.

Binary search:
- lo=1, hi=max(piles).
- While lo < hi: mid = lo+(hi-lo)/2. If canFinish(mid): hi=mid. Else: lo=mid+1.
- Return lo.

Trace [3,6,7,11], h=8:
- lo=1,hi=11. mid=6: hours=1+1+2+2=6≤8→hi=6.
- mid=3: 1+2+3+4=10>8→lo=4.
- mid=5: 1+2+2+3=8≤8→hi=5.
- mid=4: 1+2+2+3=8≤8→hi=4. lo=hi=4. Return 4. ✓"

### 4. State complexity before coding
"O(n log(max_pile)) time, O(1) space. I'll code it. For ceil division in Java: (pile + k - 1) / k."

### 5. After coding
"Edge: single pile [10], h=1: must eat at speed 10. lo=1,hi=10. Binary search converges to 10. canFinish(10): ceil(10/10)=1≤1. ✓"
