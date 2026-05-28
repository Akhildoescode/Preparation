## Same pattern, different problem
- **Kth Largest Element in an Array (#215):** Also uses a heap (min-heap of size k) as the core data structure — demonstrates the "use a heap when you need the running extreme efficiently."
- **Find Median from Data Stream (#295):** Two heaps (max and min) to maintain a running median — the same heap manipulation pattern at a higher complexity.
- **Top K Frequent Elements (#347):** Heap-based approach to find the k most frequent elements — another "heap as a priority container" application.
- **Merge Two Sorted Lists (#21):** The base case of Merge K Lists with k=2. Mastering the two-list merge (no heap needed) is a prerequisite.

## When this pattern applies
Use a **min-heap to merge sorted sequences** whenever you have k sorted sources and need to produce a globally sorted output. The heap maintains the "frontier" — the smallest unconsumed element from each source. This generalizes to external merge sort and multi-way merge in database implementations. The time complexity is O(n log k) rather than O(nk) (brute-force pairwise), making it strictly better when k is large. Key signal: "merge k sorted [arrays/lists/sequences]."
