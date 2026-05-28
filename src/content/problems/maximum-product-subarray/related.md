## Same pattern, different problem
- **Maximum Subarray (LC #53):** Kadane's algorithm — tracks only the maximum sum ending at each position (no need for min since sums don't have sign-flip behavior).
- **House Robber (LC #198):** Also tracks the best value at each step, but with an "adjacency" constraint rather than sign-flip.
- **Best Time to Buy and Sell Stock (LC #121):** Another O(n) greedy scan where you track a running minimum (buy price) and compute a running maximum (profit).
- **Partition Equal Subset Sum (LC #416):** DP where the "state" is more complex (a set of achievable sums) rather than just two scalars.

## When this pattern applies
When computing a running aggregate (sum, product) over subarrays and the aggregate can behave non-monotonically due to the operation's properties (products and negatives; sums and negatives for Kadane), track multiple running values. The product case requires tracking both max and min because multiplication by a negative flips their roles. Signal: "find maximum/minimum product of a subarray" where negative numbers are possible. Template: at each step, the new max/min is one of {element alone, prev_max × element, prev_min × element}.
