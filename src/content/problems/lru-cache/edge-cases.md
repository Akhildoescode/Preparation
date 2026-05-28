## Cases to mention to the interviewer

- **Capacity = 1:** Single-slot cache. Every `put` of a new key evicts the current occupant. `get` then `put(new key)` evicts the gotten key. The sentinel approach handles this cleanly: after the new node is added to the front, `tail.prev` is the old node — detach and remove.
- **`put` on existing key:** Must update value AND move to MRU. Not evicting in this case — just updating. If you create a new node for existing keys, you get duplicate entries in the map.
- **`get` makes the element MRU:** Test sequence: put(1), put(2), get(1) (now 1 is MRU), put(3) → should evict 2 (not 1). Verify your `moveToFront` on `get`.
- **`put` on existing key doesn't change size:** Capacity check should be `map.size() > capacity` *after* inserting a *new* key. If the key already existed, no new entry was added, so no eviction needed.
- **All operations on the same key:** put(1,1), put(1,2), get(1) → should return 2. The key exists once in the map; its value was updated.
- **Eviction immediately after capacity reached:** put capacity elements, then put one more. Exactly one eviction occurs — the LRU among the first `capacity` elements.
- **Empty cache get:** get(99) on an empty cache → return -1. Map is empty, `map.get(99)` returns null. Handled by the null check.
