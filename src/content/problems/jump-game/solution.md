## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;  // farthest index reachable from any position seen so far

        for (int i = 0; i < nums.length; i++) {
            // If current index is beyond our reach, we cannot continue
            if (i > maxReach) return false;

            // Extend the frontier: from index i, we can reach up to i + nums[i]
            maxReach = Math.max(maxReach, i + nums[i]);
        }

        // Reached (or passed) the last index
        return true;
    }
}
```

## Line-by-line notes
- **`maxReach = 0`:** We start at index 0, which is trivially reachable. The farthest we can reach initially is whatever nums[0] allows — but we update it inside the loop.
- **`if (i > maxReach) return false`:** A gap exists between index i and the last reachable position. No sequence of jumps can cross this gap.
- **`maxReach = Math.max(maxReach, i + nums[i])`:** `i + nums[i]` is the farthest we can jump from index i. We keep the overall maximum across all visited indices.
- **`return true` at loop end:** If the loop completes without returning false, every index from 0 to n-1 was reachable.

## Common bugs to avoid
- **Returning false when `i >= maxReach`:** The condition should be `i > maxReach` (strictly greater). When `i == maxReach`, we're exactly at the frontier — still reachable.
- **Updating maxReach even when stuck:** In some implementations, the check and update order is swapped. Check `i > maxReach` *before* updating to avoid counting an unreachable index's jump.
- **Not handling n=1:** Single-element array — already at the destination. The loop runs once (i=0), `i > maxReach` is false (0 > 0 is false), returns true. Correct.
