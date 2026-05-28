## Reference solution

**Complexity:** O(m) per operation where m is the word/prefix length. O(26 × total characters) space.

```java
class Trie {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd;
    }

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode curr = traverse(word);
        // Must reach the end AND have an isEnd marker
        return curr != null && curr.isEnd;
    }

    public boolean startsWith(String prefix) {
        // Just need to reach the end of the prefix — isEnd doesn't matter
        return traverse(prefix) != null;
    }

    /** Traverse from root following the characters of the string.
     *  Returns the final node, or null if any character is missing. */
    private TrieNode traverse(String s) {
        TrieNode curr = root;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return null;
            curr = curr.children[idx];
        }
        return curr;
    }
}
```

## Line-by-line notes
- **`TrieNode[] children = new TrieNode[26]`:** Fixed-size array gives O(1) child access by character index. A `HashMap<Character, TrieNode>` would also work but has higher constant-factor overhead.
- **`c - 'a'`:** Maps lowercase letters to indices 0–25. Assumes only lowercase letters (confirmed by typical constraints). For general character sets, use a HashMap.
- **`traverse` helper:** Extracted to avoid duplicating the traversal logic between `search` and `startsWith`. DRY principle — the only difference is the final check on `isEnd`.
- **`curr.isEnd = true` in `insert`:** Set the flag on the last node, not intermediate nodes. "app" and "apple" both pass through 'a','p','p', but only "app" sets `isEnd` at the third 'p'.
- **Null check in `traverse`:** If any character in the word is missing from the trie, return null immediately — early exit, O(prefix length not total trie depth).

## Common bugs to avoid
- **Not setting `isEnd`:** Without it, `search("apple")` returns true even if only "applesauce" was inserted (the path exists but the word didn't end there).
- **`search` returning `curr != null` without checking `isEnd`:** `startsWith` and `search` would be identical — you'd be treating all prefixes as complete words.
- **Using the same method for `search` and `startsWith` without the `isEnd` check:** The only difference is `&& curr.isEnd` — don't forget it for `search`.
