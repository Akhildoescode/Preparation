## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick checks:
- Only lowercase English letters (a-z)? Or do I need to handle uppercase, digits, special characters?
- `search` is exact match — 'app' doesn't match if only 'apple' was inserted?
- `startsWith` returns true if ANY previously inserted word starts with the prefix?
- What's the expected behavior for inserting the same word twice? (No problem — idempotent.)"

### 2. State the brute force (90 seconds)
"Storing words in a HashSet makes `insert` and `search` O(m), but `startsWith` requires scanning all words — O(total length). The Trie gives O(m) for all three by sharing prefix paths between words."

### 3. Walk through the optimal approach (3 minutes)
"Each TrieNode has an array of 26 children (one per letter) and an `isEnd` boolean. The root is an empty node.

**insert('apple'):** Traverse/create nodes for a→p→p→l→e. Set `isEnd=true` on 'e' node.
**search('apple'):** Traverse a→p→p→l→e. All nodes exist and last node has `isEnd=true` → return true.
**search('app'):** Traverse a→p→p. All exist but `isEnd=false` on last 'p' → return false.
**startsWith('app'):** Traverse a→p→p. All exist → return true (don't check `isEnd`).

The only difference between `search` and `startsWith` is the final check. I'll extract a `traverse` helper to avoid duplicating the traversal."

### 4. State complexity before coding
"O(m) per operation. O(26 × total characters) space. I'll code it."

### 5. After coding
"Test: insert 'app'. search('app')=true (isEnd set). search('apple')=false (node 'e' doesn't exist). startsWith('ap')=true. startsWith('az')=false (no 'z' child of 'a'). ✓"
