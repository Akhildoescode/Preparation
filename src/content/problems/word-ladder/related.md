## Same pattern, different problem
- **Rotting Oranges:** BFS level-counting to find minimum time — the same "count BFS levels = answer" technique, just on a grid rather than a word graph.
- **Walls and Gates:** BFS spreading from source nodes, checking a set for valid next steps — same structure of removing visited nodes to prevent revisiting.
- **Alien Dictionary:** Build a directed graph from word ordering constraints, then topological sort — also processes a list of strings to derive graph edges, related in problem setup.
- **Clone Graph:** BFS/DFS over a graph with a visited set — the implicit-graph BFS structure is the same; Word Ladder's wordSet removal mirrors Clone Graph's HashMap visited check.

## When this pattern applies
Use implicit-graph BFS (generating neighbors on the fly rather than pre-building edges) whenever the graph would be too expensive to build explicitly but each node's neighbors can be enumerated cheaply. The signal is a problem asking for shortest transformation sequence or minimum steps between two "states" where adjacent states differ by a small, enumerable change (one letter, one move, one swap). If the state space is a set of strings/configurations and you can enumerate all states reachable in one step, BFS on the implicit graph solves it in O(states * branching_factor * state_comparison_cost).
