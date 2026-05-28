## Understanding the problem
Given an m×n board of characters and a list of words, find all words from the list that can be formed by sequentially adjacent cells on the board (horizontally or vertically), where no cell may be reused within a single word's path. Return all found words (in any order, no duplicates).

## Brute force
For each word in the word list, run a separate DFS/backtracking search on the board starting from every cell. This is O(W * M * 4 * 3^(L-1)) where W = number of words, M = board cells, L = max word length. For large W and L, this is too slow because common prefixes are recomputed for every word independently.

## Key insight
Build a Trie from all words so that prefix sharing is free. When DFS explores a path on the board, it simultaneously descends the Trie. If the current prefix is not in the Trie, we prune the entire branch immediately. When we reach a Trie node marked as a word end, we record the word. This way, common prefixes like "app" in "apple", "apply", "application" are searched only once on the board.

## Optimal approach — Trie + DFS backtracking (trie + backtracking)
- Pattern: trie + backtracking.
- Build phase: insert all words into a Trie.
- Search phase: for each cell (r, c), run `dfs(r, c, trieRoot)`.
- `dfs(r, c, node)`:
  1. Boundary / visited / no Trie child: return.
  2. Move to child: `next = node.children[board[r][c] - 'a']`. If null, return.
  3. Mark visited: `board[r][c] = '#'` (in-place, avoids a separate visited array).
  4. If `next.word != null`: add to results, then set `next.word = null` to deduplicate.
  5. Recurse to all 4 neighbors with `next`.
  6. Unmark: `board[r][c] = original character` (backtrack).
  7. Optimization: if `next` has no children left, prune it from the Trie (`node.children[idx] = null`).
- Invariant: when entering `dfs(r, c, node)`, `node` is the Trie node corresponding to the prefix formed by the path from the DFS starting cell to (r, c)'s parent.

## Why this works
The Trie allows O(1) prefix existence checks rather than O(W * L) per board cell. Marking cells with '#' prevents reuse within a single path. Removing found words from the Trie and pruning empty Trie branches on the way back up keeps the Trie small and avoids duplicate results.

## Complexity
- Time: O(M * 4 * 3^(L-1)) where M = board cells (m * n) and L = max word length. Each DFS path branches to at most 3 new directions (we never go back the way we came), and paths can be at most L steps long.
- Space: O(W * L) for the Trie, plus O(L) for the DFS recursion stack.
