## Same pattern, different problem
- **Jump Game (LC #55):** Greedy scan tracking a running maximum (farthest reachable) — same one-pass linear scan structure.
- **Jump Game II (LC #45):** Greedy with level-based jumps — minimum jumps, same pattern of tracking a frontier.
- **Maximum Subarray (LC #53):** Kadane's algorithm — tracks a running sum and resets when it goes negative. Same "reset and restart from next position" concept.
- **Minimum Cost to Connect Sticks (LC #1167):** Greedy with a min-heap — greedy choice at each step minimizes cost.

## When this pattern applies
The gas station "greedy elimination" pattern applies when: you're searching for a valid starting point in a circular sequence where each position contributes a net gain/loss, and the question is whether any starting point allows you to complete the circuit without going bankrupt. Key properties enabling the greedy: (1) if total is non-negative, a solution exists; (2) if you fail at position i, all positions between your current start and i are also invalid, so you can jump directly to i+1. This "local failure implies eliminate entire prefix" reasoning is what makes the one-pass greedy correct.
