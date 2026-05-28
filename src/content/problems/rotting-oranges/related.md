## Same pattern, different problem
- **Walls and Gates:** Also multi-source BFS from all gates simultaneously, filling each empty room with its distance to the nearest gate — structurally identical to rotting oranges.
- **Number of Islands:** Single-source BFS/DFS from each unvisited land cell — the grid traversal mechanics are the same, but here we count components rather than measure distance.
- **Pacific Atlantic Water Flow:** Multi-source BFS/DFS from ocean borders — same "start from multiple sources at once" idea, but tracking reachability rather than distance.
- **Word Ladder:** Single-source BFS on an implicit graph, counting levels as transformation steps — the level-counting technique is the same as here.

## When this pattern applies
The signal for multi-source BFS is "simultaneous spread from multiple starting points" — when the problem says things like "every minute," "at the same time," or "in parallel." If you would otherwise run BFS once per source and take the minimum, collapsing all sources into a single BFS is the optimization. The key invariant is that each node is processed at exactly one level equal to its distance from the nearest source. Look for grid problems with spreading phenomena (fire, water, infection) or distance-to-nearest-X queries.
