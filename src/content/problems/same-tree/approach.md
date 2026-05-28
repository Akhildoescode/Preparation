## Understanding the problem
Given the roots of two binary trees p and q, return true if and only if they are structurally identical and every corresponding pair of nodes has the same value. Two null trees are considered the same. A null tree is not the same as a non-null tree.

## Brute force
Serialize both trees into strings (e.g., preorder with null markers) and compare the strings. This works in O(n) time and O(n) space but requires extra memory for the strings. The direct recursive solution is simpler, equally fast, and uses less code.

## Key insight
Two trees are the same if and only if their roots have the same value AND their left subtrees are the same AND their right subtrees are the same. This three-part conjunction maps directly to a recursive structure. The base cases handle the null situations: both null is trivially same; exactly one null means they differ in structure.

## Optimal approach — Recursive tree_dfs (pre-order comparison)
- Pattern: tree_dfs, simultaneously traversing both trees.
- Base case 1: both nodes are null → return true (identical empty subtrees).
- Base case 2: exactly one is null → return false (structural mismatch).
- If `p.val != q.val` → return false (value mismatch).
- Recurse: return `isSameTree(p.left, q.left) && isSameTree(p.right, q.right)`.
- Invariant: at every call, we are comparing subtrees rooted at the given pair of nodes and the return value is the definitive answer for that pair.

## Why this works
Short-circuit evaluation (&&) means we stop the moment we find any mismatch, which is optimal. Every node pair is visited at most once. The three-way null check at the top covers all structural cases before we ever access `.val`, so there are no null dereferences.

## Complexity
- Time: O(n) where n is the number of nodes in the smaller tree, because we stop early on any mismatch and at most visit every node in both trees once.
- Space: O(h) because the recursion stack is bounded by the height of the trees. O(log n) for balanced, O(n) worst case for skewed.
