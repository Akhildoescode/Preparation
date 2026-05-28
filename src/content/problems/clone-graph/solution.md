## Reference solution

**Complexity:** O(V + E) time, O(V) space.

```java
class Solution {
    // Maps each original node to its deep clone
    private final Map<Node, Node> cloned = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        return dfs(node);
    }

    private Node dfs(Node original) {
        // Already cloned this node — return the existing clone to preserve shared references
        if (cloned.containsKey(original)) return cloned.get(original);

        var copy = new Node(original.val);
        // Insert BEFORE recursing to break cycles
        cloned.put(original, copy);

        for (var neighbor : original.neighbors) {
            copy.neighbors.add(dfs(neighbor));
        }
        return copy;
    }
}
```

## Line-by-line notes
- **cloned map as field:** Avoids passing it through every recursive call. An alternative is to pass it as a parameter — either style is fine in an interview.
- **null check:** Handles the empty graph edge case cleanly at the entry point.
- **`cloned.containsKey` before creating:** This is the cycle-breaking guard. If you create the node first and then check, you risk returning the wrong node.
- **`cloned.put` before recursing into neighbors:** This is the most critical line. If you put it after the neighbor loop, any cycle will cause infinite recursion before the map entry exists.
- **`copy.neighbors.add(dfs(neighbor))`:** The recursive call returns the cloned neighbor, which may be freshly created or fetched from the map — either way it's the canonical clone of that neighbor.

## Common bugs to avoid
- Inserting into the map after the neighbor loop instead of before — this causes a stack overflow on any graph with a cycle.
- Returning `null` for null neighbors without checking — the neighbors list should never contain nulls in a valid graph, but defensive coding doesn't hurt.
- Creating a new `Node` every time a node is visited instead of checking the map first — this produces disconnected duplicate nodes instead of a proper clone.
- Forgetting to handle the `node == null` input case — LeetCode sends null for an empty graph.
