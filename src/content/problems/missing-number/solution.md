## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        // Gauss formula: sum of 0..n is n*(n+1)/2
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int num : nums) actual += num;
        return expected - actual;
    }
}
```

## Line-by-line notes
- **`n = nums.length`:** Since nums has n elements covering [0..n] with one gap, n is also the maximum possible value (the range is 0 to nums.length).
- **`n * (n + 1) / 2`:** Gauss's formula for the sum of integers 0 through n. For n=3: 3*4/2 = 6 (sum of 0+1+2+3).
- **Subtraction:** `expected - actual` gives exactly the missing value. Works because all other values appear exactly once in both the expected sum and the actual sum — they cancel out.

## Alternative XOR solution

```java
class Solution {
    public int missingNumber(int[] nums) {
        int xor = nums.length;  // start with n (the index that has no matching value)
        for (int i = 0; i < nums.length; i++) {
            xor ^= i ^ nums[i];  // XOR each index with its array value
        }
        return xor;
    }
}
```

## Common bugs to avoid
- **Integer overflow in `n * (n + 1) / 2`:** For n up to 10^4, n*(n+1)/2 ≤ ~5×10^7, within int range. For very large n, cast to long: `(long)n * (n + 1) / 2`.
- **Off-by-one in XOR approach:** The range is [0, n] inclusive, so XOR includes index n but the array only has indices 0..n-1. Starting with `xor = nums.length` (which equals n) covers this.
- **Using `expected - actual` vs `actual - expected`:** expected ≥ actual (the missing value is positive), so the correct subtraction order is `expected - actual`.
