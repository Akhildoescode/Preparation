## Same pattern, different problem
- **Word Search II (#212):** Uses a Trie to efficiently check if any prefix of the current DFS path matches a dictionary word — avoids re-checking the full dictionary at every grid cell.
- **Design Add and Search Words Data Structure (#211):** Trie with wildcard `.` support — DFS through children for wildcard characters, normal traversal for letters.
- **Replace Words (#648):** Given a sentence and a dictionary of roots, replace each word with its shortest root using a Trie for prefix lookup.
- **Auto-Complete System (#642):** Trie augmented with frequency tracking — find all words matching a prefix, ranked by frequency.

## When this pattern applies
Use a **Trie** when you need efficient prefix-based string operations: prefix search, word completion, or checking if a string matches a set of prefixes. The signal: "dictionary of strings" + "prefix queries." A HashSet answers exact match queries in O(m) but cannot answer "does any word start with X?" in better than O(total characters). A Trie answers both queries in O(m) (word/prefix length). The 26-children array is optimal for lowercase English; use a HashMap for larger/variable alphabets.
