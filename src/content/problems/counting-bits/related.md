## Same pattern, different problem
- **Number of 1 Bits (LC #191):** Computes the Hamming weight of a single number — the `countBits` DP builds on this for all numbers 0..n.
- **Missing Number (LC #268):** Uses XOR or math to find a missing integer — similar "bit properties of integers" domain.
- **Single Number (LC #136):** Uses XOR to cancel paired bits — different bit trick, same manipulation-centric thinking.
- **Maximum Product of Word Lengths (LC #318):** Uses bitmasks to represent character sets; checks if two words share characters via `mask1 & mask2 == 0`.

## When this pattern applies
When a problem requires computing a bit-related property (Hamming weight, parity, set bit count) for all numbers in a range, check if the property of `n` can be expressed in terms of a simpler number (like `n >> 1` or `n & (n-1)`) that was already computed. This DP-on-bits pattern reduces the problem to O(n) with O(1) per number. The signal: "compute X for all integers 0..n" where X is a bitwise property.
