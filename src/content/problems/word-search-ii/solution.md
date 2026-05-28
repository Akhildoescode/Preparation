## Reference solution

**Complexity:** O(M * 4 * 3^(L-1)) time, O(W * L) space.

```java
class Solution {

    // Lightweight Trie node — array children faster than HashMap for fixed 26-char alphabet
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;  // non-null at terminal nodes to avoid reconstructing the word
    }

    private TrieNode buildTrie(String[] words) {
        var root = new TrieNode();
        for (var w : words) {
            var node = root;
            for (char c : w.toCharArray()) {
                int idx = c - 'a';
                // Create child node only when needed (lazy allocation)
                if (node.children[idx] == null) node.children[idx] = new TrieNode();
                node = node.children[idx];
            }
            // Store the full word at the terminal so we don't reconstruct it during DFS
            node.word = w;
        }
        return root;
    }

    private char[][] board;
    private List<String> results;

    public List<String> findWords(char[][] board, String[] words) {
        this.board   = board;
        this.results = new ArrayList<>();

        var root = buildTrie(words);

        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                dfs(r, c, root);
            }
        }
        return results;
    }

    private void dfs(int r, int c, TrieNode node) {
        // Out of bounds or already visited in this path
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#') return;  // visited marker

        // Prune: no word in the dictionary starts with the current prefix
        var next = node.children[ch - 'a'];
        if (next == null) return;

        // Found a complete word — record it and remove from Trie to prevent duplicates
        if (next.word != null) {
            results.add(next.word);
            next.word = null;   // deduplicate: same word reachable via different paths
        }

        // Mark visited to prevent reusing this cell within the current word's path
        board[r][c] = '#';

        dfs(r + 1, c, next);
        dfs(r - 1, c, next);
        dfs(r, c + 1, next);
        dfs(r, c - 1, next);

        // Restore cell — backtrack so other starting cells can use it
        board[r][c] = ch;

        // Trie pruning: if this node has no more words beneath it, detach it
        // This shrinks the Trie as words are found, significantly speeding up later searches
        if (isEmpty(next)) node.children[ch - 'a'] = null;
    }

    private boolean isEmpty(TrieNode node) {
        if (node.word != null) return false;
        for (var child : node.children) {
            if (child != null) return false;
        }
        return true;
    }
}
```

## Line-by-line notes
- **Line 7 (`word = null` at terminal):** Storing the word string avoids rebuilding it from the path during DFS. Nulling it out after finding it is the deduplication mechanism — cleaner than a separate HashSet.
- **Line 44 (`ch == '#'`):** Using a sentinel character for the visited marker avoids a separate `boolean[][] visited` array, saving memory and simplifying the code.
- **Line 48 (`next == null` prune):** This is the core Trie advantage. If no word starts with the current path's prefix, the entire subtree is skipped without examining any further board cells.
- **Lines 58-61 (four-directional DFS):** Passing `next` (not `node`) to each recursive call advances the Trie pointer, matching the board traversal step-by-step.
- **Lines 64-65 (Trie pruning):** After backtracking, if `next` is now empty (word found, no children), we detach it. This causes all subsequent DFS paths through the same prefix to prune immediately, a major optimization for large word lists.

## Common bugs to avoid
- **Restoring the cell before checking all 4 directions:** Restoring `board[r][c] = ch` must come after all four recursive calls, not between them.
- **Not copying the word out of the Trie node:** If you store `word` in the Trie but fail to `results.add(next.word)` before nulling it, you lose the result.
- **Using a HashMap for Trie children:** For lowercase English letters, `children[26]` is faster and uses less memory than `HashMap<Character, TrieNode>`. HashMap adds overhead with no benefit when the alphabet is fixed and small.
