## Reference solution

**Complexity:** O(n log(max(piles))) time, O(1) space.

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1;
        int hi = 0;
        for (int pile : piles) hi = Math.max(hi, pile); // hi = max pile size

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (canFinish(piles, mid, h)) {
                hi = mid;   // feasible — try slower
            } else {
                lo = mid + 1; // not feasible — must go faster
            }
        }

        return lo;
    }

    private boolean canFinish(int[] piles, int speed, int h) {
        int hours = 0;
        for (int pile : piles) {
            // Integer ceiling division: ceil(pile / speed)
            hours += (pile + speed - 1) / speed;
            if (hours > h) return false; // early exit — already exceeded
        }
        return true;
    }
}
```

## Line-by-line notes
- **`hi = max(piles)`:** The maximum useful speed is `max(piles)` — eating faster than the biggest pile still takes 1 hour for that pile. Any speed above this is equivalent.
- **`while (lo < hi)` with `hi = mid`:** This is the "left-boundary" binary search variant. It finds the minimum index where a condition becomes true. When feasible: `hi = mid` (not `mid - 1`) because `mid` itself might be the answer. When not: `lo = mid + 1`.
- **`(pile + speed - 1) / speed`:** Integer ceiling division without floating point. Equivalent to `Math.ceil((double) pile / speed)` but avoids floating-point precision issues.
- **`if (hours > h) return false`:** Early exit once total hours exceed `h` — no need to process remaining piles. Saves time for large inputs.

## Common bugs to avoid
- **`hi = mid - 1` in the feasible branch:** This would skip the current `mid` as a candidate, potentially missing the minimum. Use `hi = mid` to keep `mid` in the search space.
- **Floating-point ceiling division:** `(int) Math.ceil((double) pile / speed)` works but can have precision issues for very large pile values. Integer ceiling `(pile + speed - 1) / speed` is exact.
- **Starting `hi` at `Integer.MAX_VALUE`:** Works logically but causes more iterations. Using `max(piles)` as the tighter upper bound is cleaner and slightly faster.
