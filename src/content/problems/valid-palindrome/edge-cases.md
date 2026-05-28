## Cases to mention to the interviewer

- **Empty string:** `l = 0`, `r = -1`. The outer `while (l < r)` is immediately false; we return `true`. An empty sequence is trivially a palindrome.

- **Single character (e.g., "a" or "1"):** `l = 0`, `r = 0`. The outer while is false from the start. Return `true`. A single character reads the same in both directions.

- **All non-alphanumeric (e.g., "  , ! "):** Both inner skip loops advance `l` and retreat `r` until they meet. The outer while exits without a comparison. Return `true` — an empty filtered string is a palindrome.

- **Mixed case (e.g., "AbBa"):** After `Character.toLowerCase`, 'A'/'a' match and 'b'/'B' match. Return `true`. Verifies case folding works correctly.

- **Palindrome with digits (e.g., "A1b2b1A"):** '1' and '1' must compare equal; `Character.isLetterOrDigit` includes digits, so they are not skipped. Return `true`.

- **One character difference in the middle (e.g., "abca"):** Outer pointer pair 'a'/'a' matches; inner pair 'b'/'c' does not. Return `false` after catching the first mismatch — confirm the algorithm short-circuits early.

- **Integer overflow risk:** Not applicable — this problem uses character indices bounded by string length, which is at most 2 * 10^5.
