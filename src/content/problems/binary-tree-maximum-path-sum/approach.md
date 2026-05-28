## Understanding the problem
Find the maximum sum of any path in the binary tree. A path is a sequence of nodes where each adjacent pair is connected by an edge, and no node appears twice. The path can start and end at any node — it doesn't need to pass through the root. Node values can be negative.

## Brute force
For every pair of nodes (u, v), find the path between them and sum it. O(n²) pairs, O(n) per path → O(n³). Alternatively, enumerate all paths using DFS — still O(n²) in the worst case.

## Key insight
At each node, the maximum path "through" that node (using it as the highest point) equals: `node.val + max(0, leftGain) + max(0, rightGain)`. But the function must return a value the *parent* can extend — and a parent can only extend the path in ONE direction (can't take a V-shaped path upward). So the function returns `node.val + max(0, leftGain, rightGain)` — only the better of the two subtree directions.

## Optimal approach — Post-order DFS
- Global `maxSum` initialized to `Integer.MIN_VALUE`.
- `maxGain(node)`:
  - If null: return 0.
  - `leftGain = Math.max(0, maxGain(node.left))` — take left only if it adds to the path.
  - `rightGain = Math.max(0, maxGain(node.right))` — same for right.
  - Candidate path through this node: `node.val + leftGain + rightGain`. Update `maxSum`.
  - Return `node.val + Math.max(leftGain, rightGain)` — the best single extension upward.

Trace `[-10, 9, 20, null, null, 15, 7]`:
- maxGain(9): left=0, right=0, candidate=9, maxSum=9, return 9.
- maxGain(15): candidate=15, maxSum=15, return 15.
- maxGain(7): candidate=7, maxSum=15, return 7.
- maxGain(20): leftGain=15, rightGain=7, candidate=20+15+7=42, maxSum=42, return 20+15=35.
- maxGain(-10): leftGain=9, rightGain=35, candidate=-10+9+35=34, maxSum=42, return -10+35=25.
Answer: 42. ✓

## Why this works
`max(0, gain)` handles negative subtrees — if a subtree has net negative gain, we simply don't include it (pretend it doesn't exist). The invariant: `maxGain(node)` returns the maximum sum of a path that starts at `node` and goes into exactly one subtree (or just the node itself). This is the only value the parent can safely extend.

## Complexity
- Time: O(n) — each node visited once.
- Space: O(h) for the recursion stack.
