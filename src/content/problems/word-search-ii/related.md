## Same pattern, different problem
- **Implement Trie (Prefix Tree):** The foundational skill required here — knowing how to insert and search in a Trie is a prerequisite for this problem.
- **Word Search (LC 79 — single word):** The backtracking DFS on the board is identical; this problem just adds the Trie to handle many words simultaneously instead of one.
- **Path Sum II:** Uses the same mark/recurse/unmark backtracking cycle, but on a binary tree rather than a 2D grid.
- **Subsets:** The canonical backtracking template — choose an element, recurse, unchoose. Word Search II applies this template to a 2D grid with a Trie as the pruning oracle.

## When this pattern applies
Use Trie + DFS backtracking whenever you need to search for multiple strings simultaneously in a 2D grid or graph. The Trie is the right data structure whenever a problem involves many strings with shared prefixes and you want prefix-based pruning. The backtracking component handles the "no cell reuse" constraint. A key optimization that separates an acceptable solution from a great one is Trie pruning: after a word is found, remove it from the Trie so subsequent DFS calls prune that branch immediately.
