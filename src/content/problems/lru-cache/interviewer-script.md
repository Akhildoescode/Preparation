## What to say, in order

### 1. Clarifying questions (60 seconds)
"Let me confirm:
- Both `get` and `put` must be O(1), not just amortized O(1)?
- A `get` on an existing key counts as a 'use' and moves it to most-recently-used?
- A `put` on an existing key updates the value and counts as a use?
- When evicting, we always evict the one accessed least recently, regardless of frequency?"

### 2. State the brute force (90 seconds)
"With just a HashMap, `get` is O(1) but finding the LRU entry requires scanning all entries — O(capacity). A sorted list or PriorityQueue adds O(log n) per operation. Neither meets the O(1) requirement. The trick is combining a HashMap with a doubly linked list."

### 3. Walk through the optimal approach (3 minutes)
"I'll use a doubly linked list (DLL) to maintain recency order — head is most recent, tail is least recent. I'll also use a HashMap from key → DLL node for O(1) access.

Two sentinel nodes (dummy head and tail) eliminate edge-case null checks.

**get(key):** If in map, move the node to the front (after head), return value. Else return -1.
**put(key, val):** If key exists, update value and move to front. If new, create node, add to front, insert in map. If over capacity, remove the node before tail (LRU), delete from map.

The key helper operations:
- `detach(node)`: node.prev.next = node.next; node.next.prev = node.prev
- `addAfterHead(node)`: insert between head and head.next

Let me trace capacity=2:
- put(1,1): list → [1]. map={1:node1}
- put(2,2): list → [2,1]. map={1,2}
- get(1): move 1 to front → [1,2]. Return 1.
- put(3,3): capacity exceeded, evict tail.prev=2. Remove 2 from map. Insert 3. → [3,1]. map={1,3}."

### 4. State complexity before coding
"O(1) get and put. O(capacity) space. Coding now."

### 5. After coding
"Test capacity=1: put(1,1), put(2,2): evict 1, map={2:node}. get(1) returns -1. get(2) returns 2. ✓"
