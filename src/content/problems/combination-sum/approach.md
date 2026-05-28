## Understanding the problem
Given an array of distinct positive integers (candidates) and a target, find all unique combinations that sum to target where each candidate may be used an unlimited number of times. Order does not matter — [2,2,3] and [2,3,2] count as the same combination.

## Brute force
Generate all possible multisets by trying every element at every position, then filter those summing to target. Without ordering constraints this produces duplicate combinations. De-duplicating after the fact is expensive and ugly.

## Key insight
To avoid duplicate combinations (e.g., [2,3] and [3,2] both summing to 5), only pick candidates at index `start` and beyond in each recursive call. This ensures every combination is built in non-decreasing index order — so each distinct multiset appears exactly once. Since reuse is allowed, pass the same `start` (not `start+1`) when recursing.

## Optimal approach
1. Sort candidates (enables early termination).
2. `backtrack(start, remaining, current)`:
   - If `remaining == 0`: record `current` as a valid combination.
   - For `i` from `start` to `len-1`:
     - If `candidates[i] > remaining`: `break` (sorted, so all further values also exceed budget).
     - Add `candidates[i]`, recurse with `start=i` and `remaining − candidates[i]`, remove last.

## Why this works
The `start` parameter ensures we never revisit candidates that come before the current element in the sorted order, preventing duplicate combinations. Recursing with `i` (not `i+1`) allows the same candidate to appear multiple times. The `break` on sorted arrays prunes entire subtrees where no completion can satisfy the budget.

## Complexity
- Time: O(n^(T/M)) where T is target, M is minimum candidate value — exponential but bounded by the output size
- Space: O(T/M) recursion depth (maximum combination length)
