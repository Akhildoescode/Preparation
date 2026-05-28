## Cases to mention to the interviewer

- **endWord not in wordList:** Return 0 immediately. No valid transformation can end at a word not in the list.
- **beginWord already one step from endWord:** e.g., beginWord='hot', endWord='dot', wordList=['dot']. Queue=[hot], level increments to 2, first substitution of 'hot' finds 'dot' = endWord → return 2. Correct.
- **No possible path (word is isolated):** e.g., beginWord='hit', endWord='ccc', wordList=['ccc']. No single-letter changes from 'hit' lead toward 'ccc'. BFS exhausts all reachable words without finding 'ccc' → return 0.
- **beginWord equals endWord:** The problem guarantees they differ, but worth mentioning. If equal, the sequence length would be 1.
- **Single-word wordList containing only endWord:** If beginWord and endWord differ by exactly one letter, return 2. Otherwise return 0. Tests the minimal case.
- **Multiple paths of equal length:** BFS naturally finds the shortest — the first time endWord is generated as a candidate is the minimum-length path. Longer paths would hit the `wordSet.remove` guard and never re-enqueue.
- **Very long word with many shared neighbors:** With word length M=8 and many words differing by one letter, the BFS queue can grow large. Each word is still processed only once due to removal from the set.
