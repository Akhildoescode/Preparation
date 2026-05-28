## Same pattern, different problem
- **Course Schedule II:** Same cycle detection but now return the actual topological order — extend this solution by appending each node to a list when it reaches state 2.
- **Alien Dictionary:** Derive a directed graph from character ordering constraints in a sorted word list, then topological sort — same cycle detection determines if a valid ordering exists.
- **Graph Valid Tree:** Detect if a graph has no cycle and is connected — uses union-find instead of DFS states, but the cycle concept is identical.
- **Redundant Connection:** Find the edge that creates a cycle — union-find approach, but the "cycle" concept from this problem applies directly.

## When this pattern applies
Use DFS cycle detection with three states whenever a problem maps to "can you order a set of items given dependency constraints?" — the signal phrases are "prerequisites," "dependencies," "must come before," or "ordering." If the answer is just yes/no, this DFS approach suffices. If you need the actual order, extend it to topological sort by collecting nodes as they reach state 2 (in reverse). Kahn's algorithm (BFS in-degree reduction) is an equally valid alternative and may be more intuitive to some interviewers.
