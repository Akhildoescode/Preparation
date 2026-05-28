## Understanding the problem
Design a data structure that supports `get(key)` and `put(key, value)` in O(1) time. It holds at most `capacity` entries. When a new entry is added to a full cache, the **least recently used** entry (the one accessed least recently) is evicted. Any `get` or `put` of an existing key counts as a use.

## Brute force
An array or `LinkedList` sorted by recency — O(n) for every operation to find and reorder elements. Unacceptable.

## Key insight
Combine two data structures:
- **HashMap** for O(1) key→node lookup.
- **Doubly linked list (DLL)** for O(1) insertion and removal of any node (given its reference).

The DLL is kept in most-to-least-recently-used order: head = MRU, tail = LRU. The map gives us the node directly — no searching needed. Together, every operation is O(1).

Use **sentinel head and tail nodes** to eliminate null-pointer checks on boundary conditions.

## Optimal approach — HashMap + Doubly Linked List
**Node structure:** `int key, val; Node prev, next;`

**`get(key)`:**
1. If key not in map, return -1.
2. Move the node to the front (just after `head`).
3. Return the node's value.

**`put(key, val)`:**
1. If key exists: update value, move to front.
2. Else: create new node, add to front, insert into map.
3. If `map.size() > capacity`: remove the node just before `tail` (LRU), remove its key from the map.

**`moveToFront(node)`:** Detach from current position, reattach after `head`.
**`removeLast()`:** Remove the node before `tail`.

## Why this works
The DLL's order reflects recency — every access pushes the accessed node to the front. The node before `tail` is always the LRU. The HashMap makes finding a node by key O(1), bypassing the need to search the list. Sentinels simplify boundary conditions: `head.next` is MRU, `tail.prev` is LRU, and both are non-null by construction.

## Complexity
- Time: O(1) for `get` and `put`.
- Space: O(capacity) for the HashMap and DLL combined.
