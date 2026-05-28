## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        // dp[0] = 0 by default (Java initializes int arrays to 0)

        for (int i = 1; i <= n; i++) {
            // Right-shift removes the LSB; add 1 if i is odd (LSB was 1)
            dp[i] = dp[i >> 1] + (i & 1);
        }

        return dp;
    }
}
```

## Line-by-line notes
- **`dp[0] = 0` (implicit):** Java initializes `int[]` to all zeros, so `dp[0]` is correct without an explicit assignment.
- **`dp[i >> 1]`:** Looks up the Hamming weight of `i / 2` (integer division), already computed since `i >> 1 < i`.
- **`(i & 1)`:** 1 if i is odd (LSB is 1), 0 if i is even. This is the contribution of the least significant bit.
- **Single pass, O(1) per element:** No inner bit-counting loop — each `dp[i]` is computed in constant time.

## Common bugs to avoid
- **`dp[i / 2]` instead of `dp[i >> 1]`:** Both give the same result for non-negative integers — `i / 2` is equivalent to `i >> 1` in Java for non-negative i. Either works; `>>` is conventional for bit problems.
- **Starting the loop at i=0:** `dp[0] = dp[0] + (0 & 1) = 0 + 0 = 0` — technically harmless, but redundant since Java initializes to 0. Start from i=1.
- **Off-by-one: allocating `new int[n]` instead of `new int[n+1]`:** The problem asks for ans[0] through ans[n], requiring n+1 elements.
