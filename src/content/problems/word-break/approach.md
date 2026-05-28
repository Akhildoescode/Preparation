## Understanding the problem
Given a string s and a dictionary of words (wordDict), determine if s can be segmented into a sequence of one or more dictionary words. A word can be reused multiple times. The challenge is that there are exponential ways to try segmentations, but DP identifies overlapping subproblems.

## Brute force
Recursively try every way to split s: at each position i, try all prefixes s[0..i] and check if they're in the dictionary, then recurse on s[i..]. Exponential time O(2^n) in the worst case due to overlapping subproblems.

## Key insight
Let `dp[i]` = true if the prefix s[0..i-1] (length i) can be segmented into dictionary words. For each position j from 0 to i-1: if `dp[j]` is true (prefix of length j is valid) and `s[j..i-1]` is in the dictionary, then `dp[i]` is true.

## Optimal approach
1. Create a HashSet from wordDict for O(1) lookups.
2. `dp[0] = true` (empty prefix is always valid — the "do nothing" base case).
3. For i from 1 to n:
   - For j from 0 to i-1:
     - If `dp[j]` is true AND `s.substring(j, i)` is in the set: `dp[i] = true; break`.
4. Return `dp[n]`.

**Optimization:** Only check substrings whose length is <= max word length in the dictionary — reduces inner loop iterations.

## Why this works
`dp[j]` represents "the first j characters can be validly decomposed." If dp[j] is true and s[j..i-1] is a word, then the first i characters can also be validly decomposed: the first j characters (from dp[j]) plus this word. The base case dp[0]=true ensures single-word prefixes work. The answer dp[n] checks whether the entire string can be decomposed.

## Complexity
- Time: O(n²) — n outer iterations, up to n inner iterations each, plus O(n) per substring creation; O(n³) naive, O(n²) with max-word-length optimization
- Space: O(n) for the dp array plus O(total length of wordDict words) for the HashSet
