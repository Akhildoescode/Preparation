## Same pattern, different problem
- **Kth Largest Element in an Array (#215):** Single min-heap of size k — simpler version where you only need the kth largest, not the full running median.
- **Sliding Window Median (#480):** Moving median over a window — requires two heaps plus a mechanism to efficiently remove arbitrary elements (use lazy deletion with a map of removed elements).
- **IPO (#502):** Greedy algorithm using two heaps — a max-heap of available project profits and a min-heap of locked projects ordered by capital requirement. Similar "two-heap balance" reasoning.

## When this pattern applies
Use **two heaps (max + min) for running medians** whenever you need the median of a dynamic set where insertions happen frequently. The invariant — lower half in max-heap, upper half in min-heap, sizes differ by at most 1 — is the core insight. The three-step addNum procedure (add to max, move max's top to min, rebalance if needed) ensures both ordering and size invariants are maintained after every insertion. This pattern extends to "running kth-order statistic" (not just median) by allowing one heap to have k-1 more elements than the other.
