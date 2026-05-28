## Cases to mention to the interviewer

- **Minimum valid input (n = 3):** e.g., edges = [[1,2],[1,3],[2,3]]. Only 3 nodes, one cycle. The third edge creates the cycle. The algorithm processes edges in order and returns the cycle-creating one.
- **Redundant edge is the last in input:** The problem says "if multiple, return the last one in input." Since there's exactly one cycle, the cycle-creating edge is unique — it is always the one that completes the cycle, and processing in order returns the first (and only) occurrence.
- **Redundant edge is the first possible cycle edge vs a later one:** Conceptually, no earlier edge can be redundant since the first n-1 edges form the original tree (no cycles by definition). The n-th edge is always the redundant one.
- **Long chain with cycle closing back to start:** e.g., edges = [[1,2],[2,3],[3,4],[4,5],[5,1]]. Each edge extends the path; the last edge (5,1) finds find(5) == find(1) since they're already in the same component. Returns [5,1].
- **Star topology with extra edge:** Node 1 connected to all others, plus one extra edge between two leaves. The leaf-to-leaf edge makes both leaves reachable from node 1 — when processed, their roots are already the same.
- **Self-loop (if allowed):** Edge [u, u]: find(u) == find(u) → returns immediately. Self-loops are always redundant. (The problem likely guarantees no self-loops but worth mentioning.)
