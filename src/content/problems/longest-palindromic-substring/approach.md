## Understanding the problem
Given a string, find the longest substring that is a palindrome (reads the same forwards and backwards). Note: this asks for a contiguous substring (not subsequence). A single character is always a palindrome.

## Brute force
Check all O(n²) substrings for palindrome-ness (O(n) each). O(n³) total. We can do better.

## Key insight (expand-around-center)
Every palindrome has a center: a single character (odd-length) or a pair of identical characters (even-length). Expand outward from each possible center while the characters on both sides match. There are 2n-1 possible centers (n single chars + n-1 pairs).

This gives O(n²) time and O(1) space — better than the DP approach in terms of space.

## Optimal approach (expand-around-center)
```
result = "", lo = 0, hi = 0
for i from 0 to n-1:
    len1 = expand(s, i, i)     // odd-length: center at i
    len2 = expand(s, i, i+1)   // even-length: center between i and i+1
    len = max(len1, len2)
    if len > hi - lo + 1:      // found a longer palindrome
        lo = i - (len - 1) / 2
        hi = i + len / 2
return s.substring(lo, hi + 1)
```

`expand(s, left, right)`: while `left >= 0 && right < n && s[left] == s[right]`, expand. Return `right - left - 1` (length).

**Alternative (DP):** `dp[i][j]` = true if s[i..j] is a palindrome. `dp[i][j] = (s[i]==s[j]) && (j-i<=2 || dp[i+1][j-1])`. Fill from shorter to longer substrings.

## Why this works
Every palindrome is uniquely identified by its center (or center pair). Expanding outward from each center explores all palindromes that have that center. Since palindromes are symmetric, we only ever move outward when both edges match. The 2n-1 centers cover all possible palindromes.

## Complexity
- Time: O(n²) — 2n-1 centers, each expanding up to n/2 times
- Space: O(1) for expand-around-center; O(n²) for the DP approach
- Note: Manacher's algorithm achieves O(n) time but is rarely asked in interviews
