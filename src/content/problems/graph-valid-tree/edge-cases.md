## Cases to mention to the interviewer

- **n = 1, edges = []:** edges.length = 0 = n-1 = 0. No edges to process. Return true. A single node is a valid tree.
- **n = 2, edges = [[0,1]]:** One edge connecting two nodes. edges.length = 1 = n-1. Union (0,1): different roots → union, no cycle. Return true.
- **Too many edges:** edges.length > n-1 immediately fails the first check. A connected graph with more than n-1 edges must have at least one cycle.
- **Too few edges:** edges.length < n-1 immediately fails. Not enough edges to connect all nodes.
- **Correct edge count but cycle present:** e.g., n=4, edges=[[0,1],[1,2],[2,0]]: edges.length = 3 = n-1 = 3. But edge (2,0): find(2)=0, find(0)=0 → same root → cycle → return false. (This is a 3-node cycle leaving node 3 disconnected.)
- **Duplicate edges:** e.g., n=3, edges=[[0,1],[0,1]]: edges.length = 2 ≠ n-1 = 2... wait, n=3 so n-1=2. Then edge (0,1) twice: second (0,1): roots are the same after first union → cycle detected → return false.
- **Self-loop:** e.g., edge [0,0]: find(0) == find(0) → same root → return false. Self-loops immediately disqualify a tree.
