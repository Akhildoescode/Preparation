## Understanding the problem
Given an array of intervals [start, end], merge all overlapping intervals and return the merged array. Two intervals overlap if one starts before or when the other ends. The output should be a set of non-overlapping intervals covering the same range as the input.

## Brute force
For each pair of intervals, check if they overlap and merge if so. Repeat until no more merges occur. O(n²) per pass, potentially O(n) passes. Very slow.

## Key insight
If we sort intervals by their start time, then overlapping intervals are guaranteed to be adjacent (or close) in the sorted array. We process them left-to-right: the current interval either overlaps with the last merged interval (extend the end) or doesn't (add the last merged interval to results and start a new one).

Two intervals [a,b] and [c,d] overlap (given a ≤ c by sorting) if and only if `c ≤ b` (the next start is within the current end).

## Optimal approach
1. Sort intervals by start time.
2. Initialize the result list with the first interval.
3. For each subsequent interval [c, d]:
   - If `c ≤ last.end`: overlap — update `last.end = max(last.end, d)`.
   - Else: no overlap — push [c, d] as a new interval to results.
4. Return results.

## Why this works
After sorting, if interval[i].start > intervals[i-1].end, there's a definitive gap — no later interval (with even larger start) can bridge this gap, so we can finalize the current merged interval. If there's overlap, we extend the end greedily (taking the maximum end ensures we capture the full range of all overlapping intervals at once).

## Complexity
- Time: O(n log n) for sorting; O(n) for the merge pass — overall O(n log n)
- Space: O(n) for the output (plus O(log n) for sort's recursion stack)
