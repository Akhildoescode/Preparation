## Cases to mention to the interviewer

- **Single character:** `s = "a"` → `[["a"]]`. One partition, one single-char palindrome.
- **All same characters:** `s = "aaa"` → `[["a","a","a"], ["a","aa"], ["aa","a"], ["aaa"]]`. Every substring is a palindrome — many valid partitions.
- **No two adjacent characters match:** `s = "ab"` → `[["a","b"]]`. "ab" is not a palindrome, so single-char cuts are the only option.
- **String is itself a palindrome:** e.g., `s = "aba"` → `[["a","b","a"], ["aba"]]`. Both the split and the whole string are valid.
- **Even-length palindrome prefix:** `s = "aab"` — "aa" is a palindrome (even length). The DP table handles even-length palindromes correctly via the `j - i <= 2` guard for length-2.
- **Long string with many same characters:** Exponential output. DP precomputation is critical — without it, repeated palindrome checks would add another factor of n.
