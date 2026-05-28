## Cases to mention to the interviewer

- **Empty strings:** `s = ""`, `t = ""` — lengths match, loop doesn't run, all freq entries are 0, returns `true`. Two empty strings are trivially anagrams.
- **Single character, same:** `s = "a"`, `t = "a"` — freq[0] increments then decrements to 0. Returns `true`.
- **Single character, different:** `s = "a"`, `t = "b"` — freq[0] = 1, freq[1] = -1. Non-zero found, returns `false`.
- **Different lengths:** `s = "abc"`, `t = "ab"` — the upfront length check catches this immediately and returns `false` without touching the array.
- **All same character:** `s = "aaaa"`, `t = "aaaa"` — freq[0] increments 4 times, decrements 4 times. Returns `true`.
- **All same character, different count:** `s = "aaa"`, `t = "aa"` — caught by the length check before we even begin.
- **Unicode / non-lowercase (follow-up):** If the interviewer extends the problem to Unicode, the `int[26]` trick breaks. Switch to a `HashMap<Character, Integer>` — O(n) time, O(k) space where k is the alphabet size.
- **Integer overflow risk:** Not applicable — character counts are at most n (≤ 5 × 10⁴), well within `int` range.
