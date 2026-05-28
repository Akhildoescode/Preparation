## Cases to mention to the interviewer

- **No prerequisites:** prerequisites = []. No edges in the graph. All nodes are unvisited and have no neighbors — every DFS call immediately sets state to 2. Return true.
- **Single course:** numCourses = 1, prerequisites = []. Trivially true — one course, no dependencies.
- **Self-loop:** prerequisites = [[0, 0]]. Edge from 0 to 0. DFS(0): state[0]=1, neighbor 0 has state 1 → cycle detected. Return false. LeetCode guarantees no self-loops, but worth mentioning.
- **Simple two-cycle:** prerequisites = [[0,1],[1,0]]. Edges 1→0 and 0→1. DFS from 0 reaches 1, which reaches 0 (state 1) → cycle. Return false.
- **Long chain (no cycle):** 0→1→2→3→...→n. DFS from 0 dives to the end, marks everything state 2, returns true. No cycle.
- **Disconnected graph:** Some courses have no prerequisites and no dependents at all. The outer loop ensures we start DFS from every unvisited node, so isolated nodes are covered.
- **Multiple independent cycles:** Graph has two separate cycles. The outer loop will eventually reach a node in the second cycle even if the first DFS call didn't. Returns false correctly.
