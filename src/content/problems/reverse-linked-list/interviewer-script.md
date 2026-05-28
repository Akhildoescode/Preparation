## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Is this a singly linked list? No `prev` pointers?
- Should I reverse in-place (O(1) extra space), or is creating new nodes acceptable?
- What's the expected output for an empty list? (null) For a single node? (that node, unchanged)
- Should I return the new head?"

### 2. State the brute force (90 seconds)
"I could collect all values into an array and rewrite the nodes in reverse — O(n) space. Or use a stack: push all nodes, then pop and relink — also O(n) space. The in-place approach with three pointers achieves O(1) space."

### 3. Walk through the optimal approach (3 minutes)
"I'll use three pointers: `prev`, `curr`, and `next`. At each step:
1. Save `curr.next` as `next` (because I'm about to overwrite it).
2. Point `curr.next` to `prev` (reverse the link).
3. Advance `prev` to `curr`.
4. Advance `curr` to `next`.

When `curr` is null, the whole list is reversed and `prev` is the new head.

Let me trace `1 → 2 → 3 → null`:
- Init: prev=null, curr=1
- Iter 1: next=2, 1.next=null, prev=1, curr=2. List so far: null ← 1 (2→3→null still intact)
- Iter 2: next=3, 2.next=1, prev=2, curr=3. List so far: null←1←2 (3→null still intact)
- Iter 3: next=null, 3.next=2, prev=3, curr=null. List: null←1←2←3
- Return prev = 3. New list: 3→2→1→null. ✓"

### 4. State complexity before coding
"O(n) time, O(1) space. About 10 lines of code. I'll write it."

### 5. After coding
"Edge cases: null input → while loop doesn't run, return null. Single node 1→null: prev=null,curr=1. Iter: next=null, 1.next=null, prev=1, curr=null. Return 1. ✓ The node's next was already null — no change needed."
