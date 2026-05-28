## Cases to mention to the interviewer

- **Single word:** `words = ["abc"]` → no ordering constraints derived (no adjacent pairs). All characters present are valid — return them in any order, e.g., `"abc"` or `"cba"`.
- **All identical words:** `words = ["abc","abc"]` → no constraints. Return the characters in any order.
- **Prefix contradiction (invalid):** `words = ["abc","ab"]` — "abc" comes before "ab" but "abc" is longer and "ab" is a prefix of "abc". This means "abc" < "ab" lexicographically in the alien order, but "abc" appears first in the given list. Invalid → return `""`. Detect: if `word1.length() > word2.length() && word1.startsWith(word2)`, return `""`.
- **Single character per word:** `words = ["z","x","z"]` → `z` comes before `x` (from pair 1-2) AND `x` comes before `z` (from pair 2-3) → cycle → return `""`.
- **Characters appearing in only one word:** If a character appears only in one word and no constraints involve it, it can appear anywhere in the output. The topological sort places it wherever the BFS processes it (when its in-degree hits 0).
- **Not all 26 letters:** Only characters that appear in the words are in the graph. The output contains only those characters, not all 26.
- **Long prefix match, no info:** `words = ["app","apple"]` — no first-differing character (first word is prefix of second, correctly ordered). No constraint derived from this pair.
- **Multiple edges between same pair:** `words = ["ab","ac","bd"]` → edges: b→c (from pair 1,2), a→b (from pair 2,3). Could add duplicate edges if not careful. Use a Set to avoid duplicate edges and double-counting in-degrees.
- **Cycle detection:** Same as topological sort — if result size < number of unique characters, a cycle exists → return `""`.
