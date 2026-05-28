## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few quick questions:
- Should I return all solutions or just the count? The problem asks for all board configurations.
- The board representation: each row as a string of 'Q' and '.' characters?
- Constraints say n ≤ 9, so the number of solutions is manageable — n=9 has 352 solutions."

### 2. State the brute force (90 seconds)
"Naively placing n queens in any n² cells gives C(n²,n) candidates to check. For n=8 that's over 4 billion — too slow. Better: one queen per row (since they attack entire rows). Now there are at most n choices per row and n! total, with aggressive pruning reducing this further."

### 3. Walk through the optimal approach (3 minutes)
"I place queens row by row. At each row, I try every column. The validity check is O(1) using three sets:
- `cols`: occupied columns.
- `diag1`: occupied 'row − col' values — every cell on the same main diagonal (↘) has the same row−col.
- `diag2`: occupied 'row + col' values — every cell on the same anti-diagonal (↗) has the same row+col.

If any set contains the candidate's key, that column is under attack — skip it. Otherwise place the queen, update sets, recurse, then undo.

Trace n=4, row=0: try col=0 → add to sets. row=1: col=0 blocked (cols). col=1 blocked (diag1: 0-0=0, 1-1=0 same diagonal). col=2: d1=1-2=-1 free, d2=1+2=3 free — place. row=2: col=0 d2=2+0=2 free, d1=2-0=2 free, col0 in cols — blocked. col=1: d1=2-1=1 free, d2=2+1=3 blocked (diag2 has 3). col=3: all free — place. row=3: col=1: all free — place. row=4 → record solution ['.Q..','...Q','Q...','..Q.']."

### 4. State complexity before coding
"O(n!) time with pruning, O(n) space for sets and recursion, O(n²) for the board. I'll code this up now."

### 5. After coding
"One optimization: I initialize the board with all '.' upfront and only write/restore 'Q' positions, so the board snapshot at row==n is always well-formed."
