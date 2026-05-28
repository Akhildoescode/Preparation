## Same pattern, different problem
- **LFU Cache (#460):** Extends LRU with frequency tracking — evict the least *frequently* used (with LRU as a tiebreaker). Requires an additional frequency map and a per-frequency doubly linked list. Same HashMap + DLL foundation, more complex invariant.
- **Design HashMap (#706):** Simpler design problem — just O(1) get/put/remove without eviction. Shows the HashMap fundamentals without the DLL complexity.
- **All O(1) Data Structures (#432):** Design a structure supporting insert, delete, getRandom, getMax all in O(1). Combines HashMap with sorted data structures — demonstrates the HashMap + auxiliary structure pattern at its most complex.
- **Sliding Window Maximum (#239):** Uses a monotonic deque to maintain the maximum of a window — similarly combines O(1) data structures to answer "what's the relevant extreme in this collection."

## When this pattern applies
Use **HashMap + Doubly Linked List** whenever you need both O(1) access-by-key AND O(1) ordering maintenance (promote to front, evict from back). The HashMap eliminates the O(n) search; the DLL eliminates the O(n) shift of array-based ordering. Sentinel head/tail nodes are always worth the 4 lines of setup they save in null-check complexity. Any time a problem combines "access by key" with "ordered by recency/frequency/priority," this pairing is the standard tool.
