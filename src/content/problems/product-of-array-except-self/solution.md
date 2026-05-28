## Reference solution

**Complexity:** O(n) time, O(1) extra space (output array excluded).

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] output = new int[n];

        // Pass 1: fill output[i] with product of all elements to the LEFT of i
        output[0] = 1; // nothing to the left of index 0
        for (int i = 1; i < n; i++) {
            output[i] = output[i - 1] * nums[i - 1];
        }

        // Pass 2: multiply in the product of all elements to the RIGHT of i
        // Track right-side product in a single variable (no extra array needed)
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            output[i] *= rightProduct;   // incorporate right side
            rightProduct *= nums[i];     // extend right product leftward
        }

        return output;
    }
}
```

## Line-by-line notes
- **`output[0] = 1`:** Index 0 has no elements to its left, so its left-product is the multiplicative identity (1). This seeds the prefix-product recurrence.
- **`output[i] = output[i-1] * nums[i-1]`:** Each entry is the running product of all elements BEFORE i. We use `nums[i-1]` (the element immediately to the left) and `output[i-1]` (product of everything further left).
- **`rightProduct` starts at 1:** Mirrors the left-pass initialization. The rightmost element has nothing to its right.
- **`output[i] *= rightProduct` then `rightProduct *= nums[i]`:** Order matters. We multiply the accumulated right product INTO the output BEFORE extending it past `nums[i]`. This ensures `nums[i]` is excluded from `output[i]`'s contribution.

## Common bugs to avoid
- **Swapping the two lines in Pass 2:** If you do `rightProduct *= nums[i]` BEFORE `output[i] *= rightProduct`, you'd include `nums[i]` itself in `output[i]`, which is incorrect.
- **Allocating a separate `suffix[]` array:** Works but uses O(n) extra space. The interviewer will ask you to optimize. Use the running variable approach above.
- **Off-by-one in Pass 1:** `output[i] = output[i-1] * nums[i-1]` — you multiply the *previous* element of nums (i-1), not the current (i). It's easy to accidentally write `nums[i]`.
