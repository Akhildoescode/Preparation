## Understanding the problem
Partition a string into substrings such that every substring is a palindrome, and return all such partitions. With n−1 possible cut positions, there are 2^(n-1) candidate partitions. The challenge is pruning non-palindrome prefixes early and recording all valid ones.

## Brute force
Try all 2^(n-1) ways to split the string, then filter partitions where every part is a palindrome. O(2^n · n) time. This is essentially what backtracking does, but backtracking prunes branches as soon as a non-palindrome prefix is detected.

## Key insight
At each position `start`, try extending the current substring one character at a time. Only recurse when the substring `s[start..end-1]` is a palindrome. This prunes any prefix that cannot lead to a valid all-palindrome partition without recursing into it. Using a precomputed DP palindrome table turns each palindrome check from O(n) to O(1).

## Optimal approach
1. Precompute `dp[i][j]` = whether `s[i..j]` is a palindrome:
   - `dp[i][j] = (s[i] == s[j]) && (j - i <= 2 || dp[i+1][j-1])`
   - Fill from shorter to longer substrings (i from n-1 down to 0).
2. `backtrack(start, current)`:
   - If `start == s.length()`: record `new ArrayList<>(current)`.
   - For `end` from `start+1` to `s.length()`:
     - If `dp[start][end-1]`: add `s.substring(start, end)`, recurse with `start=end`, remove last.

## Why this works
The DP table captures all palindrome intervals in O(n²) time and space. During backtracking, only palindromic prefixes are extended further — non-palindrome prefixes are silently skipped. Every leaf (where `start == s.length()`) represents a valid all-palindrome partition because every segment added was confirmed palindromic before recursing.

## Complexity
- Time: O(n · 2^n) — at most 2^(n-1) partitions, each of length up to n to record; DP precomputation is O(n²)
- Space: O(n²) for the DP table plus O(n) recursion depth
