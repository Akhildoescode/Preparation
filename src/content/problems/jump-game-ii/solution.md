## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int jump(int[] nums) {
        int jumps   = 0;   // number of jumps made so far
        int curEnd  = 0;   // farthest index in the current jump level
        int farthest = 0;  // farthest index reachable from the current level

        // Stop at n-2: we never need to jump from the last index
        for (int i = 0; i < nums.length - 1; i++) {
            // Extend the farthest reach possible from the current level
            farthest = Math.max(farthest, i + nums[i]);

            if (i == curEnd) {
                // We've exhausted all positions in the current level — must jump
                jumps++;
                curEnd = farthest;
            }
        }

        return jumps;
    }
}
```

## Line-by-line notes
- **Loop `i < nums.length - 1`:** We never jump *from* the last index, so we stop one before it. If curEnd reaches n-1 inside the loop, the condition `i == curEnd` may trigger a final jump — we set curEnd = farthest before returning, which is fine since we return immediately after the loop.
- **`farthest = Math.max(farthest, i + nums[i])`:** Track the farthest any index in the current level can reach. This becomes `curEnd` for the next level.
- **`if (i == curEnd)`:** End of the current "BFS level" — commit to the next jump and advance `curEnd`.

## Common bugs to avoid
- **Looping through `i < nums.length` (including last index):** If the last index has a large value, we'd unnecessarily increment jumps. The loop should be `i < nums.length - 1`.
- **`curEnd = farthest` outside of `if (i == curEnd)`:** If you update curEnd every iteration (not just when committing a jump), you advance through multiple levels in one jump, overcounting.
- **Forgetting `farthest` tracks the maximum across all positions in the level:** A common mistake is resetting `farthest` to 0 when jumping — it should remain the max from all explored positions.
