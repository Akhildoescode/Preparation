## Same pattern, different problem
- **Number of Islands:** DFS/BFS traversal of a grid graph with a visited-marking step — same "mark before recursing to avoid revisiting" discipline.
- **Course Schedule:** DFS on a directed graph with a state array instead of a HashMap to track visited nodes — same structure of checking before recursing.
- **Word Ladder:** BFS traversal of an implicit graph where nodes are words — the visited set (removing from wordSet) plays the same role as the cloned map.
- **Pacific Atlantic Water Flow:** Multi-source DFS/BFS where a visited boolean grid acts as the "already processed" guard, mirroring the HashMap guard here.

## When this pattern applies
Reach for graph DFS with a HashMap when the problem requires visiting every node and edge of an explicit graph exactly once and the graph may have cycles. The HashMap serves double duty as a visited set and a result cache — any time you need to "build something new for each node while respecting shared references," this pattern fits. The signal in the problem statement is "clone," "copy," or "deep copy" applied to a graph or linked structure with potential cycles.
