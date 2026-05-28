## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        // different lengths can never be anagrams
        if (s.length() != t.length()) return false;

        // freq[i] = (count of letter i in s) - (count of letter i in t)
        var freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;  // charge s
            freq[t.charAt(i) - 'a']--;  // discharge t
        }

        // anagram iff every surplus/deficit cancelled to zero
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }
}
```

## Line-by-line notes
- **`s.length() != t.length()` guard:** Eliminates the impossible case before allocating anything and makes the zero-check sufficient (no risk of cancellation across different-length strings).
- **`s.charAt(i) - 'a'`:** Maps 'a'→0, 'b'→1, …, 'z'→25. Subtract the char literal directly; no boxing to `Character` needed.
- **Single loop for both strings:** Processes s and t in one pass rather than two separate passes, halving constant factors.
- **Second loop checks for any non-zero:** Using an enhanced for-loop over the fixed 26-element array is O(1) in practice.

## Common bugs to avoid
- Forgetting the length check — if s and t have different lengths, some frequencies will be non-zero but the check still passes if the extras happen to be in opposite directions (they can't with a single array, but it's a logical error to skip it).
- Using `freq[s.charAt(i) - 'A']` assuming uppercase — the problem states lowercase, but confirm in the clarification step.
- Allocating a `HashMap<Character, Integer>` instead of `int[26]` — correct but adds unnecessary boxing overhead and O(n) space.
