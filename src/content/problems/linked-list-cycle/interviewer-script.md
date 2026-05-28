## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the head be null — is an empty list valid input?
- Should I detect any cycle, or is the cycle always to a specific node like the tail back to head?
- Is there a space constraint? I know of both an O(n) space and an O(1) space approach."

### 2. State the brute force (90 seconds)
"The simplest approach would be to use a HashSet of visited nodes. At each step I check if the current node is already in the set — if yes, there's a cycle; if I hit null, there isn't. That gives us O(n) time and O(n) space. We can do better on space with Floyd's algorithm."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that if there's a cycle, a fast pointer moving at 2 steps per iteration will eventually lap a slow pointer moving at 1 step — they have to meet inside the cycle. If there's no cycle, the fast pointer falls off the end. So my approach is:

Step 1: Start both slow and fast at head.
Step 2: Each iteration, slow moves one step, fast moves two.
Step 3: If slow equals fast, we found the cycle. If fast hits null, no cycle.

Let me trace through `1 → 2 → 3 → 4 → 2` (cycle back to node 2):
- Start: slow=1, fast=1.
- Iter 1: slow=2, fast=3.
- Iter 2: slow=3, fast=2 (fast went 3→4→2).
- Iter 3: slow=4, fast=4. slow == fast → return true."

### 4. State complexity before coding
"This will be O(n) time and O(1) space — no extra data structures, just two pointers. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `1 → 2 → 3 → null` — fast hits null after two iterations, we return false. Edge case: single node pointing to itself — `head.next == head`. Start: slow=1, fast=1. Iter 1: slow=head.next=1, fast=head.next.next=1. slow==fast → return true. Looks correct. Any concerns about the approach or the code?"
