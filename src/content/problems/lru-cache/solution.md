## Reference solution

**Complexity:** O(1) get and put. O(capacity) space.

```java
class LRUCache {
    // Doubly linked list node
    private record Node(int key, int val, Node[] refs) {
        // refs[0] = prev, refs[1] = next
    }

    // Simpler: plain inner class
    private static class DNode {
        int key, val;
        DNode prev, next;
        DNode(int k, int v) { key = k; val = v; }
    }

    private final int capacity;
    private final Map<Integer, DNode> map = new HashMap<>();
    // Sentinel head (MRU end) and tail (LRU end)
    private final DNode head = new DNode(0, 0);
    private final DNode tail = new DNode(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        var node = map.get(key);
        if (node == null) return -1;
        moveToFront(node);  // accessing counts as a use
        return node.val;
    }

    public void put(int key, int value) {
        var node = map.get(key);
        if (node != null) {
            // Update existing entry and promote to MRU
            node.val = value;
            moveToFront(node);
        } else {
            // Insert new entry at the front
            var newNode = new DNode(key, value);
            map.put(key, newNode);
            addToFront(newNode);
            // Evict LRU if over capacity
            if (map.size() > capacity) {
                var lru = tail.prev;
                detach(lru);
                map.remove(lru.key);
            }
        }
    }

    private void moveToFront(DNode node) {
        detach(node);
        addToFront(node);
    }

    private void detach(DNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToFront(DNode node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}
```

## Line-by-line notes
- **Sentinel head and tail:** By linking head↔tail at construction, `detach` and `addToFront` never need null checks — `node.prev` and `node.next` are always valid (they're the sentinels at the boundaries).
- **`moveToFront = detach + addToFront`:** Both `get` and `put` (on existing keys) call `moveToFront`. The two-step operation is O(1) because DLL node removal and insertion are pointer reassignments.
- **`tail.prev` is the LRU node:** The least recently used is always the node immediately before the tail sentinel. Its key is stored in the node so we can remove it from the map with `map.remove(lru.key)`.
- **`node.val = value` in the update branch:** Don't create a new node when the key already exists — just update the value in place and move to front. Creating a new node would require removing the old one.

## Common bugs to avoid
- **Forgetting to remove the LRU's key from the map:** The DLL eviction alone leaves a stale map entry. Always `map.remove(lru.key)`.
- **Not using sentinel nodes:** Without sentinels, `addToFront` and `removeLast` require null checks for empty-list scenarios, making the code error-prone.
- **Storing only values (not keys) in DLL nodes:** When evicting, you need the key to remove from the HashMap. Store both key and value in the node.
