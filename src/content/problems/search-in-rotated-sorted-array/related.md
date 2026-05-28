## Pattern: Binary Search with Modified Conditions

Search in Rotated Sorted Array shows that binary search works on any structure where you can determine, for a given midpoint, which half is guaranteed sorted — even without a fully sorted array. The key insight: a rotated sorted array always has at least one fully sorted half.

## Related problems

- **Search in Rotated Sorted Array II (LC 81):** Array may contain duplicates. When `nums[lo] == nums[mid]`, can't determine which half is sorted → increment lo (shrink cautiously). Worst case O(n) but average O(log n).
- **Find Minimum in Rotated Sorted Array (LC 153):** Find the pivot (minimum). Binary search: if `nums[mid] > nums[hi]`, minimum is in right half; else in left. No target comparison needed.
- **Find Minimum in Rotated Sorted Array II (LC 154):** With duplicates — same as LC 153 but decrement hi when `nums[mid] == nums[hi]`.
- **Koko Eating Bananas (LC 875):** Binary search on answer space (not an array index). Same template, different condition.
- **Peak Index in Mountain Array (LC 852):** Modified binary search — compare mid to neighbors to determine if on ascending or descending slope.
- **Search a 2D Matrix (LC 74):** Binary search on flattened row-major index. Convert `mid` to `(mid/n, mid%n)` for matrix access.
- **Time Based Key-Value Store (LC 981):** Binary search on timestamps stored per key — upper-bound variant.

## The universal binary search decision rule

At each step, identify a property that divides the search space:
1. One half has a known structure (sorted, all < pivot, etc.).
2. Check if target falls in that half.
3. If yes, search there; if no, search the other half.

For rotated arrays, "which half is sorted?" = the decision key. For answer-space search, "is this value feasible?" = the key. For peak finding, "am I on the ascending slope?" = the key.
