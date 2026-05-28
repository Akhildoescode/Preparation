## Same pattern, different problem
- **Find Median from Data Stream (#295):** Two heaps to maintain a running median — the upper half is a min-heap of size n/2, exactly like the "top-k" heap here.
- **Top K Frequent Elements (#347):** Min-heap of size k, keyed by frequency — same "maintain the k best elements" pattern.
- **Merge K Sorted Lists (#23):** Min-heap that tracks the frontier of k lists — another heap-as-priority-container application.
- **Kth Smallest Element in a Sorted Matrix (#378):** Binary search or min-heap on a 2D sorted matrix — the "kth order statistic" problem in a different setting.

## When this pattern applies
Use a **min-heap of size k** when you need the k largest elements from a stream or array. The heap maintains the invariant "these are the k largest elements seen so far" — the top is the smallest of the k largest (= kth largest). This beats O(n log n) full sorting whenever k << n. For the absolute best average time complexity (O(n)), QuickSelect is the tool, but it modifies the input array and has O(n²) worst case without randomization. In interviews, clarify which constraint matters most — time or space.
