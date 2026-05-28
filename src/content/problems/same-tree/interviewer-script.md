## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Two empty trees — both null — should return true, correct?
- Are node values integers, and do I need to worry about integer overflow in comparisons? I'll use != for value comparison which is safe for any int.
- Should I treat this purely recursively, or is an iterative BFS solution also acceptable?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to serialize each tree to a string with preorder traversal using null markers, then compare the strings. That gives us O(n) time and O(n) space. But we can do better on code simplicity — a direct recursive comparison uses O(h) space and is cleaner."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that two trees are identical if and only if their roots have the same value AND their left subtrees are identical AND their right subtrees are identical. So my approach is:
Step 1 — if both nodes are null, return true.
Step 2 — if exactly one is null, return false.
Step 3 — if their values differ, return false.
Step 4 — recurse on left subtrees AND right subtrees, return the conjunction.

Let me trace through an example. Say p is:
```
  1
 / \
2   3
```
and q is the same structure. isSameTree(1,1): values match, so recurse. isSameTree(2,2): values match, recurse. isSameTree(null,null) on both children of 2 → true. Back up, 2 side returns true. isSameTree(3,3): same, returns true. Root returns true && true = true."

### 4. State complexity before coding
"This will be O(n) time and O(h) space for the call stack. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with p = [1,2] and q = [1,null,2] — a structural mismatch. At the root both have value 1. Then isSameTree(p.left=2, q.left=null): one is null, one isn't, return false immediately. Root returns false. Correct. Any concerns about the approach or the code?"
