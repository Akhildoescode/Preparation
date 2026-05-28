## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the list be empty or have just one or two nodes — should I handle those as no-ops?
- Am I correct that I can only change pointers, not node values?
- For an odd-length list like 5 nodes, is the middle node (index 2) assigned to the first half?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to collect all nodes into an ArrayList, then use two indices left=0 and right=n-1 moving inward, rewiring next pointers. That's O(n) time but O(n) space. We can do it in O(1) space with three linked-list operations."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the reordered list is just the first half interleaved with the reversed second half. So my approach has three steps:

Step 1: Find the midpoint with slow/fast pointers, then cut the list there.
Step 2: Reverse the second half in-place.
Step 3: Merge the two halves by alternating nodes.

Let me trace through `1 → 2 → 3 → 4 → 5`:
- Step 1: slow/fast finds mid at node 3. Cut: first half = 1→2→3, second = 4→5.
- Step 2: Reverse second half → 5→4.
- Step 3: Merge:
  - Take 1 from first, 5 from second: 1→5, first=2, second=4.
  - Take 2 from first, 4 from second: 1→5→2→4, first=3, second=null.
  - second is null, append remaining first (3): 1→5→2→4→3. Done."

### 4. State complexity before coding
"This will be O(n) time and O(1) space — three linear passes and no extra data structures. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `1 → 2` — mid is node 1, second half is just node 2. Reverse: still just 2. Merge: 1→2. Correct. Edge case: single node — fast pointer check prevents any modification, we return immediately. Any concerns about the approach or the code?"
