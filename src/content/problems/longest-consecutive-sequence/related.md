## Same pattern, different problem
- **Contains Duplicate (#217):** Same HashSet membership test, simpler goal: just check if any duplicate exists.
- **Two Sum (#1):** Uses a HashMap for O(1) lookup of complements — same "store in set/map, query in O(1)" pattern.
- **Longest Increasing Subsequence (#300):** Related goal (longest sequence) but subsequences don't need to be consecutive — requires DP instead of HashSet.
- **Find All Numbers Disappeared in an Array (#448):** Uses a set of seen values to find what's missing from [1..n] — similar set membership reasoning.

## When this pattern applies
Use **HashSet for O(1) lookup** when the problem asks about relationships between values (not just between indices) and the naive approach involves checking "is this value in the array?" repeatedly. The signal: "find elements that satisfy some numerical adjacency property" combined with an O(n) time requirement. The key insight is always the same: by converting the array to a set first (O(n) prep), each subsequent query is O(1), reducing an O(n²) check to O(n) total.
