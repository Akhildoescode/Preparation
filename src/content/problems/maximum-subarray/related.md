## Same pattern, different problem
- **Maximum Product Subarray (#152):** Kadane's extended to products. The twist is that two negatives multiply to a positive, so you must track both `maxProduct` and `minProduct` at every position.
- **House Robber (#198):** Also a 1-D DP where you make a binary choice at each step (rob or skip), and the recurrence looks similar: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Same "extend vs. restart" spirit.
- **Jump Game (#55):** Greedy/DP where you track the furthest reachable index — another "what's the best outcome at each position" scan.
- **Best Time to Buy and Sell Stock (#121):** Can be reformulated as Maximum Subarray on the *daily price differences* array, making it an exact application of Kadane's.

## When this pattern applies
Use **Kadane's (running max/min with reset)** whenever the problem asks for the best contiguous subarray of any metric — sum, product, etc. The signal is "contiguous" combined with a value that is additive (or multiplicative) along the subarray and where starting fresh at the current position is sometimes better than continuing. If the metric resets to a neutral value (0 for sums, 1 for products) when extending gets worse, Kadane's applies in O(n) time.
