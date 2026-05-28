## Reference solution

**Complexity:** O(n * α(n)) time, O(n) space.

```java
class Solution {
    private int[] parent, rank;

    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        // 1-indexed nodes: allocate n+1 slots, ignore index 0
        parent = new int[n + 1];
        rank   = new int[n + 1];
        for (int i = 1; i <= n; i++) parent[i] = i;

        for (var edge : edges) {
            int rootU = find(edge[0]);
            int rootV = find(edge[1]);
            // Same root means both endpoints already connected → this edge is redundant
            if (rootU == rootV) return edge;
            union(rootU, rootV);
        }
        // Problem guarantees a redundant edge exists; this line is unreachable
        return new int[]{};
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
- **`n = edges.length`:** The problem guarantees n nodes and n edges (the original tree had n-1 edges, plus one extra). Using `edges.length` for n is correct.
- **`parent = new int[n + 1]` with 1-indexing:** Nodes are 1 to n. Allocating n+1 avoids an off-by-one and keeps the indexing natural.
- **`if (rootU == rootV) return edge`:** Returning the entire `edge` int array directly is clean — no need to construct a new array.
- **`union` only when roots differ:** We skip the union and return immediately when roots match — no need to try to union a node with itself.
- **Unreachable last line:** The problem guarantees one redundant edge exists, so the loop always returns. The empty array at the end satisfies the compiler but is never executed.

## Common bugs to avoid
- Using 0-indexed parent array when nodes are 1-indexed — causes `parent[0]` to be initialized as a valid node and `parent[n]` to be out of bounds.
- Unioning before checking if roots are equal — would merge the cycle-creating nodes when you should return them instead.
- Returning `new int[]{edge[0], edge[1]}` instead of just `edge` — works but is unnecessarily verbose; returning the array directly is fine.
- Not using path compression — without it, `find` degenerates to O(n) per call on a degenerate chain, making the solution O(n^2).
