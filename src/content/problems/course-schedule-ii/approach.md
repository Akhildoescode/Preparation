## Understanding the problem
Given `numCourses` courses (labeled 0 to numCourses-1) and a list of prerequisite pairs `[a, b]` meaning "must take b before a," return a valid order to finish all courses. If a cycle exists (impossible to finish), return an empty array.

## Brute force
Try all permutations of courses and check each for validity. O(n!) — completely infeasible.

## Key insight
This is a **topological sort** problem on a directed graph. A valid ordering exists if and only if the graph is a DAG (no cycles). Use **Kahn's Algorithm**: repeatedly remove nodes with in-degree 0 (no prerequisites remaining), updating neighbors' in-degrees. If all nodes are processed, we have a valid order; if any remain (they're in a cycle), return empty.

## Optimal approach — Kahn's Algorithm (BFS topological sort)
1. Build adjacency list and compute in-degree for each course.
2. Initialize a queue with all courses that have in-degree 0.
3. While queue is not empty:
   - Poll a course, add to result.
   - For each neighbor (course that requires the polled course): decrement in-degree. If in-degree becomes 0, add to queue.
4. If `result.size() == numCourses`, return result. Else return `[]` (cycle detected).

Trace `numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]`:
- Graph: 0→{1,2}, 1→{3}, 2→{3}. In-degrees: 0:0, 1:1, 2:1, 3:2.
- Queue: [0]. Process 0 → result=[0]. Decrement 1→0, 2→0. Queue: [1,2].
- Process 1 → result=[0,1]. Decrement 3→1. Process 2 → result=[0,1,2]. Decrement 3→0. Queue: [3].
- Process 3 → result=[0,1,2,3]. Return [0,1,2,3]. ✓

## Why this works
In-degree 0 means all prerequisites are satisfied. Processing these courses first is safe. After "taking" a course, it's like removing it from the graph — neighbors' in-degrees drop. Any course that never reaches in-degree 0 is part of a cycle (it always has an unsatisfied prerequisite that is itself waiting for this course).

## Complexity
- Time: O(V + E) where V = numCourses, E = |prerequisites|.
- Space: O(V + E) for the adjacency list and in-degree array.
