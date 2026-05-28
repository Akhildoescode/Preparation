## Reference solution

**Complexity:** O(m * n) time, O(m * n) space.

```java
class Solution {
    public void wallsAndGates(int[][] rooms) {
        int rows = rooms.length, cols = rooms[0].length;
        final int INF = Integer.MAX_VALUE;
        var queue = new ArrayDeque<int[]>();

        // Seed all gates into the queue as simultaneous BFS sources
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (rooms[r][c] == 0) queue.offer(new int[]{r, c});
            }
        }

        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

        while (!queue.isEmpty()) {
            var cell = queue.poll();
            int r = cell[0], c = cell[1];
            for (var dir : dirs) {
                int nr = r + dir[0], nc = c + dir[1];
                // Only update unvisited empty rooms (INF means not yet reached)
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] == INF) {
                    rooms[nr][nc] = rooms[r][c] + 1;  // distance = parent's distance + 1
                    queue.offer(new int[]{nr, nc});
                }
            }
        }
    }
}
```

## Line-by-line notes
- **Seeding all gates first:** This is the multi-source BFS setup. Every gate starts at distance 0 (its own value). Child cells naturally get distance 1, grandchildren get 2, etc.
- **`rooms[nr][nc] == INF` check:** This doubles as both the "is this a fresh empty room?" check and the "not yet visited" check. Walls (-1) and already-set rooms (small positive integers) are both excluded by this single condition.
- **`rooms[nr][nc] = rooms[r][c] + 1`:** We read the distance from the grid itself — no separate distance array needed. Gates are 0, their neighbors become 1, and so on.
- **In-place modification:** The problem asks to modify the grid in place, which is what we're doing. No return value needed.
- **No level-size tracking needed:** Unlike Rotting Oranges, we don't need to count levels separately because we're writing absolute distances (not a count of steps elapsed). The parent cell's value already encodes the correct distance.

## Common bugs to avoid
- Checking `rooms[nr][nc] > 0` instead of `== INF` — this incorrectly skips walls (-1 is not > 0) but also processes rooms already set to small distances.
- Adding gates to the queue with distance 1 instead of 0 — gates are at distance 0; their first neighbor is at distance 1.
- Using a separate visited array: unnecessary since the `== INF` check on the grid itself is sufficient and avoids the extra space.
- Not handling empty grid (rooms.length == 0) — add a null/empty check if the interviewer says the input might be empty.
