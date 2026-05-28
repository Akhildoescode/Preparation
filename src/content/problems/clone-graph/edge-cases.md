## Cases to mention to the interviewer

- **Null input (empty graph):** Return null immediately. Don't attempt DFS on a null node.
- **Single node with no neighbors:** Create one clone node, no recursion needed. The neighbor list on the clone stays empty.
- **Single node with a self-loop:** node(1) has neighbors = [node(1)]. DFS creates clone(1), inserts into map, then recurses on the self-loop neighbor — hits the map, returns clone(1), adds it to clone(1)'s own neighbor list. The clone correctly has a self-loop.
- **Two nodes mutually connected:** The undirected edge creates a back-reference. DFS on node(1) recurses into node(2), which recurses back into node(1) and hits the map. Without the pre-insertion guard this would be infinite recursion.
- **Long chain (path graph):** A path 1→2→3→...→n has no cycles but DFS recursion depth equals n. For very large n this could cause a stack overflow — worth mentioning that an iterative BFS version avoids this.
- **Dense graph (complete graph):** Every node is a neighbor of every other node. O(V + E) = O(V^2). The map ensures each node is cloned exactly once despite being referenced by many neighbors.
