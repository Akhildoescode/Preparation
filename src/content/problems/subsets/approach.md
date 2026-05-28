## Understanding the problem
Given an array of distinct integers, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Order of subsets in the output doesn't matter; order of elements within a subset doesn't matter.

## Brute force / iterative approach
Start with `[[]]`. For each element, take every existing subset and create a new subset by adding the element. This iterative approach is correct and O(n × 2ⁿ). The backtracking approach is equivalent but uses recursion.

## Key insight
Use **backtracking**: at each index, decide whether to include or not include the current element. DFS the decision tree, recording the current path as a subset at each node (not just at leaves). Since we process elements left to right and only look at indices ≥ current, no duplicates are produced.

## Optimal approach — Backtracking
- Result list starts with empty `[]`.
- `backtrack(start, currentSubset)`:
  - Add a copy of `currentSubset` to result (record every state, not just leaves).
  - For `i` from `start` to `n-1`:
    - Add `nums[i]` to `currentSubset`.
    - Recurse: `backtrack(i+1, currentSubset)`.
    - Remove `nums[i]` (backtrack).

Trace `nums=[1,2,3]`:
- bt(0,[]): add []
  - add 1: bt(1,[1]): add [1]
    - add 2: bt(2,[1,2]): add [1,2]
      - add 3: bt(3,[1,2,3]): add [1,2,3]. Return.
    - add 3: bt(3,[1,3]): add [1,3]. Return.
  - add 2: bt(2,[2]): add [2]
    - add 3: bt(3,[2,3]): add [2,3]. Return.
  - add 3: bt(3,[3]): add [3]. Return.
Result: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]. 8 = 2³ subsets. ✓

## Why this works
Every subset corresponds to exactly one path in the DFS tree. Elements are processed in increasing index order, ensuring each element appears at most once per path and no combination is repeated.

## Complexity
- Time: O(n × 2ⁿ) — 2ⁿ subsets, each of average size n/2, so O(n × 2ⁿ) to copy them.
- Space: O(n) for the recursion stack and current subset (excluding output).
