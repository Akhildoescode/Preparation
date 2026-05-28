## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int maxArea(int[] height) {
        var l = 0;
        var r = height.length - 1;
        var maxWater = 0;

        while (l < r) {
            // Water height is capped by the shorter wall; width is r - l.
            var water = Math.min(height[l], height[r]) * (r - l);
            maxWater = Math.max(maxWater, water);

            // The shorter wall is the binding constraint.
            // Moving the taller pointer inward keeps the same height cap
            // but reduces width — strictly worse or equal.
            // Moving the shorter pointer might find a taller wall that compensates.
            if (height[l] <= height[r]) {
                l++;   // Retire left line; it can never produce a better answer.
            } else {
                r--;   // Retire right line for the same reason.
            }
        }

        return maxWater;
    }
}
```

## Line-by-line notes
- **`Math.min(height[l], height[r]) * (r - l)`:** The width `(r - l)` is in index units, which equals physical distance since lines are unit-spaced. No off-by-one: two adjacent lines have width 1.
- **`if (height[l] <= height[r])`:** The `<=` means ties move the left pointer; either is correct for ties since both walls have equal height — the choice is arbitrary and does not affect correctness.
- **`l < r` loop condition:** The loop stops as soon as pointers cross. At that moment every pair has been either evaluated or provably dominated.

## Common bugs to avoid
- **Moving the taller pointer:** A tempting mistake is to move the pointer on the side with more "room to grow." Always move the shorter one — the proof of correctness hinges on this.
- **Integer overflow:** `height[i]` can be up to 10,000 and `n` up to 100,000, so the product fits easily in `int` (max ~10^9). If constraints were larger, cast to `long` before multiplying.
- **Using `>` instead of `>=` in the tie-breaking condition:** Either `<=` or `<` works for correctness, but `<` would move `r` on ties — make sure you are consistent and understand why both are valid.
