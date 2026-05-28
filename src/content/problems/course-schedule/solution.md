## Reference solution

**Complexity:** O(V + E) time, O(V + E) space.

```java
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list: edge[b] contains a means "b must come before a"
        var adj = new List[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<Integer>();
        for (var pre : prerequisites) {
            adj[pre[1]].add(pre[0]);
        }

        // 0 = unvisited, 1 = on current path, 2 = fully explored (safe)
        var state = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            if (state[i] == 0 && hasCycle(i, adj, state)) return false;
        }
        return true;
    }

    @SuppressWarnings("unchecked")
    private boolean hasCycle(int node, List<Integer>[] adj, int[] state) {
        state[node] = 1;  // mark as currently being visited

        for (int neighbor : (List<Integer>) adj[node]) {
            if (state[neighbor] == 1) return true;   // back edge = cycle
            if (state[neighbor] == 0 && hasCycle(neighbor, adj, state)) return true;
        }

        state[node] = 2;  // fully explored, no cycle through this node
        return false;
    }
}
```

## Line-by-line notes
- **`adj[pre[1]].add(pre[0])`:** Prerequisite pair [a, b] means b → a in the "must-come-before" direction. We add the outgoing edge from b to a.
- **`state[node] = 1` before recursing:** Marks the node as part of the current DFS path. Any back edge to a state-1 node confirms a cycle.
- **`state[neighbor] == 1` check:** Detects a back edge — we've encountered a node currently on our call stack, forming a cycle.
- **`state[neighbor] == 0` guard before recursing:** Skip state-2 nodes entirely — they've already been proven cycle-free.
- **`state[node] = 2` at the end:** Marks the node as permanently safe. Future DFS calls won't re-explore it.
- **Outer loop over all nodes:** Handles disconnected graphs — nodes with no prerequisites and no dependents might never be reached from another starting point.

## Common bugs to avoid
- Getting the edge direction wrong: [a, b] means b is prerequisite of a, so the edge is b → a (not a → b). Drawing the example on paper first helps.
- Only checking `state[neighbor] == 1` without the `state[neighbor] == 0` guard — you'd recurse on state-2 nodes unnecessarily (not wrong, just slow).
- Not setting `state[node] = 2` after the loop — causes already-explored nodes to be re-explored from other starting points, making the algorithm O(V * (V + E)).
- Forgetting the outer loop: only calling DFS from node 0 misses disconnected components.
