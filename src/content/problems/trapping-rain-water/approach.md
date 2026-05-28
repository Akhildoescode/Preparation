## Understanding the problem
Given an elevation map as an integer array where each element is the height of a bar, compute how much rainwater can be trapped after it rains. Water is trapped between bars when a shorter bar is surrounded by taller bars on both sides. Each unit is 1 wide.

## Brute force
For each position i, find the tallest bar to its left (`maxLeft`) and the tallest to its right (`maxRight`). Water at i = `max(0, min(maxLeft, maxRight) - height[i])`. Scanning left/right for each i is O(n²).

## Key insight (Two Pointers)
Water at position i = `min(maxLeft, maxRight) - height[i]`. We don't need the exact global max on each side — we need whichever side is the bottleneck (the minimum). If `maxLeft < maxRight`, the left side determines the water level at i, regardless of what's to the right. We can process the left side immediately without knowing the full right side. Two pointers from both ends captures this.

## Optimal approach — Two Pointers
- Initialize `left = 0`, `right = n-1`, `maxLeft = 0`, `maxRight = 0`, `water = 0`.
- While `left < right`:
  - If `height[left] <= height[right]`:
    - Update `maxLeft = max(maxLeft, height[left])`.
    - Add `maxLeft - height[left]` to water (water level is determined by left side).
    - `left++`.
  - Else:
    - Update `maxRight = max(maxRight, height[right])`.
    - Add `maxRight - height[right]` to water.
    - `right--`.

The side with the smaller current height gets processed because we know the other side has at least as tall a wall — so the smaller side is the bottleneck.

Trace `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`:
- l=0(0), r=11(1): h[l]=0 ≤ h[r]=1 → maxL=0, water+=0-0=0, l++
- l=1(1), r=11(1): h[l]=1 ≤ h[r]=1 → maxL=1, water+=1-1=0, l++
- l=2(0), r=11(1): maxL=1, water+=1-0=1, l++
- ... continuing → total = 6. ✓

## Why this works
The key invariant: when processing the left pointer, we know `maxRight >= height[right] >= maxLeft` (because we're on the left branch). So the water at `left` is bounded by `maxLeft`, not `maxRight`. We never need to look right to compute this. Symmetric argument for the right pointer.

## Complexity
- Time: O(n) — one pass with two pointers.
- Space: O(1) — four scalar variables.
