## Cases to mention to the interviewer

- **No prerequisites:** `numCourses = 4, prerequisites = []` → any valid ordering. Return `[0,1,2,3]` or any permutation. Every node has in-degree 0, all start in the queue, BFS processes all.
- **Single course:** `numCourses = 1, prerequisites = []` → return `[0]`. Queue starts with `{0}`, one dequeue, done.
- **Linear chain:** `[0←1←2←3]` (course 0 requires 1, 1 requires 2, 2 requires 3). In-degrees: 0→1, 1→1, 2→1, 3→0. BFS starts with 3, then 2, then 1, then 0. Result: `[3,2,1,0]`. ✓
- **Direct cycle:** `prerequisites = [[0,1],[1,0]]`. Both nodes gain in-degree 1, neither starts in the queue. BFS produces 0 results. Return `[]`.
- **Self-loop:** `prerequisites = [[0,0]]`. Course 0 requires itself. In-degree of 0 = 1, never reaches queue. Return `[]`.
- **Disconnected graph:** Some courses have no dependencies on or from other courses. Those with in-degree 0 join the initial queue, processed first. All reachable nodes are processed. If some component has a cycle, its nodes are never processed — caught by the count check.
- **Multiple valid orderings:** BFS may process queue in any order (it's a queue, not priority queue). Different orderings are all valid — LeetCode accepts any correct topological order.
- **Maximum graph (2000 courses, 5000 prerequisites):** Adjacency list + in-degree array is O(V + E) = O(7000). Efficient enough.
- **Count check:** `if (order.size() != numCourses) return new int[0]` — the crucial cycle detection. If a cycle exists, those nodes' in-degrees never reach 0, so they're never queued, and the final count is less than numCourses.
