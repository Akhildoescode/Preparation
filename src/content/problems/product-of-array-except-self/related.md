## Same pattern, different problem
- **Subarray Sum Equals K (#560):** Uses prefix sums (additive) the same way this problem uses prefix products (multiplicative). Build the prefix array in one pass, derive answers in the second.
- **Trapping Rain Water (#42):** Also decomposes the answer at position i into a LEFT contribution and a RIGHT contribution (max height on each side). Two-pass prefix/suffix arrays (or two-pointer equivalent) solve it.
- **Longest Increasing Subsequence (#300):** Prefix-style DP where the answer at position i depends on all previously computed answers to the left.

## When this pattern applies
Use **prefix/suffix decomposition** when `output[i]` depends on information from both the left side and the right side of index i, and computing that information for all positions simultaneously would require O(n²) work. The trick is to precompute prefix values in one left-to-right pass, then incorporate suffix values in a right-to-left pass — two O(n) passes instead of one O(n²) loop. The space optimization (collapsing the suffix array into a running variable) applies whenever you consume suffix values from right to left and don't need them again.
