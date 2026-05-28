## Same pattern, different problem
- **Number of 1 Bits (LC #191):** Counts set bits using `n & (n-1)` — different XOR-family trick.
- **Missing Number (LC #268):** XOR all indices 0..n with all array values — paired indices and values cancel, leaving the missing number. Direct extension of this technique.
- **Single Number II (LC #137):** Every element appears three times except one — XOR doesn't work; need bit counting modulo 3.
- **Single Number III (LC #260):** Two elements appear once — find the differing bit between them to split into two groups, then XOR within each group.

## When this pattern applies
XOR's `a ^ a = 0` property applies whenever you need to find an "unpaired" element in a collection where all others are paired. The signal: "all elements appear an even number of times except one (or two)." Extend to Sum of Two Integers (XOR as addition without carry) or Missing Number (XOR indices with values). More generally, XOR is the tool when you need to cancel identical values without storing them — it's the O(1)-space alternative to a frequency hashmap for problems with perfect pairing.
