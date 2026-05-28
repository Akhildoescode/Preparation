## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        // append sentinel 0 to flush all remaining bars at the end
        var h = new int[heights.length + 1];
        System.arraycopy(heights, 0, h, 0, heights.length);
        // h[heights.length] is already 0 (Java default)

        var stack = new java.util.ArrayDeque<Integer>(); // monotonic increasing stack of indices
        int maxArea = 0;

        for (int i = 0; i < h.length; i++) {
            // pop every bar that is taller than the current bar
            while (!stack.isEmpty() && h[i] < h[stack.peek()]) {
                int j      = stack.pop();          // bar being resolved
                int height = h[j];
                // width: from just after the new stack top to just before i
                int width  = stack.isEmpty() ? i : (i - stack.peek() - 1);
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }

        return maxArea;
    }
}
```

## Line-by-line notes
- **Sentinel `h[n] = 0`:** A final bar shorter than everything forces all indices still on the stack to be popped and evaluated, eliminating a separate post-loop cleanup.
- **`h[i] < h[stack.peek()]`:** Strict less-than — when heights are equal, we do not pop; the current bar extends the rectangle of the equal-height bar rather than acting as its right boundary.
- **`width = stack.isEmpty() ? i : (i - stack.peek() - 1)`:** If the stack is empty after popping j, then j's rectangle can extend all the way to the left wall (index 0), so width = i. Otherwise, the new stack top is j's left boundary (exclusive), giving `i - newTop - 1`.
- **`int` arithmetic:** Heights ≤ 10⁴ and n ≤ 10⁵, so max area ≤ 10⁹, which fits in `int`. For safety with very large inputs, promote to `long`.

## Common bugs to avoid
- Using `<=` instead of `<` — popping on equal heights breaks the width calculation because you lose the correct left boundary index.
- Forgetting the sentinel — bars at the end of a non-decreasing sequence are never popped and their areas are never computed.
- Width formula: writing `i - stack.peek()` without the `- 1` — this over-counts by including the left-boundary bar itself in the width.
