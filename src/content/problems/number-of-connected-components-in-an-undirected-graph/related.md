## Same pattern, different problem
- **Graph Valid Tree:** Extends this problem — a valid tree has exactly one component and no cycles. Reuse the same union-find; a cycle is detected when two nodes already share a root.
- **Redundant Connection:** Find the edge that creates a cycle — directly uses the "if same root, this edge is redundant" check from this union-find.
- **Number of Islands:** Count connected components in a grid graph — same problem, different representation. Can use union-find or DFS/BFS flood-fill.
- **Accounts Merge:** Union emails that share an account — each account's emails form a component; union-find merges components with shared emails, exactly this pattern applied to strings.

## When this pattern applies
Union-Find shines when you process edges one at a time (online or streaming) and need to answer "are these two nodes in the same component?" after each edge. The signal is incremental connectivity — "as we add edges, how many components are there?" or "does adding this edge create a cycle?" If all edges are given upfront and you only need the final answer, DFS is equally good and may be more familiar to interviewers. Choose union-find when you need to process edges dynamically or when the problem explicitly asks about the redundant/cycle-creating edge.
