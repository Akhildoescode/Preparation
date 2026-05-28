## Reference solution

**Complexity:** O(M^2 * N) time, O(M * N) space.

```java
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        var wordSet = new HashSet<>(wordList);
        // Early exit: endWord must be reachable
        if (!wordSet.contains(endWord)) return 0;

        var queue = new ArrayDeque<String>();
        queue.offer(beginWord);
        int level = 1;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            level++;
            for (int i = 0; i < levelSize; i++) {
                var word = queue.poll();
                var chars = word.toCharArray();
                // Try substituting every position with every letter
                for (int pos = 0; pos < chars.length; pos++) {
                    char original = chars[pos];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chars[pos] = c;
                        var candidate = new String(chars);
                        if (candidate.equals(endWord)) return level;
                        if (wordSet.contains(candidate)) {
                            wordSet.remove(candidate); // prevent revisiting
                            queue.offer(candidate);
                        }
                    }
                    chars[pos] = original; // restore for next position
                }
            }
        }
        return 0; // endWord not reachable
    }
}
```

## Line-by-line notes
- **`wordSet.remove(candidate)` before `queue.offer`:** Removal from the set serves as the visited marker. Removing immediately (not after dequeue) ensures no duplicate enqueues even if two words in the same level both generate the same neighbor.
- **`level++` at the start of each level, before the inner loop:** Means level represents the length of the sequence ending at words dequeued in this iteration. When we find endWord, `level` is already correct.
- **`chars[pos] = original` restore:** We mutate the char array in place for efficiency, so we must restore the original character after trying all 26 substitutions at this position.
- **`candidate.equals(endWord)` check before `wordSet.contains`:** Short-circuit: if it's the endWord, return immediately without bothering to enqueue. Also, endWord might have been removed from wordSet if another path reached it first — but that won't happen since we return on the first reach.
- **`toCharArray()` outside the position loop:** Converts once per word dequeued, not once per (position, letter) combination.

## Common bugs to avoid
- Not removing the word from `wordSet` before enqueuing — leads to the same word being enqueued multiple times from different parents, causing incorrect level counts and TLE.
- Forgetting `chars[pos] = original` restore — subsequent position iterations will use the modified character, generating wrong candidates.
- Off-by-one in level counting — starting at 1 and incrementing before processing is one valid pattern; starting at 1 and incrementing after is another. Pick one and trace through carefully.
- Not checking if `endWord` is in `wordList` upfront — wastes the entire BFS only to return 0.
