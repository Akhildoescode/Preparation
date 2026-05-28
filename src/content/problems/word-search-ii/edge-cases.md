## Cases to mention to the interviewer

- **Empty input / null root:** If `words` is empty, the Trie is empty, no DFS child is ever found, and we return an empty list. If the board is empty, the outer loops never run.
- **Single cell board:** If the board is 1x1 with character 'a' and words = ["a"], the DFS from (0,0) finds 'a' in the Trie, records "a", and returns ["a"]. If the word is "ab", the Trie has no terminal at 'a', so nothing is found.
- **Duplicate words in the input list:** Two copies of "apple" would create the same Trie path. The terminal node's `.word` would be set to "apple" twice (idempotent). When found, we null it out, so "apple" appears exactly once in results. No extra handling needed.
- **Word longer than board cells:** A word of length 5 on a 2x2 board can never be formed (only 4 cells). The DFS naturally terminates when it runs out of unvisited adjacent cells, never reaching the terminal Trie node.
- **All words share a very long common prefix:** The Trie is efficient here — the shared prefix occupies a single path in the Trie. All words benefit from early pruning if the board doesn't contain the prefix.
- **Same word reachable via multiple paths on the board:** The `next.word = null` deduplication ensures the word is added to results only once, regardless of how many board paths spell it out.
- **Integer overflow risk:** No arithmetic on integers in this problem; overflow is not applicable. However, the DFS recursion depth can reach min(m*n, L) — for a large board and long word, this could hit stack limits. Mention iterative DFS with an explicit stack as a mitigation.
