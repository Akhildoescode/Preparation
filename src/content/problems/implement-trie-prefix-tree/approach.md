## Understanding the problem
Implement a Trie (prefix tree) that supports three operations in O(m) time where m is the word length: `insert(word)`, `search(word)` (exact match), and `startsWith(prefix)` (any word starting with this prefix exists).

## Brute force
Store words in a HashSet. `insert` and `search` are O(m). `startsWith` requires scanning all stored words for the prefix — O(total characters), which is O(n×m) in the worst case. The Trie gives O(m) for all three.

## Key insight
A Trie stores characters as edges in a tree. Each node has up to 26 children (for lowercase letters) and a boolean `isEnd`. `insert` traces the path char by char, creating new nodes where needed. `search` and `startsWith` both trace the path — `search` also checks `isEnd` at the final node.

## Optimal approach
**TrieNode:** `TrieNode[] children = new TrieNode[26]; boolean isEnd;`

**insert(word):** Start at root. For each char `c`: if `children[c - 'a']` is null, create a new TrieNode. Move to `children[c - 'a']`. After all chars, set `isEnd = true`.

**search(word):** Traverse character by character. If any step has a null child, return false. After all chars, return `current.isEnd`.

**startsWith(prefix):** Traverse character by character. If any step has a null child, return false. After all chars, return true (we don't check `isEnd` — any existing path counts).

The difference between `search` and `startsWith` is just the final check: `isEnd` vs. `true`.

## Why this works
Shared prefixes share nodes — "apple" and "application" share the "appl" path. Each word insertion is O(m) regardless of how many words already exist. The `isEnd` flag distinguishes words from prefixes — "app" and "apple" can coexist because "app" sets `isEnd = true` at its last node, while "apple" continues further.

## Complexity
- Time: O(m) for all three operations where m is the length of the word/prefix.
- Space: O(sum of all word lengths × 26) — 26 child pointers per node. In practice, much less due to sharing.
