## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can I choose any format for the serialized string, as long as I can deserialize it back?
- Node values can be negative? How large?
- Should the serialization be compact, or is readability/simplicity preferred for this interview?"

### 2. State the brute force (90 seconds)
"BFS level-order serialization is one approach — store values row by row, with nulls. It's verbose (lots of nulls for unbalanced trees) but works. I prefer preorder DFS — it's simpler to implement and equally correct."

### 3. Walk through the optimal approach (3 minutes)
"I'll use preorder DFS for serialization. At each node: append `node.val + ','`. At null: append `'null,'`. This gives a unique, unambiguous string.

For deserialization: split on `','` into a token queue. Read tokens in preorder: if token is `'null'`, return null; otherwise create a node with that value, build its left subtree (consuming the next tokens), build its right subtree.

Serialize `[1, 2, 3, null, null, 4, 5]`:
- Preorder: 1 → 2 → null → null → 3 → 4 → null → null → 5 → null → null
- String: `'1,2,null,null,3,4,null,null,5,null,null,'`

Deserialize: consume tokens in same order to rebuild exactly the same tree. The preorder sequence with explicit nulls is a unique encoding."

### 4. State complexity before coding
"O(n) time and space for both operations. I'll code serialize and deserialize now."

### 5. After coding
"Test with null tree: serialize returns 'null,'. Deserialize: first token is 'null', return null. ✓ Single node [5]: serialize = '5,null,null,'. Deserialize: create node(5), left=null, right=null. ✓"
