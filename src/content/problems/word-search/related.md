## Same pattern, different problem
- **Word Search II (LC #212):** Same grid DFS for many words simultaneously — a Trie prunes branches where no remaining word shares the current prefix.
- **Number of Islands (LC #200):** Grid DFS to count connected components — similar boundary checks and visited marking (though Islands permanently marks visited cells since it's not backtracking).
- **Permutations (LC #46):** The same choose-recurse-unchoose template applied to an array with a `used[]` boolean array instead of a grid sentinel.
- **N-Queens (LC #51):** Backtracking with chess-queen constraints — structurally identical choose-recurse-unchoose, different validity predicate.

## When this pattern applies
Grid DFS/backtracking applies when you need to find a *path* through a grid satisfying sequential constraints. The tell-tale signals: "find if you can form sequence X by following adjacent cells" or "find all paths satisfying property Y." Always manage the visited constraint (sentinel overwrite or boolean array) and always restore state on backtrack. The sentinel overwrite is preferred when the visited set maps 1:1 to positions and the sentinel value is clearly distinct from valid cell values.
