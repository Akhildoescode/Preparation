## Same pattern, different problem
- **Longest Substring Without Repeating Characters (#3):** The simpler sliding window — constraint is "no repeated characters." The expand-shrink mechanism is identical, but the validity check (all unique) is simpler than frequency matching.
- **Longest Repeating Character Replacement (#424):** Sliding window with an "at most k replacements" constraint. Also uses a frequency map and a validity check per step.
- **Find All Anagrams in a String (#438):** Find all windows of length `|t|` that are anagrams of `t`. Same frequency-map + `formed` tracking, but the window is fixed-size.
- **Permutation in String (#567):** Check if any permutation of `t` appears as a substring of `s` — equivalent to finding any anagram window of size `|t|`. Direct application of this algorithm.

## When this pattern applies
Use **expand-right / shrink-left sliding window with frequency maps** when you need the minimum (or all) windows satisfying a complex frequency constraint. The `formed` variable is the optimization that makes it O(n) — without it, you'd rescan the map at each step, adding a factor of O(m). The pattern applies when: (1) the constraint is about what characters the window must *contain*, not exclude; (2) more characters never violate the constraint (so you only need to shrink once the constraint is met); and (3) both pointers move only forward.
