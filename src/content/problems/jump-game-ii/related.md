## Same pattern, different problem
- **Jump Game (LC #55):** The prerequisite problem — same maxReach/farthest tracking, but only needs a boolean answer (reachable or not), not the count.
- **Gas Station (LC #134):** Greedy scan where you look for a valid starting point by tracking cumulative surplus — similar "track a running aggregate" structure.
- **Video Stitching (LC #1024):** Greedy interval covering — arrange clips (analogous to jump ranges) to cover [0, T] with the fewest clips. Same BFS-level greedy.
- **Minimum Number of Taps to Open to Water a Garden (LC #1326):** Same greedy as Jump Game II — each tap covers a range; find minimum taps. Identical algorithm after range normalization.

## When this pattern applies
The "BFS levels" greedy applies when: you need the minimum number of "jumps" to traverse a 1-D array, each position specifies how far you can jump, and each jump is greedy (take the farthest reachable position in one jump). The invariant: `curEnd` marks the boundary of the current level; when you reach it, commit to a jump and advance to `farthest` (the farthest position reachable from any index in the current level). This generalizes to interval covering: "minimum number of intervals to cover [0, n]" where each interval is like a jump range.
