## Same pattern, different problem
- **Number of Connected Components in an Undirected Graph:** This problem is a direct extension — count how many trees (or components) exist. The same union-find structure with a component counter solves it.
- **Redundant Connection:** Find the specific edge that creates a cycle — when `rootU == rootV` here we return false; in Redundant Connection we return that edge instead.
- **Course Schedule:** Detect a cycle in a directed graph using DFS states — same goal (is there a cycle?) but for directed graphs where union-find doesn't apply directly.
- **Minimum Spanning Tree (Kruskal's):** Uses the same union-find cycle detection to build an MST — add an edge only if it doesn't create a cycle (same `rootU != rootV` check), stop when n-1 edges added.

## When this pattern applies
Graph Valid Tree is a fundamental template problem. Reach for it whenever a problem gives you a set of nodes and edges and asks "is this a valid tree / spanning tree / acyclic connected graph?" The two-condition check (n-1 edges + no cycle) is the mathematical definition of a tree and maps directly to code: one length check plus union-find. Any problem that reduces to "does this graph have a cycle?" on an undirected graph can use this same union-find pattern.
