## Same pattern, different problem
- **Graph Valid Tree:** Sibling problem — there, finding `rootU == rootV` means returning false. Here, it means returning the specific edge. Same union-find, different action on cycle detection.
- **Number of Connected Components in an Undirected Graph:** Core union-find with component counting — the `find`/`union` boilerplate is identical.
- **Course Schedule:** Cycle detection on a directed graph — uses DFS with three states instead of union-find (union-find doesn't directly handle directed cycles), but the "is there a cycle?" question is the same.
- **Redundant Connection II (LC 685):** The directed-graph version — one of three possible cases (in-degree 2 or directed cycle). Much harder; requires identifying the candidate edges first and then checking connectivity.

## When this pattern applies
Use this union-find pattern when the problem gives you a list of edges and asks you to identify the edge that creates a cycle, or the edge that should be removed to fix the graph. The signal is a graph described as "a tree plus one extra edge" or "find the edge causing a cycle." The key insight is that cycle creation in an undirected graph always corresponds to a union-find operation where both nodes already share a root. Processing edges in the given order and returning on the first such operation naturally handles the "return the last occurrence" requirement for single-cycle problems.
