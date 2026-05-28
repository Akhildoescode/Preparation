## Same pattern, different problem
- **Increasing Triplet Subsequence (LC #334):** A special case of LIS with k=3 — can be solved with O(1) space tracking two minimums.
- **Russian Doll Envelopes (LC #354):** 2-D LIS — sort by width ascending, then apply LIS on heights. Requires careful sort order (height descending for equal widths) to prevent using two envelopes of the same width.
- **Coin Change (LC #322):** 1-D DP where the recurrence looks at all prior states — same "scan all j < i" structure as the O(n²) LIS DP.
- **Binary Search (LC #704):** The O(n log n) optimization applies binary search to the `tails` list — understanding binary search variants (lower bound, upper bound) is essential.

## When this pattern applies
LIS is the archetype of "find the longest valid subsequence" problems. When elements must be chosen in order with some monotone property (strictly/non-strictly increasing, decreasing, within a range), model dp[i] as "best ending at index i" and scan all j < i. This gives O(n²). Apply the patience sorting optimization (binary search on a maintained list of minimums) when strictly increasing and you need O(n log n). Recognize the patience sort: "maintain the minimum possible tail for each possible subsequence length."
