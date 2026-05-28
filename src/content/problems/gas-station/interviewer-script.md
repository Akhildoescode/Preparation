## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- The problem guarantees the answer is unique if it exists?
- We start with an empty tank?
- The circuit is circular — station n-1 connects back to station 0?"

### 2. State the brute force (90 seconds)
"Try each of the n stations as the starting point, simulate the circuit, and check if the tank never drops below zero. O(n²) time. We can do this in O(n) using a greedy one-pass approach."

### 3. Walk through the optimal approach (3 minutes)
"Two key insights:
1. If total gas ≥ total cost, a valid starting point exists.
2. To find it: simulate and track the tank. If the tank goes negative after station i, all starting points from the current candidate up to i are invalid. Reset and try i+1.

Why are 0..i invalid? If starting at k (0 ≤ k ≤ i) doesn't work, starting at any j with k < j ≤ i is even worse — you skip the early gas at stations k..j-1 while still having to pass through the stations that drained you.

Trace: gas=[1,2,3,4,5], cost=[3,4,5,1,2].
- i=0: diff=-2. tank=-2 < 0 → start=1, tank=0.
- i=1: diff=-2. tank=-2 < 0 → start=2, tank=0.
- i=2: diff=-2. tank=-2 < 0 → start=3, tank=0.
- i=3: diff=3. tank=3.
- i=4: diff=3. tank=6.
totalGas=(-2)+(-2)+(-2)+3+3=0 ≥ 0. Return start=3. Correct!"

### 4. State complexity before coding
"O(n) time, O(1) space. One clean pass."

### 5. After coding
"The correctness argument relies on the uniqueness guarantee — there's at most one valid starting point. Our greedy elimination is correct because any station eliminated from the pool cannot be the answer."
