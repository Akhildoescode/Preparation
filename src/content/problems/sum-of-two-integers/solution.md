## Reference solution

**Complexity:** O(1) time (at most 32 iterations), O(1) space.

```java
class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            // Carry: positions where both a and b have a 1-bit, shifted left
            int carry = (a & b) << 1;
            // Sum without carry: XOR gives bit-by-bit addition ignoring carry
            a = a ^ b;
            // Next iteration: add the carry into the running sum
            b = carry;
        }
        return a;
    }
}
```

## Line-by-line notes
- **`(a & b) << 1`:** `a & b` finds the bit positions where both a and b are 1 — these produce a carry into the next higher bit. Left-shifting by 1 places the carry in the correct position.
- **`a = a ^ b`:** XOR computes the sum of each bit position without carry — 1+0=1, 0+1=1, 0+0=0, 1+1=0 (carry handled separately).
- **`b = carry`:** The new "b" is the carry from this round. Next iteration adds the carry into the current sum.
- **Loop terminates:** Each iteration, the carry can only have set bits at positions where both a and b had 1s *before the shift*. The carry bits move left each time and eventually shift out of the 32-bit range, making carry = 0.

## Common bugs to avoid
- **`carry = (a & b)` without the `<< 1`:** Forgetting to shift left means the carry is added at the wrong position — produces wrong answers for any input that generates a carry.
- **Computing carry after updating a:** If you write `a = a ^ b; carry = (a & b) << 1;` (wrong order), the carry uses the new a (which already incorporated b), producing incorrect results. Always compute carry first.
- **Infinite loop concern for negative inputs:** Java's int is 32-bit two's complement. For negative inputs, `(a & b) << 1` may produce different bit patterns, but the carry bits still shift left each iteration — termination is guaranteed in ≤ 32 iterations.
