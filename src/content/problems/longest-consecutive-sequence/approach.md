## Understanding the problem
Given an unsorted integer array, find the length of the longest sequence of consecutive integers (e.g., 4, 5, 6, 7). Elements need not be adjacent in the array. Must run in O(n) time — ruling out sorting.

## Brute force
Sort the array, then scan linearly for the longest run of consecutive values (skipping duplicates). O(n log n) — violates the O(n) constraint.

## Key insight
Put all numbers in a HashSet (O(1) lookup). For each number `n`, only start counting a sequence from `n` if `n - 1` is NOT in the set — meaning `n` is the beginning of a consecutive sequence. Then count `n, n+1, n+2, ...` until the next number isn't in the set. Numbers that are not sequence starts are never iterated as seeds, keeping the total work O(n).

## Optimal approach
1. Add all elements to a `HashSet<Integer>`.
2. For each number `n` in the set:
   - Skip if `set.contains(n - 1)` — not a sequence start.
   - Otherwise, count: `length = 1`. While `set.contains(n + length)`, `length++`.
   - Update `maxLength`.
3. Return `maxLength`.

Trace `[100, 4, 200, 1, 3, 2]`:
- Set = {100, 4, 200, 1, 3, 2}.
- n=100: 99 not in set → start. 101 not in set → length=1.
- n=4: 3 IS in set → skip (not a start).
- n=200: 199 not in set → start. 201 not in set → length=1.
- n=1: 0 not in set → start. 2,3,4 all in set → length=4.
- n=3: 2 IS in set → skip.
- n=2: 1 IS in set → skip.
Max: 4 (sequence 1,2,3,4). ✓

## Why this works
Each number is the start of at most one sequence. Each number in a sequence is visited at most twice — once as a potential start (immediately skipped if not a start), and once during the counting phase initiated by the actual start. So total iterations across all counting phases is bounded by n. Overall O(n).

## Complexity
- Time: O(n) — O(n) to build set + O(n) total across all counting loops.
- Space: O(n) for the HashSet.
