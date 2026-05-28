## Same pattern, different problem

- **Best Time to Buy and Sell Stock II (LeetCode 122):** Instead of one transaction, you can make unlimited transactions — greedily add every upward day-to-day difference, still O(n) but the accumulation logic replaces the single-max tracking.
- **Trapping Rain Water (LeetCode 42):** Also uses the idea of tracking left-max and right-max running values in a single pass; the "best constraint so far" intuition is the same two-pointer greedy skeleton.
- **Two Sum (LeetCode 1):** The complement-lookup pattern is different, but the reduction from O(n²) brute force to O(n) via a single-pass auxiliary structure (hash map vs. running min) is the same conceptual leap.
- **Maximum Subarray (Kadane's Algorithm):** Kadane's "reset to 0 when sum goes negative" is the exact same greedy invariant — never carry forward a choice that only hurts you — just applied to subarray sums instead of price differences.

## When this pattern applies

Reach for a **running-minimum (or running-maximum) single pass** whenever you need the best pairing of an earlier value with a later value and the "best earlier value" can be maintained incrementally. The signal is: brute force is O(n²) pairs, but the optimal left-side choice at position i depends only on the prefix 0..i-1 and can be updated in O(1). If both the left and right constraints affect each other (like in Container With Most Water), you need a shrinking two-pointer instead.
