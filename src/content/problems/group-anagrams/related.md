## Same pattern, different problem

- **Two Sum (LeetCode 1):** Same core idea — use a hash map to replace an O(n²) pairwise check with O(n) single-pass lookups. The "canonical key" here is the complement value rather than a sorted string.
- **Valid Anagram (LeetCode 242):** The sub-problem this solution solves implicitly for each pair — determine if two strings are anagrams. Knowing this reduces to sorted-key equality makes Group Anagrams a straightforward extension.
- **Find All Anagrams in a String (LeetCode 438):** Uses a sliding window with a frequency map to find all positions where an anagram of pattern appears in a string — same canonical-frequency concept applied to a continuous scan.
- **Isomorphic Strings (LeetCode 205):** Also uses character-mapping canonicalization; instead of sorting, it encodes the relative first-occurrence order of characters — a different hash key, same "normalize then compare" strategy.

## When this pattern applies

Use **canonical-key hashing** whenever you need to group or match objects that are "equivalent up to reordering." The key question is: can you define a deterministic, collision-free canonical form for the equivalence class in O(m log m) or better? For character-level equivalence (anagrams), sorting works. For more complex equivalence relations, a frequency vector or prime-product encoding may be faster. If the equivalence class has no cheap canonical form, you may need pairwise comparison, which brings you back to O(n²).
