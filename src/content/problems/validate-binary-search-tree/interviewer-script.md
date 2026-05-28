## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Strictly greater/less — equal values are invalid, right?
- Node values can be any integer, including Integer.MIN_VALUE and Integer.MAX_VALUE?
- It's a binary tree (not BST), and I need to determine if it IS a valid BST?"

### 2. State the brute force (90 seconds)
"A common mistake is checking only parent vs. immediate children. That misses violations deeper in the tree. The correct brute force is in-order traversal — a valid BST produces strictly increasing output. O(n) time, O(n) space for the list. I'll show the range-based DFS which is also O(n) but uses O(h) space and is arguably more elegant."

### 3. Walk through the optimal approach (3 minutes)
"I'll pass valid bounds [min, max] down the tree. For the root, the range is (-∞, +∞). When I go left, I tighten the max to the current node's value. When I go right, I tighten the min.

`isValid(node, min, max)`:
- Null → true
- node.val ≤ min or node.val ≥ max → false
- Return isValid(left, min, node.val) && isValid(right, node.val, max)

I'll use `long` for bounds to handle Integer.MIN_VALUE and Integer.MAX_VALUE edge cases — if a node has value Integer.MIN_VALUE, checking `>= Integer.MIN_VALUE` with an int bound would be vacuously true incorrectly.

Trace `[5,1,4,null,null,3,6]`:
- isValid(5, -∞, +∞): 5 OK. Go left with max=5, right with min=5.
- isValid(1, -∞, 5): 1 OK. No children → true.
- isValid(4, 5, +∞): 4 ≤ 5 → false! Return false. ✓"

### 4. State complexity before coding
"O(n) time, O(h) space. Coding now."

### 5. After coding
"Test: single node [1] → isValid(1, Long.MIN_VALUE, Long.MAX_VALUE) → 1 is in range → true. ✓"
