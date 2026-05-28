## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Islands are connected 4-directionally (not diagonally)?
- I can modify the input grid, or do I need to leave it unchanged? (If unchanged, I'll use a visited array.)
- The grid can be m×n where m ≠ n?
- Characters are exactly '0' and '1', correct?"

### 2. State the brute force (90 seconds)
"There's no sub-O(n×m) algorithm since we must examine every cell. The question is how to count connected components. DFS flood-fill is clean: every time we find a '1', count it and use DFS to mark its entire island as visited."

### 3. Walk through the optimal approach (3 minutes)
"Outer double loop over all cells. When we see '1': increment count, then DFS from that cell to mark all connected '1's as '0' (visited).

DFS: bounds check, then if cell is not '1' return. Otherwise set to '0' and recurse on all 4 neighbors.

Trace `[['1','1','0'],['0','1','0'],['1','0','1']]`:
- (0,0)='1': count=1. DFS: mark (0,0)'0'. Recurse right→(0,1)'1': mark '0', recurse down→(1,1)'1': mark '0', recurse to neighbors (all 0 or out of bounds). Island 1 done.
- Scan continues... (2,0)='1': count=2. DFS marks (2,0).
- (2,2)='1': count=3. DFS marks (2,2).
Answer: 3.

For very large grids, I'd use BFS (iterative) instead of DFS to avoid stack overflow."

### 4. State complexity before coding
"O(n×m) time and space. DFS space is the call stack, worst case O(n×m) for all-land grid. I'll code DFS but mention BFS as the stack-safe alternative."

### 5. After coding
"All water: no '1' found, count=0. All land: one big island, count=1. ✓"
