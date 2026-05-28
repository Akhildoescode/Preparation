## Same pattern, different problem
- **Single Number (LC #136):** XOR all elements — pairs cancel, single remains. The XOR approach to Missing Number generalizes this.
- **Find the Duplicate Number (LC #287):** Instead of a missing number, one is duplicated — Floyd's cycle detection or bit counting.
- **Counting Bits (LC #338):** Computes bit counts for all integers 0..n — different operation but same "range 0..n" setup.
- **First Missing Positive (LC #41):** Find the smallest missing *positive* integer — trickier, requires in-place manipulation since the range is not bounded by n.

## When this pattern applies
When looking for a missing integer in a range, the two fastest approaches are: (1) Gauss sum formula — the "expected minus actual" trick works when the range is exactly [0..n] or [1..n]; (2) XOR — works when pairs cancel. The signal: "n+1 distinct values are possible, n appear, find the missing one." For non-trivial ranges or multiple missing values, consider sorting, bitset, or other approaches. Always check for integer overflow before applying the sum formula.
