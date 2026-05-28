## Cases to mention to the interviewer

- **No gates in the grid:** Queue is empty at the start. BFS never runs. All INF rooms remain INF. Correct — no gate is reachable.
- **No INF rooms (only walls and gates):** BFS runs but finds no INF neighbors to update. Grid unchanged. Correct.
- **Room completely surrounded by walls:** That room stays INF regardless of how many gates exist elsewhere. The wall barrier is never crossed.
- **Gate adjacent to another gate:** One gate's BFS reaches the other gate, but since gates have value 0 (not INF), the neighbor check `== INF` skips them. Gates are never overwritten.
- **Large grid with single gate in the corner:** The gate fans out BFS in an expanding diamond. Rooms diagonally opposite take up to (rows + cols - 2) steps. The algorithm handles this correctly without any special casing.
- **All cells are INF (no walls, no gates):** Queue is empty, BFS doesn't run, all cells remain INF. Correct.
- **Entire grid is one big room with gates at multiple spots:** Multi-source BFS fills every room with the correct minimum distance, which would be incorrect if each gate ran BFS independently and we didn't take minimums carefully.
