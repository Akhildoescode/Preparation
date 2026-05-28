## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int maxLeft = 0, maxRight = 0;
        int water = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                // Left side is the bottleneck — process it
                maxLeft = Math.max(maxLeft, height[left]);
                water += maxLeft - height[left]; // never negative: maxLeft >= height[left]
                left++;
            } else {
                // Right side is the bottleneck — process it
                maxRight = Math.max(maxRight, height[right]);
                water += maxRight - height[right];
                right--;
            }
        }

        return water;
    }
}
```

## Line-by-line notes
- **`if (height[left] <= height[right])`:** We process the side with the smaller or equal current height. The water at the chosen side is guaranteed to be bounded by its own max (not the other side's max), because the other side has at least that height.
- **`maxLeft = Math.max(maxLeft, height[left])`:** Always update the running max BEFORE computing water. This ensures `maxLeft - height[left]` is never negative (if height[left] > maxLeft, the bar is taller than all bars to the left, so no water is trapped above it — the term becomes 0 because maxLeft equals height[left] after the max call).
- **`water += maxLeft - height[left]`:** When height[left] equals maxLeft (the current bar is the tallest so far), this adds 0. Correct — no water above the tallest bar seen from the left.
- **`left++` / `right--`:** After processing, advance the pointer inward. The pointers always move toward each other, guaranteeing O(n) total steps.

## Common bugs to avoid
- **Updating max after computing water:** If you compute water before updating maxLeft, you'll use the stale maxLeft (one step behind), potentially adding negative water or a wrong amount.
- **Using strict `<` instead of `<=`:** Both sides are equivalent when `height[left] == height[right]`, so `<=` is correct for either branch. Consistency matters — pick one and stick to it.
- **Off-by-one on initialization:** Starting left or right one step in from the edge would miss the boundary bars, leading to incorrect max values.
