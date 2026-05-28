## Same pattern, different problem
- **Word Search (LC #79):** Backtracking with a grid adjacency constraint instead of a palindrome constraint.
- **Combination Sum (LC #39):** Backtracking with a numeric sum constraint — uses `start` index similarly to prevent duplicate combinations.
- **Restore IP Addresses (LC #93):** String partitioning backtracking — split into 4 valid IP octets with different validity (numeric range) instead of palindrome.
- **Word Break (LC #139):** DP on string segmentation — finds if *any* valid partition exists (not all partitions); similar "is this prefix valid?" check.

## When this pattern applies
String-partitioning backtracking applies when you need all ways to split a string into parts satisfying some property. The signal: "partition s such that each part satisfies X." The pattern: at each position, try all extensions; if the current segment satisfies X, recurse on the remainder; backtrack. Precomputing a validity table (palindrome DP, word set lookup) speeds up repeated segment checks from O(n) to O(1). Compare to Word Break (LC #139) which uses DP to find whether *one* partition exists — backtracking is for finding *all* of them.
