## Same pattern, different problem
- **Jump Game II (LC #45):** Minimum number of jumps to reach the last index — extends this greedy with a jump counter and a "level boundary" variable.
- **Jump Game III (LC #1306):** Can jump ±nums[i] (forward or backward) — requires BFS/DFS rather than a simple greedy.
- **Gas Station (LC #134):** Greedy scan to determine if a circular route is completable — same "track a running total and check if it ever goes negative" pattern.
- **House Robber (LC #198):** 1-D DP where the decision at each step depends on the previous step's result — DP alternative to greedy.

## When this pattern applies
The "track maximum reachable frontier" greedy applies when: you're scanning a 1-D array left-to-right, each element defines how far forward you can extend from that position, and the question is whether the endpoint is reachable. The greedy works because extending the frontier is always optimal — knowing the *farthest* possible reach is sufficient; we never need to know *which specific path* got us there. The key invariant: `maxReach` is always the farthest index reachable using any combination of jumps from indices 0 to i.
