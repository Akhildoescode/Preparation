## Same pattern, different problem
- **House Robber (LC #198):** The base problem — same recurrence, linear arrangement. House Robber II reduces to two calls of House Robber I.
- **House Robber III (LC #337):** Houses arranged as a binary tree — requires tree DP (return both rob and skip values from each node).
- **Climbing Stairs (LC #70):** Same rolling two-variable DP, different recurrence.
- **Maximum Sum Circular Subarray (LC #918):** Another problem where a circular constraint is handled by splitting into two linear sub-problems.

## When this pattern applies
When a circular arrangement makes the first and last element adjacent (and thus mutually exclusive), break the problem into two independent linear sub-problems: one including the first element (excluding the last) and one excluding the first (including the last). Take the max/min/result. This technique applies to any 1-D DP problem with a circular wrap-around constraint — the "split into two linear subproblems" approach works whenever the only coupling is between the two endpoints.
