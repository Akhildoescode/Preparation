## Reference solution

**Complexity:** O(n * α(n)) time, O(n) space.

```java
class Solution {
    private int[] parent, rank;

    public boolean validTree(int n, int[][] edges) {
        // A tree on n nodes has exactly n-1 edges
        if (edges.length != n - 1) return false;

        parent = new int[n];
        rank   = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (var edge : edges) {
            int rootU = find(edge[0]);
            int rootV = find(edge[1]);
            // Cycle detected: both endpoints already in the same component
            if (rootU == rootV) return false;
            union(rootU, rootV);
        }
        // No cycle and exactly n-1 edges → valid tree
        return true;
    }

    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    private void union(int a, int b) {
        if (rank[a] < rank[b]) {
            parent[a] = b;
        } else if (rank[a] > rank[b]) {
            parent[b] = a;
        } else {
            parent[b] = a;
            rank[a]++;
        }
    }
}
```

## Line-by-line notes
- **`edges.length != n - 1` early return:** This single check eliminates graphs with too many edges (definitely has a cycle) or too few edges (definitely disconnected). The math is: a tree on n nodes has exactly n-1 edges.
- **`rootU == rootV` check:** When both endpoints already share a root, adding this edge creates a cycle — the two nodes are already connected via an existing path, and this edge forms a loop.
- **No explicit connectivity check:** Because we already verified edges.length == n-1, and the union-find processes all n-1 edges without finding a cycle, the resulting graph must be connected. A forest with no cycles and exactly n-1 edges on n nodes is always a single spanning tree.
- **Same `find` and `union` as Number of Connected Components:** This Union-Find boilerplate is reusable across all union-find problems. Knowing it cold saves time in interviews.

## Common bugs to avoid
- Checking `edges.length == n` instead of `n - 1` — off by one. A tree on n nodes has n-1 edges, not n.
- Skipping the edge count check and relying solely on union-find — union-find detects cycles but not disconnected forests. A disconnected graph with n-1 edges but two components would pass the cycle check but is not a valid tree.
- Returning false when roots differ (inverting the condition) — we should return false only when roots are the same (cycle), and union when they differ.
