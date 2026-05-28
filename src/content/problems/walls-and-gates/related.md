## Same pattern, different problem
- **Rotting Oranges:** Multi-source BFS from all rotten cells — structurally identical. The difference is counting elapsed time (levels) rather than writing distances, and checking if all fresh oranges were reached.
- **Pacific Atlantic Water Flow:** Multi-source DFS/BFS from ocean borders — same "start from all boundary sources simultaneously" design, measuring reachability instead of distance.
- **Number of Islands:** BFS/DFS flood-fill from unvisited land cells — same grid traversal, but counting connected components rather than computing distances.
- **Word Ladder:** Single-source BFS measuring transformation distance — the level-counting is the same concept, just applied to an implicit word graph rather than a grid.

## When this pattern applies
Multi-source BFS applies whenever you need "minimum distance from any of a set of sources to every other reachable node." The signal is a query like "distance to the nearest X" or "fill each cell with its proximity to any Y." If you find yourself wanting to run BFS once per source and take the minimum, collapse all sources into a single BFS instead — it's both simpler and more efficient. In grid problems, look for cells with a special value (0, gate, rotten) that serve as simultaneous starting points.
