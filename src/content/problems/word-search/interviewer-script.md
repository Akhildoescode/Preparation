## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can a cell be used more than once in the same path? No — each cell at most once.
- Is adjacency horizontal and vertical only, not diagonal?
- Should I return true/false, or the actual path coordinates?"

### 2. State the brute force (90 seconds)
"For each cell as a potential starting point, I run DFS trying to match the word character by character. I mark cells visited to prevent reuse and unmark them on backtrack. This is already the correct approach — there's no way to avoid exploring candidate paths."

### 3. Walk through the optimal approach (3 minutes)
"My DFS does three things: check if the current cell matches the expected character; if it's the last character and it matches, return true; otherwise, mark the cell visited (by overwriting it with '#'), recurse on all 4 neighbors, then restore the cell.

The sentinel overwrite is the key trick — it prevents revisiting without needing a separate m×n boolean matrix. I restore on backtrack so other outer-loop starting points see the original grid.

Example: grid=[['A','B','C'],['S','F','C'],['A','D','E']], word='ABCCED'.
- Start at (0,0)='A'. Mark '#'. Try right (0,1)='B'. Mark '#'. Try right (0,2)='C'. Mark '#'. Try down (1,2)='C'. Mark '#'. Try down (2,2)='E'. Mark '#'. Try left (2,1)='D' — last char. Return true!"

### 4. State complexity before coding
"O(m·n·4^L) time, O(L) recursion space. I'll start coding."

### 5. After coding
"I'll add an early optimization: if the word is longer than m*n total cells, immediately return false. Also I can verify correct backtracking by checking that after the function returns, the grid is unchanged."
