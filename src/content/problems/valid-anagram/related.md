## Same pattern, different problem
- **Contains Duplicate:** Uses a HashSet instead of a frequency array, but the core idea is the same — hash characters/values for O(1) membership tracking.
- **Group Anagrams:** Groups strings that are anagrams of each other by sorting each string (or using a frequency tuple) as a HashMap key — extends the anagram-detection concept to batches.
- **Minimum Window Substring:** Uses two frequency maps (one for the target, one for the window) and a "have/need" counter to track when the window satisfies the anagram condition — a sliding-window generalisation of this exact technique.
- **Find All Anagrams in a String:** Slides a fixed-width window over a string and checks if the window's frequency array matches the pattern's — direct reuse of the `int[26]` comparison.

## When this pattern applies
Use a fixed-size frequency array (rather than a HashMap) whenever the alphabet is small and bounded — lowercase English letters, digits, or ASCII. The array gives O(1) space instead of O(n) and avoids boxing overhead. The key signal is that you need to compare multiset equality: two collections contain the same elements with the same counts, ignoring order. Any time "same characters, different order" is the core question, frequency counting is the right tool.
