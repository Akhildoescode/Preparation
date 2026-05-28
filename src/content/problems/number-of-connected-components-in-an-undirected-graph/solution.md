## Reference solution

**Complexity:** O(n * α(n)) time, O(n) space.

```java
class Solution {
    private int[] parent, rank;

    public int countComponents(int n, int[][] edges) {
        parent = new int[n];
        rank   = new int[n];
        int components = n;

        // Each node is its own component initially
        for (int i = 0; i < n; i++) parent[i] = i;

        for (var edge : edges) {
            int rootU = find(edge[0]);
            int rootV = find(edge[1]);
            // Only union if they belong to different components
            if (rootU != rootV) {
                union(rootU, rootV);
                components--;
            }
        }
        return components;
    }

    // Path compression: flatten tree by pointing directly to root
    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    // Union by rank: attach smaller tree under larger tree's root
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
- **`parent[i] = i` initialization:** Each node starts as its own root — n separate components.
- **`find` with path compression:** Recursively finds the root and sets `parent[x]` directly to the root on the way back up. This flattens the tree so future finds are O(1).
- **`union` with rank:** Attaching smaller trees under larger trees keeps tree height logarithmic. Only increment rank when two equal-rank trees merge (the merged tree grows by one level).
- **`components--` only when roots differ:** An edge between nodes in the same component doesn't reduce the component count. The `rootU != rootV` check ensures we only decrement on actual merges.
- **Fields vs local variables:** Making `parent` and `rank` fields avoids passing them through `find`/`union`. An alternative is a static inner class for the DSU — both are fine in an interview.

## Common bugs to avoid
- Forgetting `parent[x] = find(parent[x])` (path compression) — without it, `find` is O(n) per call in the worst case (degenerate chain).
- Calling `find` after `union` to check if the merge happened — always check before calling `union`, as shown.
- Incrementing `rank` whenever a union happens regardless of rank equality — rank should only increment when two equal-rank roots merge.
- Not initializing `parent[i] = i` — leaving parent as all zeros means every node has parent 0, giving wrong roots immediately.
