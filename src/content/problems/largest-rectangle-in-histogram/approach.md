## Understanding the problem

Given an array of non-negative integers representing bar heights in a histogram (each bar has width 1), find the area of the largest rectangle that can be formed using one or more consecutive bars. The rectangle must fit within the bounds of the bars it spans — its height is limited by the shortest bar in the span.

## Brute force

For every pair of indices (left, right), find the minimum height in heights[left..right] and compute area = minHeight × (right - left + 1). Take the maximum over all pairs. This is O(n²) time (O(n³) if you recompute the minimum naively, O(n²) with a precomputed minimum). It is too slow because we re-examine every pair.

## Key insight

A bar at index i can extend leftward as long as all bars to its left are at least as tall, and rightward as long as all bars to its right are at least as tall. The largest rectangle with height `heights[i]` is bounded on both sides by the nearest shorter bar. A monotonic increasing stack tells us, at the moment we pop a bar, exactly what its left and right boundaries are: the right boundary is the current index i (the bar that triggered the pop), and the left boundary is the new stack top after popping.

## Optimal approach

**Pattern: Monotonic increasing stack of indices**

1. Append a sentinel `0` to the end of the heights array. This forces all remaining bars off the stack at the end without a separate cleanup loop.
2. Initialise an `ArrayDeque<Integer>` stack.
3. Iterate i from 0 to heights.length - 1 (including the sentinel):
   - While the stack is non-empty and `heights[i] < heights[stack.peek()]`:
     - Pop index `j` (the bar being resolved).
     - Height = `heights[j]`.
     - Width = stack is empty ? i : (i - stack.peek() - 1).
     - Update maxArea with height × width.
   - Push i.
4. Return maxArea.

**Invariant:** The stack always holds indices in increasing order (bottom to top) with non-decreasing heights. Every index in the stack is a candidate whose rectangle has not yet found its right boundary.

## Why this works

When `heights[i] < heights[j]` (the trigger to pop j), index i is the first bar to the right of j that is shorter — this is j's right boundary. The stack top after popping j is the last bar to the left of j that is shorter — this is j's left boundary. The width formula `i - stack.peek() - 1` captures the full extent of bars that are all at least as tall as `heights[j]`. The sentinel 0 guarantees every bar is popped and evaluated.

## Complexity
- Time: O(n) because each index is pushed and popped at most once
- Space: O(n) because in the worst case (non-decreasing heights) all indices remain on the stack before the sentinel triggers all pops
