## Pattern: Topological Sort (Kahn's BFS Algorithm)

Course Schedule II is the reference problem for topological sort. Any time you need to order items with dependencies (and detect circular dependencies), this pattern applies: compute in-degrees, start with zero-in-degree nodes, process BFS, check the count.

## Related problems

- **Course Schedule I (LC 207):** Same graph, just return `true/false` instead of the ordering. Identical code except `return order.size() == numCourses` at the end.
- **Alien Dictionary (LC 269):** Build a character ordering graph from sorted word list, then topological sort. More complex input parsing; same Kahn's algorithm.
- **Sequence Reconstruction (LC 444):** Check if a target sequence is the unique shortest supersequence. Topological sort with uniqueness check: queue should never have more than one element.
- **Minimum Height Trees (LC 310):** "Topological sort from leaves" — iteratively remove degree-1 nodes. Same in-degree peeling concept, different goal.
- **Parallel Courses (LC 1136):** Find minimum semesters to complete all courses. Topological sort level-by-level (BFS layers) — track maximum depth.
- **Find Eventual Safe States (LC 802):** Find all nodes that are not on a cycle. Reverse the graph edges; topological sort from out-degree-0 nodes (safe sinks in original graph).
- **Build Order (CTCI 4.7):** Classic interview variant — same problem with a slightly different framing.

## Kahn's Algorithm template

```java
// 1. Build adjacency list and in-degree array
// 2. Initialize queue with all in-degree-0 nodes
// 3. BFS:
//    a. Dequeue node u
//    b. Add u to result / count it
//    c. For each neighbor v: decrement in-degree; if 0, enqueue v
// 4. If result.size() != numNodes → cycle detected
```

**DFS alternative:** Use three-color marking (WHITE=0, GRAY=1/visiting, BLACK=2/done). If DFS visits a GRAY node, cycle detected. DFS naturally produces reverse topological order — reverse the output.
