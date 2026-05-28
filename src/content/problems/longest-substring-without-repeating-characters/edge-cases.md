## Cases to mention to the interviewer

- **Empty string:** `""`. The for loop doesn't execute. Return `maxLen = 0`. Correct.
- **Single character:** `"a"`. right=0, c='a', not in map, maxLen=1. Return 1.
- **All identical characters:** `"aaaa"`. At each step, left jumps to right, so window is always size 1. Answer: 1.
- **All unique characters:** `"abcdef"`. Window grows from left=0 all the way to right=5. Answer: 6 (the full string).
- **Characters appearing many times, separated:** `"abba"`. Trace: r=0(a)→map={a:0},max=1. r=1(b)→map={b:1},max=2. r=2(b)→b at 1≥left(0), left=2; map={b:2},max=2. r=3(a)→a at 0 NOT ≥ left(2), so no jump! map={a:3},max=2. Answer: 2 ("ba" or "ab"). The `>= left` guard correctly ignores stale 'a' entry.
- **Non-letter characters:** `"ab c"` (with a space). HashMap handles any character transparently; no special casing needed.
- **Unicode / multi-byte:** If using `charAt` with a simple HashMap<Character, Integer>, standard Unicode BMP characters (most code points) work. For supplementary characters (surrogate pairs), you'd need `codePoints()` — worth mentioning if the interviewer asks about wide character support.
