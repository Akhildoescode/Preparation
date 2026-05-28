## Cases to mention to the interviewer

- **`t` longer than `s`:** Impossible to find a valid window. Algorithm correctly returns `""` because `formed` never reaches `required`.
- **`t` with repeated characters:** `t = "AAB"`, s = "AABBA"`. Required: {A:2, B:1}. Only a window containing at least 2 A's and 1 B qualifies. Trace carefully — `formed` for 'A' only increments when `windowFreq['A'] == 2`, not when it first appears.
- **`s` equals `t`:** The window is the entire string `s`. `formed` reaches `required` at `right = s.length()-1`. Shrink to left=0, right=n-1. Return `s`.
- **All of `t` is one character:** `t = "AAAA"`. Window must contain ≥4 of that character. As window slides, `formed` only fires on exact threshold crossing.
- **No valid window:** `s = "ABC"`, `t = "AAB"`. Only one A in s, but two needed. `formed` for 'A' never reaches 2. Returns `""`.
- **`s` has only characters from `t`:** `s = "CBAEBABACD"`, `t = "ABC"`. The answer is the minimum window; the algorithm correctly shrinks as far as possible each time a valid window is found.
- **Empty `s` or empty `t`:** The guard at the top returns `""` immediately. Important to mention — otherwise, `tFreq.size()` would be 0 and `required == formed == 0` would make the inner while loop run immediately from left=0, reading `s.charAt(0)` on an empty string.
