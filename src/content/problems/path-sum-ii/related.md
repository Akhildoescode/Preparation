## Same pattern, different problem
- **Subsets:** The canonical backtracking pattern — add an element, recurse, remove it. Path Sum II applies the exact same "add/recurse/remove" structure to a tree instead of an array.
- **Maximum Depth of Binary Tree:** The simplest tree DFS — no backtracking state needed. Useful contrast that shows when you do and don't need backtracking.
- **Binary Tree Maximum Path Sum:** Also involves root-to-leaf or any-node paths, but instead of collecting all paths, it maximizes a single value using post-order aggregation.
- **Word Search II:** The other backtracking problem in this set — applies the same mark/recurse/unmark cycle on a 2D grid instead of a tree.

## When this pattern applies
Use DFS with backtracking on a tree whenever you need to enumerate all root-to-leaf paths meeting a condition. The pattern is: commit → recurse → undo (backtrack). The key insight is that a single mutable list threaded through the recursion is O(h) space rather than O(n * h) if you snapshot (copy) only when you find a valid path. The backtracking step — `list.remove(list.size() - 1)` — is always the last line before the function returns.
