## Same pattern, different problem
- **Valid Anagram:** Also uses frequency counting / HashSet membership, but on characters instead of integers — same idea of tracking what you have seen.
- **Group Anagrams:** Extends hashing to group strings by a canonical key, requiring a HashMap instead of a HashSet but the same "hash for O(1) lookup" insight.
- **Longest Consecutive Sequence:** Uses a HashSet to answer "is this number's neighbor present?" in O(1), enabling an O(n) solution that would otherwise be O(n log n) with sorting.
- **Two Sum:** Replaces the HashSet with a HashMap to store value → index mappings, but the same single-pass "have I seen the complement?" pattern applies.

## When this pattern applies
Reach for a HashSet whenever you need to answer "have I seen this value before?" in O(1) and you do not need to know where or how many times it appeared. It trades O(n) memory for a reduction in time complexity from O(n²) nested scanning to O(n) single-pass scanning. The pattern generalises to any problem where the key operation is set membership — duplicates, missing numbers, or graph visited tracking.
