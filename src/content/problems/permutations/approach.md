## Understanding the problem

Given an array of distinct integers, return all possible permutations. The challenge is generating every ordering without repeats. Since elements are distinct, no de-duplication logic is needed, which keeps the implementation clean.

## Brute force

We could generate every possible arrangement by trying all positions for the first element, then all positions for the second among the remaining, and so on. This is inherently recursive — it is backtracking.

## Key insight

A permutation is built one position at a time. At each step, we have a set of "remaining" (unused) elements to place. We try each remaining element in the current position, mark it used, recurse to fill the next position, then unmark it (backtrack). The decision tree has n branches at depth 0, n−1 at depth 1, and so on, giving n! leaves — one per permutation.

## Optimal approach

Use a `boolean[] used` array to track which elements are placed so far.

1. Maintain a `List<Integer> current` being built.
2. When `current.size() == nums.length`, add a copy of `current` to results.
3. Otherwise, iterate `i` from 0 to n−1: if `!used[i]`, set `used[i] = true`, add `nums[i]` to `current`, recurse, then remove the last element and set `used[i] = false`.

Alternatively, swap-based: maintain the array itself and swap element at position `start` with each element from `start` to `n−1`, recurse with `start+1`, then swap back.

## Why this works

The `used` array enforces that each element appears exactly once per permutation. At each recursive call, exactly one more element is committed to the current prefix, and we try all valid completions. Backtracking ensures the `current` list is restored to its state before the recursive call, so sibling branches start fresh.

## Complexity

- Time: O(n · n!) — there are n! permutations, each of length n to copy into the result
- Space: O(n) recursion depth plus O(n · n!) for the output
