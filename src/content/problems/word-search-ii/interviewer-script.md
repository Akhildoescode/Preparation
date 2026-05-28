## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the same word appear multiple times in the result? I should return each found word only once, correct?
- Can a single cell be reused within one word's path? I assume no reuse.
- Are all characters lowercase English letters? That lets me use a fixed-size 26-child array in my Trie nodes.
- Can words in the list be duplicates? I'll handle that by deduplicating via the Trie."

### 2. State the brute force (90 seconds)
"The simplest approach would be to run a separate board DFS for each word in the list, checking if that word exists. That gives us O(W * M * 3^L) time, where W is the number of words. For W=10,000 words and a large board this is far too slow. We can do better by processing all words together with a Trie."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that all words share prefixes, and searching for those prefixes one word at a time is wasteful. A Trie lets us check all words simultaneously — one board DFS covers every word that starts with a given prefix. So my approach is:
Step 1 — build a Trie from all words, storing the full word string at the terminal node.
Step 2 — for each board cell, start a DFS using the Trie root.
Step 3 — at each DFS step, look up the current cell's character in the current Trie node's children. If no child exists, prune immediately.
Step 4 — if we reach a Trie node that has a word stored, add it to results and null out the word to prevent duplicates.
Step 5 — mark the cell visited (change to '#'), recurse all 4 neighbors, then restore the cell.

Small example: board = [['o','a'],['e','t']], words = ['eat', 'oat'].
Build Trie: e→a→t (word='eat'), o→a→t (word='oat').
DFS from (0,0)='o': child 'o' exists in Trie. Mark '#'. Recurse to (1,0)='e': no child 'e' under Trie node for 'o'. Recurse to (0,1)='a': child 'a' exists. Mark '#'. Recurse to (1,1)='t': child 't' exists, word='oat'! Add 'oat'. Done with this path."

### 4. State complexity before coding
"Building the Trie is O(W * L). The search is O(M * 4 * 3^L) where M is board cells. Space is O(W * L) for the Trie plus O(L) recursion. Sound good? I'll start coding."

### 5. After coding
"Let me trace through the edge case where no word can be found — every DFS from every cell will fail to match any Trie child after the first step, so results stay empty. For a 1x1 board with a single word of length 1 matching that cell — DFS hits the root, finds the child, finds the word, adds it. Correct. Any concerns about the approach or the code?"
