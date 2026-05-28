## Understanding the problem

You have `numCourses` courses numbered 0 to numCourses-1 and a list of prerequisite pairs where `[a, b]` means you must take course `b` before course `a`. Return true if it is possible to finish all courses, or false if a circular dependency makes it impossible.

## Brute force

For each course, try to follow the prerequisite chain and detect if you ever come back to a course you've already seen on this chain. This unstructured DFS would revisit many nodes repeatedly — O(V * (V + E)) in the worst case. We can do it in a single O(V + E) pass.

## Key insight

"Can you finish all courses?" is equivalent to "does the directed prerequisite graph have no cycle?" A cycle means course A requires B, B requires A (possibly transitively) — impossible. Detect a cycle using DFS with three states: 0 = unvisited, 1 = currently being visited (on the current DFS path), 2 = fully visited (safe). If we ever reach a node in state 1 during DFS, we found a back edge — there is a cycle.

## Optimal approach

Pattern: **topo\_sort + graph\_dfs (cycle detection)**.

1. Build an adjacency list from the prerequisites.
2. Create a `state` array of size `numCourses`, all initialized to 0.
3. For each course `i`, if `state[i] == 0`, call `hasCycle(i)`.
4. `hasCycle(node)`:
   - Set `state[node] = 1` (currently visiting).
   - For each neighbor (course that requires this one): if `state[neighbor] == 1`, return true (cycle found). If `state[neighbor] == 0`, recurse — if recursion returns true, propagate true.
   - Set `state[node] = 2` (fully visited, safe).
   - Return false.
5. If any `hasCycle` call returns true, return false. Otherwise return true.

## Why this works

State 1 marks the current DFS path. Reaching a state-1 node means there's a path back to an ancestor in the current traversal — a back edge — which is the definition of a cycle in a directed graph. State 2 ensures we never redo work for fully explored subgraphs, giving O(V + E) total work across all DFS calls.

## Complexity
- Time: O(V + E) because each node transitions from 0 → 1 → 2 exactly once, and each edge is examined once.
- Space: O(V + E) because the adjacency list stores all edges and the recursion stack is at most O(V) deep.
