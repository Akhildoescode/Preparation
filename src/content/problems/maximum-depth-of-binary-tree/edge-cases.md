## Cases to mention to the interviewer

- **Empty input / null root:** Return 0 — no nodes means depth zero. The base case handles this without any special branching.
- **Single node:** Root has no children, so both recursive calls return 0, and we return 1 + max(0, 0) = 1. Correct.
- **Perfectly balanced tree:** Depth is O(log n) — the recursion stack stays shallow. No issue.
- **Completely skewed tree (linked-list shape):** Every node has exactly one child, so depth equals n. The recursion stack reaches O(n) depth; on very large inputs this could cause a stack overflow. Mention that an iterative approach with an explicit stack avoids this risk.
- **Tree with only left children vs only right children:** Both produce a depth equal to the number of nodes — the algorithm handles them identically because `Math.max(d, 0) = d` regardless of which side is deeper.
