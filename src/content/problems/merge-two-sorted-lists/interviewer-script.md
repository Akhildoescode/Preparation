## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can either or both lists be empty — null head?
- Should I reuse existing nodes in-place, or is it acceptable to create new ListNode objects?
- Are the lists non-decreasing — can there be duplicate values within or across lists?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to dump all values into an array, sort it, and rebuild the list. That's O((n+m) log(n+m)) time and O(n+m) space. We can do better because both inputs are already sorted — we just need to merge like in merge sort."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the next node to output is always the smaller of the two current heads. A dummy sentinel node lets me avoid the awkward first-node special case. So my approach is:

Step 1: Create a dummy node and a current pointer.
Step 2: While both lists have nodes, attach the smaller head and advance that pointer.
Step 3: Attach any remaining tail directly.
Step 4: Return dummy.next.

Let me trace through `l1 = 1 → 3 → 5`, `l2 = 2 → 4`:
- Compare 1 vs 2: attach 1, l1=3. Merged: 1.
- Compare 3 vs 2: attach 2, l2=4. Merged: 1→2.
- Compare 3 vs 4: attach 3, l1=5. Merged: 1→2→3.
- Compare 5 vs 4: attach 4, l2=null. Merged: 1→2→3→4.
- l2 exhausted, attach l1 remainder (5). Final: 1→2→3→4→5."

### 4. State complexity before coding
"This will be O(n + m) time and O(1) space — we reuse existing nodes and only allocate the one dummy sentinel. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `l1 = null`, `l2 = 1 → 2` — the while loop never runs, we attach l2 as the remainder, return dummy.next which is node 1. Correct. Edge case: both null — we attach null remainder, return dummy.next which is null. Correct. Any concerns about the approach or the code?"
