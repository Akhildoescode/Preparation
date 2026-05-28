## Understanding the problem
Given an array of intervals, find the minimum number of intervals to remove so that the remaining intervals are non-overlapping. Equivalently, find the maximum number of non-overlapping intervals you can keep (then the answer is n minus that count).

## Brute force
Try all 2^n subsets of intervals, filter those that are non-overlapping, and find the maximum-size one. O(2^n) time.

## Key insight
This is the classic "Activity Selection Problem." To maximize the number of non-overlapping intervals we keep, greedily sort by end time and always pick the interval that ends earliest. Why? Picking the earliest-ending interval leaves the most room for future intervals — it minimizes the "waste" of time used.

Equivalently, when you encounter an overlapping interval, remove it (the one with the later end time). This is greedy: always discard the interval that ends later, since it consumes more future time.

## Optimal approach
1. Sort intervals by end time.
2. Track `prevEnd = Integer.MIN_VALUE` (the end of the last kept interval).
3. `count = 0` (number of intervals to remove).
4. For each interval [s, e]:
   - If `s < prevEnd`: overlap — remove this interval (it has the later end by sorting order). `count++`.
   - Else: keep this interval. `prevEnd = e`.
5. Return `count`.

## Why this works
Sorting by end time means that among all intervals starting after `prevEnd`, we always consider the earliest-ending one first. If the current interval doesn't overlap (`s >= prevEnd`), keeping it is optimal — it ends no later than any other interval starting in the same region. If it does overlap (meaning all remaining intervals starting at or after `prevEnd` overlap), we remove it (it already has the minimum end time in the sorted order — any replacement would end even later).

## Complexity
- Time: O(n log n) for sorting; O(n) for the greedy pass — overall O(n log n)
- Space: O(log n) for sort's recursion stack
