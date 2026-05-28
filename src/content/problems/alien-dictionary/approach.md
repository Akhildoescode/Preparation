## Understanding the problem
Given a list of words sorted in an alien language's dictionary order, determine the character ordering of the alien alphabet. Return any valid ordering. If the ordering is contradictory (cycle), return `""`. If it's `["abc", "ab"]` (longer word before its prefix), it's also invalid.

## Brute force
There's no meaningful brute force — the structure of the problem requires extracting constraints and topological sorting.

## Key insight
Compare **adjacent words** in the list. The first position where they differ tells us the ordering between two characters (the character from the first word comes before the character from the second word in the alien alphabet). Collect all such edges, then do a **topological sort**. If a cycle exists, return `""`.

## Optimal approach
1. **Build the character graph:**
   - Initialize all characters that appear in any word as nodes (with in-degree 0).
   - For each adjacent pair of words: find the first differing character position.
     - If `words[i]` is longer than `words[i+1]` and `words[i+1]` is a prefix of `words[i]`, it's invalid — return `""`.
     - Otherwise, add edge `word1[diff] → word2[diff]` if not already present.
2. **Topological sort (Kahn's Algorithm):**
   - Queue: all characters with in-degree 0.
   - Process, decrement neighbors, add newly-zero-in-degree to queue.
   - If result length < number of unique characters, there's a cycle — return `""`.
3. Return the topologically sorted character string.

Trace `["wrt", "wrf", "er", "ett", "rftt"]`:
- wrt vs wrf: t < f.
- wrf vs er: w < e.
- er vs ett: r < t.
- ett vs rftt: e < r.
- Edges: t→f, w→e, r→t, e→r. Topo sort: w,e,r,t,f. ✓

## Why this works
Each adjacent word pair contributes at most one ordering constraint (the first differing character). Topological sort then produces a linear ordering consistent with all constraints. A cycle means contradictory constraints exist.

## Complexity
- Time: O(C) where C = total characters across all words (for building the graph) + O(U + E) for topo sort, where U = unique characters and E = edges ≤ U².
- Space: O(U + E).
