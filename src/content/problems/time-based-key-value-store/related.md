## Same pattern, different problem
- **Binary Search:** The underlying mechanism — "find rightmost entry ≤ query" is a standard binary search variant.
- **Search in Rotated Sorted Array:** Both problems require adapting the binary search decision logic beyond simple equality.
- **Median of Two Sorted Arrays:** Another problem where binary search is applied to find a position/boundary rather than an exact match.
- **LRU Cache:** Another design problem where choosing the right underlying data structure is the key insight — here a sorted list enables O(log n) get.

## When this pattern applies
Use binary search on sorted lists whenever you need to answer "find the last entry satisfying a monotone predicate" — such as "timestamp ≤ query" or "speed ≤ max feasible." The pattern generalizes to: binary search for a *boundary* rather than an exact match, recording the best valid candidate as you search.
