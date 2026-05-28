## Understanding the problem

Given a linked list where each node has a `next` pointer and a `random` pointer (which can point to any node in the list or null), produce a deep copy. Every node in the copy must be a newly allocated node; no pointer in the copy should reference any node from the original list.

## Brute force

On the first pass, copy node values and wire `next` pointers. On the second pass, re-traverse the original list to reconstruct each `random` pointer by counting steps to the target node, then traverse the copy the same number of steps. This is O(n²) time because each random pointer requires a fresh traversal to find its target.

## Key insight

If we maintain a mapping from each original node to its clone, we can resolve any `next` or `random` pointer in O(1): `clone = map.get(originalNode)`. Two passes suffice — one to create all clone nodes, one to wire all pointers.

## Optimal approach

**Pattern: HashMap (original → clone) + two-pass pointer wiring**

**Pass 1 — Create all clone nodes:**
- Iterate through the original list.
- For each node, allocate a new node with the same `val` and store `map.put(node, new Node(node.val))`.
- Do not wire pointers yet.

**Pass 2 — Wire next and random pointers:**
- Iterate through the original list again.
- For each original node: `clone.next = map.get(node.next)` and `clone.random = map.get(node.random)`.
- `map.get(null)` returns `null`, so null random/next pointers are handled automatically.

**Invariant:** After Pass 1, every node in the original list has a corresponding entry in the map. In Pass 2, every pointer lookup is guaranteed to hit.

## Why this works

All clone nodes are created before any pointer is wired, so forward random pointers (pointing to nodes not yet processed in a single pass) are resolved correctly — the target clone already exists in the map. `HashMap.get(null)` returning `null` handles null pointers without any conditional.

## Complexity
- Time: O(n) because each pass visits every node exactly once and each map operation is O(1) amortized
- Space: O(n) because the HashMap stores one entry per node in the original list
