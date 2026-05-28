## Pattern: Binary Search on Answer Space

This problem is the canonical example of searching on the answer (speed) rather than on an index. When you see "minimize/maximize a value subject to a feasibility constraint," binary search on the answer is often the key.

## Related problems

- **Search in Rotated Sorted Array (LC 33):** Binary search on index with a modified condition. Same template — determine which half is sorted, then narrow range.
- **Capacity to Ship Packages Within D Days (LC 1011):** Identical pattern — binary search on ship capacity, `canFinish` checks if packages fit within D days. Nearly the same code.
- **Split Array Largest Sum (LC 410):** Binary search on the maximum subarray sum, feasibility check splits the array into at most m parts. Same "minimize the maximum" template.
- **Find the Smallest Divisor Given a Threshold (LC 1283):** Binary search on divisor value; sum of ceil(num/divisor) ≤ threshold. Near-identical to Koko.
- **Minimum Number of Days to Make m Bouquets (LC 1482):** Binary search on number of days; feasibility checks if m bouquets of k adjacent bloomed flowers exist.
- **Median of Two Sorted Arrays (LC 4):** Advanced binary search — not on answer space but on partition index. Shows binary search versatility.

## When to use Binary Search on Answer Space

1. The answer is a numeric value with a bounded range (lo, hi known or computable).
2. There exists a monotone feasibility function: if speed k works, any speed > k also works.
3. You want the minimum (or maximum) feasible value.

Template:
```
lo = minPossible, hi = maxPossible
while (lo < hi):
    mid = lo + (hi - lo) / 2
    if feasible(mid): hi = mid   // minimize: keep mid, try lower
    else: lo = mid + 1
return lo
```
