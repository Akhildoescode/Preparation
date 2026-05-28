## Reference solution

**Complexity:** O(V + E) time, O(V + E) space.

```java
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // Build adjacency list and compute in-degrees
        var adj = new ArrayList<List<Integer>>();
        var inDegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (var prereq : prerequisites) {
            int course = prereq[0], pre = prereq[1];
            adj.get(pre).add(course);  // pre → course (pre must come first)
            inDegree[course]++;
        }

        // Initialize queue with all courses that have no prerequisites
        var queue = new ArrayDeque<Integer>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        // Kahn's BFS topological sort
        int[] order = new int[numCourses];
        int idx = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            order[idx++] = course;
            for (int next : adj.get(course)) {
                if (--inDegree[next] == 0) queue.offer(next);
            }
        }

        // If we processed all courses, return the order; otherwise a cycle exists
        return idx == numCourses ? order : new int[]{};
    }
}
```

## Line-by-line notes
- **`adj.get(pre).add(course)`:** The edge direction is `pre → course` (prerequisite points to dependent). When we process `pre`, we decrement the in-degree of `course` — the prerequisite is now satisfied for that course.
- **`inDegree[course]++`:** Each prerequisite adds 1 to the course's in-degree. A course with in-degree 0 has all prerequisites satisfied from the start.
- **`if (--inDegree[next] == 0) queue.offer(next)`:** Decrement and check in a single step. Offer only when in-degree reaches exactly 0 — guarantees each node is enqueued at most once.
- **`idx == numCourses`:** If the BFS processed all courses, no cycle exists. If any courses were skipped (stuck in a cycle — their in-degree never reached 0), `idx < numCourses`.

## Common bugs to avoid
- **Reversing edge direction:** If you build `course → pre` instead of `pre → course`, processing a course would decrement the in-degree of its prerequisites instead of its dependents — wrong.
- **Returning `order` without the cycle check:** Returns a partially filled array for cyclic graphs. Always check `idx == numCourses`.
- **Confusing Course Schedule I (return bool) with II (return order):** This solution builds the actual order array. For CS-I, you'd just return `idx == numCourses`.
