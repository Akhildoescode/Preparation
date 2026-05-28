## Reference solution

**Complexity:** O(k) time where k = number of set bits (≤ 32), O(1) space.

```java
class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            // n & (n-1) clears the lowest set bit of n
            // Each iteration removes exactly one '1' bit
            n &= (n - 1);
            count++;
        }
        return count;
    }
}
```

## Line-by-line notes
- **`n != 0` as loop condition:** When n becomes 0, all set bits have been counted. Safe for both positive and negative inputs since we're checking the value, not the sign.
- **`n &= (n - 1)`:** The Brian Kernighan's algorithm step. Always clears the rightmost '1' bit. Applying it k times brings n to 0, where k is the Hamming weight.
- **Why not `n >>= 1` (signed shift)?:** Signed right-shift on a negative int fills the vacated bit with 1 (sign extension), creating an infinite loop. If using a shift-based approach, always use `n >>>= 1` (unsigned right-shift).

## Common bugs to avoid
- **Using `>>` instead of `>>>` in a shift-based approach:** On negative integers, `>>` causes infinite loops because it fills in 1s from the left.
- **Checking `n > 0` instead of `n != 0`:** For negative integers (where the sign bit is 1), this condition is immediately false — you'd return 0 without counting the sign bit.
- **Forgetting to increment count before clearing the bit:** `n &= (n-1)` first, then `count++` — the order doesn't matter here, but some variations get confused about when to count.
