## Understanding the problem

Given a `beginWord`, an `endWord`, and a `wordList`, find the length of the shortest transformation sequence from `beginWord` to `endWord` such that each step changes exactly one letter and every intermediate word (including `endWord`) must be in the `wordList`. Return 0 if no such sequence exists.

## Brute force

Build an explicit graph: for each pair of words, add an edge if they differ by exactly one letter. Then BFS from `beginWord` to `endWord`. Building the graph takes O(N^2 * M) where N = number of words, M = word length — too slow for large inputs.

## Key insight

We don't need to precompute all edges. From any current word, we can enumerate all one-letter substitutions (26 * M possibilities per word) and check each against the wordSet in O(1). This avoids comparing every word pair and brings neighbor generation to O(26 * M) per word — the implicit graph approach.

## Optimal approach

Pattern: **graph\_bfs**.

1. Add all words from `wordList` to a `HashSet<String>` for O(1) lookup.
2. If `endWord` is not in the set, return 0 immediately.
3. Initialize a queue with `beginWord` and a level counter starting at 1.
4. BFS: for each word dequeued, generate all one-letter mutations (iterate each position, try all 26 letters). If the mutation equals `endWord`, return `level + 1`. If it's in the wordSet, enqueue it and remove it from the set (prevents revisiting).
5. If the queue empties without finding `endWord`, return 0.

Removing words from the set as they're enqueued acts as the visited set — a word is processed at most once, at the BFS level equal to its minimum transformation distance from `beginWord`.

## Why this works

BFS guarantees the first time we reach `endWord` is via the shortest path. Removing words from the set on first visit ensures we never re-enqueue them at a longer distance, maintaining the shortest-path invariant. Generating neighbors by substitution rather than pre-building the graph avoids O(N^2) preprocessing.

## Complexity
- Time: O(M^2 * N) because for each of the N words in the queue, we generate M positions * 26 substitutions, and each string comparison/creation is O(M) — so O(26 * M * M) = O(M^2) per word.
- Space: O(M * N) because the word set and queue each store up to N words of length M.
