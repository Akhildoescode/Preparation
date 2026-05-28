## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- A path must have at least one node, right? So for all-negative trees, the answer is the largest single node?
- 'Path' means a sequence of nodes connected by edges, no node repeated?
- The path doesn't need to go through the root?"

### 2. State the brute force (90 seconds)
"Brute force: for every pair of nodes, compute the path sum. O(n²) pairs and O(n) per path = O(n³). The O(n) solution uses post-order DFS and updates a global max at each node."

### 3. Walk through the optimal approach (3 minutes)
"Post-order DFS. At each node, I compute the max gain from going into the left subtree and the max gain from going right. I clamp both to 0 if negative — a bad subtree should just be ignored.

The path through the current node (using it as the highest point) = `node.val + leftGain + rightGain`. Update global max with this.

But the value I return upward is only `node.val + max(leftGain, rightGain)` — the parent can only extend the path in one direction, not both.

Trace `[-10, 9, 20, 15, 7]`:
- maxGain(9): 9+0+0=9 as candidate. Return 9.
- maxGain(15): 15. Return 15.
- maxGain(7): 7. Return 7.
- maxGain(20): leftGain=15, rightGain=7. Candidate=20+15+7=42. maxSum=42. Return 20+15=35.
- maxGain(-10): leftGain=9, rightGain=35. Candidate=-10+9+35=34. maxSum stays 42. Return -10+35=25.
Answer: 42."

### 4. State complexity before coding
"O(n) time, O(h) space. I'll code it now."

### 5. After coding
"All negative: `[-3, -1, -2]`. maxGain(-1): candidate=-1. maxGain(-2): candidate=-2. maxGain(-3): leftGain=max(0,-1)=0, rightGain=max(0,-2)=0. Candidate=-3+0+0=-3. maxSum = max(MIN_VALUE, -1, -2, -3) = -1. ✓"
