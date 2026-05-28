## Same pattern, different problem
- **Rotting Oranges:** Multi-source BFS from all rotten cells simultaneously — same "seed from multiple borders/sources and propagate" structure, just measuring distance instead of reachability.
- **Walls and Gates:** Multi-source BFS from all gates — identical mechanics to the ocean-border seeding here, computing distance instead of a boolean reachability flag.
- **Number of Islands:** DFS/BFS flood-fill from each unvisited land cell — same grid DFS structure but counting components rather than propagating from fixed borders.
- **Surrounded Regions:** Reverse DFS from borders to find cells that should NOT be flipped — the "reverse from border" insight is exactly the same as this problem's key trick.

## When this pattern applies
The signal for "reverse DFS/BFS from borders" is when the forward simulation has too many starting points (every cell) but there are only a few distinguished boundary cells. Any problem that asks "which cells can reach a fixed set of destinations?" can be inverted to "which destinations are reachable from that fixed set?" Look for grid problems with ocean/boundary/exit reachability, or any flow/path problem where the destinations are on the perimeter. The reversal reduces an O(n^2) problem to O(n).
