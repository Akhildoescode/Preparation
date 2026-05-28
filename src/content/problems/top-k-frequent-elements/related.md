## Same pattern, different problem
- **Kth Largest Element in an Array (LC #215):** Also uses a min-heap of size k — same "maintain top-k" structure, but selecting the kth largest value rather than the k most frequent elements.
- **Find Median from Data Stream (LC #295):** Uses two heaps to maintain the median — a more complex heap design.
- **Sort Characters By Frequency (LC #451):** Count frequencies and sort by them — the full O(n log n) version of this problem without the heap optimization.
- **Meeting Rooms II (LC #253):** Uses a min-heap to track room availability — min-heap for top-k resource management.

## When this pattern applies
Use a min-heap of size k whenever you need the "top-k" elements by some metric without a full sort. The pattern: (1) compute a score for each element, (2) maintain a min-heap of size k (smallest score at root), (3) eject the root whenever the heap exceeds k. After processing all elements, the heap contains the top-k. Time complexity: O(n log k) vs O(n log n) for a full sort — significant savings when k << n.
