## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The returned length includes both the beginWord and endWord — so 'hit' → 'hot' → 'dot' → 'dog' → 'cog' returns 5, not 4?
- beginWord itself does not need to be in the wordList — only intermediate words and endWord must be?
- All words have the same length, and they consist only of lowercase English letters?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to pre-build a graph by comparing every pair of words and adding an edge if they differ by exactly one letter, then BFS from beginWord. Building the graph is O(N^2 * M) — if N is 5000 and M is 10, that's 250 million character comparisons. Instead I'll use an implicit graph where I generate neighbors on the fly."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that from any word I can enumerate all one-letter substitutions — 26 options per character position — and check each against a HashSet in O(1). This gives me the neighbors without pre-building anything.

My approach:
Step 1: Put all wordList words in a HashSet. Check endWord is present.
Step 2: BFS from beginWord with level=1.
Step 3: For each word, try replacing each character with each of 26 letters. If the resulting word is endWord, return level+1. If it's in the set, enqueue it and remove from set.
Step 4: Increment level when the BFS level changes.

Let me trace: beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog'].
- Level 1, queue=[hit]. Try all substitutions of 'hit'. 'hot' is in set → enqueue, remove. Queue=[hot], level=2.
- Level 2, queue=[hot]. Substitutions: 'dot' is in set → enqueue. 'lot' is in set → enqueue. Queue=[dot,lot], level=3.
- Level 3, queue=[dot,lot]. From 'dot': 'dog' in set → enqueue. From 'lot': 'log' in set → enqueue. Queue=[dog,log], level=4.
- Level 4, queue=[dog,log]. From 'dog': 'cog' equals endWord → return 5. Correct."

### 4. State complexity before coding
"This will be O(M^2 * N) time and O(M * N) space. Sound good? I'll start coding."

### 5. After coding
"Edge case: endWord not in wordList — return 0 immediately before even starting BFS. Edge case: beginWord equals endWord — the problem states they differ, but if they were equal I'd return 1. Let me double-check my level counting — I start at 1 and return level+1 when I find endWord, or I can start at 1 and return level when I enqueue endWord. Let me make sure my code is consistent."
