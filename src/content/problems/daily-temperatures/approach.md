## Understanding the problem

Given an array of daily temperatures, produce an output array where `answer[i]` is the number of days you have to wait after day i to get a warmer temperature. If no future day is warmer, `answer[i]` should be 0. The answer is about distance in days, not the actual temperature.

## Brute force

For each index i, scan every index j > i until you find `temperatures[j] > temperatures[i]`. Record `j - i` as the answer. This is O(n²) time and O(1) extra space. It is too slow for large inputs because every element rescans the array from its position forward.

## Key insight

When we encounter a temperature that is warmer than some previous day, we can resolve all previous unresolved days that were colder. If we maintain a stack of indices for days whose warmer future has not yet been found, the moment `temperatures[i] > temperatures[stack.top()]` we can pop and record the distance. The stack must be in decreasing temperature order so that only the correct days get resolved.

## Optimal approach

**Pattern: Monotonic decreasing stack of indices**

1. Initialise `int[] result = new int[n]` (defaults to 0, which is the "no warmer day" answer).
2. Create an `ArrayDeque<Integer>` stack to hold indices of unresolved days.
3. Iterate i from 0 to n-1:
   - While the stack is non-empty and `temperatures[i] > temperatures[stack.peek()]`:
     - Pop the top index `j`.
     - Set `result[j] = i - j` (days until the warmer day).
   - Push i onto the stack.
4. Any index remaining in the stack was never resolved — its answer stays 0.
5. Return `result`.

**Invariant:** The stack always holds indices in increasing order (bottom to top), and their corresponding temperatures are in non-increasing order (the stack is monotonically decreasing in temperature from bottom to top). When we push i, the current temperature is ≤ the temperature at the new top.

## Why this works

Each index is pushed exactly once and popped at most once, giving O(n) total operations. An index is popped when a warmer day is found — at that moment, the distance is exactly `i - j`. Indices left in the stack at the end have no warmer future day, so their pre-initialised 0 answer is correct.

## Complexity
- Time: O(n) because each index is pushed and popped at most once across all iterations
- Space: O(n) because in the worst case (strictly decreasing temperatures) all indices remain on the stack
