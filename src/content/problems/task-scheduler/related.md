## Same pattern, different problem
- **Kth Largest Element in an Array:** Uses a min-heap of size k — same idea of using a heap to efficiently track top-frequency or top-value elements without full sorting.
- **Top K Frequent Elements:** Count frequencies with a map, then use a heap or bucket sort to extract the top k — the frequency-counting step is identical to Task Scheduler.
- **Find Median from Data Stream:** Uses two heaps (max-heap and min-heap) to maintain order; demonstrates how heap invariants can answer aggregate queries in O(log n) per operation.
- **Reorganize String:** Closely related — place characters such that no two adjacent are the same. The same "most frequent task anchors the structure" insight applies; if maxCount > (n+1)/2 it's impossible.

## When this pattern applies
Look for problems that ask for minimum time or slots given a constraint that the same item cannot appear within a window of size `n`. The signal is a cooldown or separation requirement combined with a frequency count. Whenever the answer depends only on the most frequent element(s) and the gap size — not on the specific ordering of other elements — the mathematical frame formula replaces simulation entirely.
