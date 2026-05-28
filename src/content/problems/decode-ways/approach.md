## Understanding the problem
A string of digits is encoded such that 'A'→'1', 'B'→'2', ..., 'Z'→'26'. Given a digit string, count the number of ways to decode it. A digit '0' cannot be decoded on its own — it must be part of '10' or '20'. A number like '27' or '30' can't be decoded as a two-digit pair.

## Brute force
Recursively try taking the next 1 or 2 digits, check if each is a valid encoding (1-9 for single, 10-26 for double), and sum the counts. O(2^n) without memoization due to overlapping subproblems.

## Key insight
Let `dp[i]` = number of ways to decode the first i characters of s. The recurrence considers two cases:
1. Take the last digit alone: if `s[i-1] != '0'`, then `dp[i] += dp[i-1]` (single digit 1-9 is valid).
2. Take the last two digits together: if `s[i-2..i-1]` is between 10 and 26, then `dp[i] += dp[i-2]` (two-digit encoding is valid).

## Optimal approach
1. `dp[0] = 1` (empty string has one way to decode — do nothing).
2. `dp[1] = 1 if s[0] != '0' else 0`.
3. For i from 2 to n:
   - If `s[i-1] != '0'`: `dp[i] += dp[i-1]` (single-digit decode).
   - Two-digit value = `Integer.parseInt(s.substring(i-2, i))`. If `10 <= val <= 26`: `dp[i] += dp[i-2]`.
4. Return `dp[n]`.

Can be space-optimized to two rolling variables.

## Why this works
dp[i-1] represents decoding ways for the prefix up to s[i-2] — adding s[i-1] as a single-digit character extends each of those decodings by one more letter. dp[i-2] represents decoding ways up to s[i-3] — combining s[i-2..i-1] as a two-digit code extends each by one letter. '0' as a single digit is invalid (no letter maps to 0). Values > 26 as a two-digit pair are also invalid.

## Complexity
- Time: O(n) — one pass with constant work per position
- Space: O(1) with rolling variables (O(n) with full array)
