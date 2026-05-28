## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int maxSubArray(int[] nums) {
        // Initialize both to first element — handles all-negative case correctly
        int currentSum = nums[0];
        int maxSum = nums[0];

        // Start from index 1; nums[0] is already accounted for
        for (int i = 1; i < nums.length; i++) {
            // Either extend the current subarray or start fresh at nums[i]
            currentSum = Math.max(nums[i], currentSum + nums[i]);

            // Track the global best ending seen at any position
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}
```

## Line-by-line notes
- **Initialize to `nums[0]`:** Starting at 0 (instead of `Integer.MIN_VALUE`) correctly handles the all-negative case. If all elements are negative, `currentSum` will always pick the single element (the restart branch wins every time), and `maxSum` will be the largest (least-negative) element.
- **Loop from i=1:** We've already processed index 0 in the initialization. Starting from 1 avoids an off-by-one and keeps the logic clean.
- **`Math.max(nums[i], currentSum + nums[i])`:** This is the heart of Kadane's. If `currentSum` is negative, `currentSum + nums[i] < nums[i]`, so we restart. If `currentSum` is positive, extending is beneficial.
- **Two separate `Math.max` calls:** Don't combine them into one line. Keeping `currentSum` update and `maxSum` update separate makes the logic readable and lets you add index tracking later (if asked to return the subarray, not just the sum).

## Common bugs to avoid
- **Initializing to 0:** If all numbers are negative (e.g., `[-5]`), returning 0 would be wrong — the answer must be a non-empty subarray.
- **Using `currentSum = 0` as the restart sentinel:** Setting `currentSum = max(0, currentSum + nums[i])` appears in some tutorials but incorrectly returns 0 for all-negative inputs.
- **Forgetting to update `maxSum` inside the loop:** If you only check at the end, you'll return `currentSum` which is the best subarray ending at the *last* element, not the global best.
