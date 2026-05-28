## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- Return any valid ordering — there may be multiple valid topological sorts?
- Return an empty array if no valid order exists (cycle detected)?
- Courses are 0-indexed from 0 to numCourses-1?"

### 2. State the brute force (90 seconds)
"No clean brute force — topological sort is the standard O(V+E) solution for this problem. There are two approaches: Kahn's Algorithm (BFS, in-degree based) and DFS with cycle detection. I'll use Kahn's — it's more intuitive and directly gives the order."

### 3. Walk through the optimal approach (3 minutes)
"Kahn's Algorithm: process courses that have no remaining prerequisites first.

1. Build adjacency list (prerequisite → dependents) and compute in-degree for each course.
2. Enqueue all courses with in-degree 0 (no prerequisites).
3. Process queue: dequeue a course, add to result. For each course that has this as a prerequisite, decrement in-degree. If in-degree reaches 0, enqueue it.
4. If result.size() == numCourses, return result. Else cycle — return [].

Trace: 4 courses, prereqs [[1,0],[2,0],[3,1],[3,2]]:
- In-degrees: {0:0, 1:1, 2:1, 3:2}. Queue: [0].
- Dequeue 0 → result=[0]. Decrement 1→0, 2→0. Queue: [1,2].
- Dequeue 1 → result=[0,1]. Decrement 3→1. Queue: [2].
- Dequeue 2 → result=[0,1,2]. Decrement 3→0. Queue: [3].
- Dequeue 3 → result=[0,1,2,3]. Return [0,1,2,3]. ✓"

### 4. State complexity before coding
"O(V+E) time and space. I'll code it."

### 5. After coding
"Cycle test: [[0,1],[1,0]]. In-degrees: {0:1, 1:1}. Queue empty initially. Result size=0 < numCourses=2. Return []. ✓"
