## Same pattern, different problem
- **Counting Bits (LC #338):** Compute the Hamming weight for all numbers 0..n using DP — `dp[i] = dp[i >> 1] + (i & 1)`.
- **Single Number (LC #136):** Uses XOR bit manipulation to find the unpaired element — different trick, same bit-level thinking.
- **Sum of Two Integers (LC #371):** Simulates addition using XOR (sum without carry) and AND (carry) — builds on understanding of how individual bits interact.
- **Missing Number (LC #268):** Can be solved with XOR — XOR all indices 0..n with all values; pairs cancel.

## When this pattern applies
Use `n & (n-1)` whenever you need to enumerate or count the set bits of an integer efficiently. It's faster than a naive bit-by-bit shift when the number has few set bits (sparse). More generally, bit manipulation applies when the problem involves properties of individual bits: counting them, finding the unique non-paired bit, adding without arithmetic operators, or computing bit counts via DP. The signal: constraints say "32-bit integer" or "bit manipulation," or a linear or quadratic solution would be too slow.
