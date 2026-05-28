## Understanding the problem
Find the length of the longest substring (contiguous characters) in a string where every character appears at most once. The string may contain letters, digits, spaces, and symbols. Return 0 for an empty string.

## Brute force
Try every possible substring (O(n²) pairs) and for each, check whether all characters are unique (O(n) scan using a Set). Total: O(n³) time. Faster O(n²) is possible by building the set incrementally, but still too slow.

## Key insight
Use a **sliding window**: maintain a window [left, right] that always contains only unique characters. Expand right by one each step. When we find a character already in the window, shrink from the left until the duplicate is removed. A HashMap from character → index lets us jump `left` directly past the duplicate rather than shrinking one step at a time.

## Optimal approach
- `left = 0`, track `maxLen = 0`.
- HashMap `lastSeen` maps each character to its most recent index.
- For each `right` from 0 to n-1:
  - If `s.charAt(right)` is in `lastSeen` AND its last seen index ≥ `left` (it's inside the current window), move `left` to `lastSeen.get(c) + 1` — jump past the duplicate.
  - Update `lastSeen` with the current index.
  - Update `maxLen = max(maxLen, right - left + 1)`.

Trace `"abcabcbb"`:
- r=0(a): seen={a:0}, left=0, len=1
- r=1(b): seen={b:1}, len=2
- r=2(c): seen={c:2}, len=3
- r=3(a): a last at 0, 0≥left(0) → left=1; seen={a:3}, len=3
- r=4(b): b last at 1, 1≥1 → left=2; seen={b:4}, len=3
- r=5(c): c last at 2, 2≥2 → left=3; seen={c:5}, len=3
- r=6(b): b last at 4, 4≥3 → left=5; len=2
- r=7(b): b last at 6, 6≥5 → left=7; len=1
Answer: 3 ("abc"). ✓

## Why this works
The window invariant: all characters in [left, right] are unique. When we see a duplicate at `right`, the only character in the window that violates uniqueness is the previous occurrence of `s[right]`. Moving `left` to `prevIndex + 1` removes that occurrence and restores the invariant in O(1). Since `right` only moves forward and `left` only moves forward, the total work is O(n).

## Complexity
- Time: O(n) — each character is visited at most twice (once by right, once when left jumps past it).
- Space: O(min(n, m)) where m is the size of the character set (26 for lowercase letters, 128 for ASCII).
