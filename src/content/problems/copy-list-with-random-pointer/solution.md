## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public Node copyRandomList(Node head) {
        // map from each original node to its deep-copy clone
        var map = new java.util.HashMap<Node, Node>();

        // ── Pass 1: create all clone nodes ────────────────────────────────
        var curr = head;
        while (curr != null) {
            map.put(curr, new Node(curr.val));
            curr = curr.next;
        }

        // ── Pass 2: wire next and random pointers ─────────────────────────
        curr = head;
        while (curr != null) {
            // map.get(null) returns null, so both handle the null case cleanly
            map.get(curr).next   = map.get(curr.next);
            map.get(curr).random = map.get(curr.random);
            curr = curr.next;
        }

        // map.get(null) returns null if head is null
        return map.get(head);
    }
}
```

## Line-by-line notes
- **Two separate passes:** Pass 1 must complete before Pass 2 so that every clone exists before any pointer is wired. A single-pass approach would fail on forward random pointers (target not yet in map).
- **`map.get(curr.next)` and `map.get(curr.random)`:** Because `HashMap.get(null)` returns `null`, no special null-check is needed for terminal `next` pointers or null `random` pointers.
- **`return map.get(head)`:** If `head` is null, `map.get(null)` returns null — the empty-list case is handled without any extra conditional.

## Common bugs to avoid
- Trying to do both passes in one loop — a forward random pointer will point to a key not yet in the map, causing a NullPointerException when you try to set the random field of the clone.
- Using `new Node(curr.val, null, null)` only in some branches and forgetting a constructor variant — check which `Node` constructor the problem provides.
- Returning `map.get(head)` before the second pass wires the pointers — the clones exist but all have null next and null random.
