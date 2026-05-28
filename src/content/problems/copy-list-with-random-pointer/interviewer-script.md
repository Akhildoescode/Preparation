## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the random pointer point to the node itself, or only to other nodes?
- Can the list be empty — should I handle a null head?
- Is the O(n) space for the HashMap acceptable, or is there a follow-up for O(1) space?"

### 2. State the brute force (90 seconds)
"The brute force would be to copy next pointers in one pass, then for each random pointer, walk the original list to find where it points and walk the copy the same number of steps. That's O(n²) time because each random pointer requires a full traversal. We can do O(n) time with a HashMap."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that if I first create all the clone nodes and store them in a HashMap keyed by the original node, then any pointer — next or random — can be resolved in O(1) by looking up the target in the map. So my approach is:

Step 1: Walk the original list, create a clone for each node, store in map.
Step 2: Walk the original list again, set clone.next = map.get(original.next) and clone.random = map.get(original.random).
Step 3: Return map.get(head).

Let me trace through `A(random→C) → B(random→A) → C(random→null)`:
- Pass 1: map = {A: A', B: B', C: C'}.
- Pass 2:
  - A: A'.next = map.get(B) = B', A'.random = map.get(C) = C'.
  - B: B'.next = map.get(C) = C', B'.random = map.get(A) = A'.
  - C: C'.next = map.get(null) = null, C'.random = null.
- Result: A'→B'→C' with correct random pointers."

### 4. State complexity before coding
"This will be O(n) time and O(n) space for the HashMap. Sound good? I'll start coding."

### 5. After coding
"Let me trace through null head — we return map.get(null) which is null. Correct. Edge case: single node pointing to itself — clone is created, clone.next = null, clone.random = map.get(self) = clone itself. Correctly self-referential clone. Any concerns about the approach or the code?"
