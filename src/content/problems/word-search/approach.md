## Understanding the problem
Given an m×n character grid and a word, determine if the word can be formed by following a path of adjacent cells (horizontally or vertically). Each cell may be used at most once per path. The path can turn freely — it doesn't need to be a straight line.

## Brute force
Try every cell as a starting point and simulate all possible paths using DFS. Mark cells visited to prevent reuse, then unmark on backtrack. There is no asymptotically faster solution — every candidate path must be explored.

## Key insight
At each step we're committing to the next character in the word. We try all 4 neighbors. The "at most once per path" constraint can be enforced by temporarily overwriting the current cell with a sentinel character (e.g., '#') to prevent any descendant call from matching it, then restoring the original character when we backtrack. This avoids a separate O(m·n) visited array.

## Optimal approach
1. Outer loop: try every (r, c) as the starting cell.
2. `dfs(r, c, idx)`:
   - If out of bounds or `grid[r][c] != word[idx]`: return false.
   - If `idx == word.length() - 1`: the last character matched — return true.
   - Save `grid[r][c]`, overwrite with '#'.
   - Recurse on all 4 neighbors for `idx+1`.
   - Restore `grid[r][c]`.
   - Return whether any direction succeeded.

## Why this works
The '#' sentinel prevents any cell on the current path from matching future characters (no real word contains '#'). Restoring on backtrack ensures other starting cells and other DFS branches see the original grid. Short-circuit evaluation with `||` stops exploration as soon as any direction succeeds.

## Complexity
- Time: O(m · n · 4^L) where L is the word length — 4 choices per step, L steps deep, m·n starting points
- Space: O(L) recursion depth (in-place sentinel avoids a separate visited array)
