## Cases to mention to the interviewer

- **All water:** Grid of all '0's. The outer loop never finds a '1'. Return 0. ✓
- **All land:** Grid of all '1's. First '1' found triggers DFS that marks every cell. count=1. ✓
- **Single cell '1':** 1×1 grid with '1'. count=1, DFS has no valid neighbors. ✓
- **Single cell '0':** 1×1 grid with '0'. count=0. ✓
- **1×n or n×1 grid (row or column):** DFS only moves in one direction. Islands are separated wherever '0' appears. Works correctly — bounds checks prevent out-of-bounds.
- **Diagonal land cells:** `[['1','0'],['0','1']]`. Each '1' is isolated (no 4-directional connection). Count=2. DFS from (0,0) only marks (0,0); DFS from (1,1) only marks (1,1). ✓ Diagonals are NOT considered connections.
- **Stack overflow on large all-land grids:** For a 300×300 all-land grid, DFS depth = 90,000. Java's default stack (usually 512KB–1MB) may overflow. Mitigation: use BFS (iterative queue) or increase stack size. Mention this trade-off to the interviewer.
- **Multiple separate islands of different sizes:** Each '1' that hasn't been flooded starts a new island. The DFS correctly bounds each flood to its connected component.
