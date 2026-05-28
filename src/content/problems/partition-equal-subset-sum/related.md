## Same pattern, different problem
- **Coin Change (LC #322):** Unbounded knapsack (iterate low-to-high; elements can be reused) vs. 0/1 knapsack here. Same DP table structure, different iteration direction.
- **Target Sum (LC #494):** Count the number of ways to assign +/- to each element to reach a target — can be reduced to a subset sum DP.
- **Last Stone Weight II (LC #1049):** Find the minimum possible result of smashing stones — reduces to finding the subset sum closest to totalSum/2.
- **Word Break (LC #139):** Boolean DP where dp[i] = true if a condition holds — same "fill a boolean table" pattern, different dimension (string length instead of sum).

## When this pattern applies
0/1 Knapsack DP applies when you need to determine if a subset of items (each used at most once) can achieve some target, and items have integer weights. The template: `dp[s] |= dp[s - weight]` iterated high-to-low for each item. Change `|=` to `+= dp[s - weight]` to count the number of ways, or track the minimum cost. The high-to-low iteration is the defining characteristic of 0/1 knapsack — it prevents reusing the same item in a single pass. Unbounded knapsack (reuse allowed) uses low-to-high.
