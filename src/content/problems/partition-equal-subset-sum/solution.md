## Reference solution

**Complexity:** O(n * sum/2) time, O(sum/2) space.

```java
class Solution {
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int n : nums) totalSum += n;

        // Odd total sum cannot be split into two equal parts
        if (totalSum % 2 != 0) return false;

        int target = totalSum / 2;

        // dp[s] = true if sum s is achievable with a subset of elements seen so far
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;  // empty subset achieves sum 0

        for (int num : nums) {
            // Iterate high-to-low to use each element at most once (0/1 knapsack)
            for (int s = target; s >= num; s--) {
                dp[s] |= dp[s - num];
            }
            if (dp[target]) return true;  // early exit
        }

        return dp[target];
    }
}
```

## Line-by-line notes
- **`totalSum % 2 != 0` check:** If the sum is odd, it's impossible to split into two equal integer subsets.
- **`dp[0] = true`:** Base case — the empty subset has sum 0.
- **`for (int s = target; s >= num; s--)`:** Iterating from high to low is the key 0/1 knapsack trick. If we went low-to-high, `num` could be "added" multiple times in the same pass.
- **`dp[s] |= dp[s - num]`:** If sum `s - num` was achievable before adding `num`, then sum `s` is achievable by including `num` in that subset.
- **`if (dp[target]) return true`:** Early termination — once we know the target is reachable, stop.

## Common bugs to avoid
- **Iterating low-to-high instead of high-to-low:** Using `for (int s = num; s <= target; s++)` allows `num` to be used multiple times (unbounded knapsack), which is wrong for this problem.
- **`dp[s] = dp[s - num]` instead of `dp[s] |= dp[s - num]`:** Assignment overwrites the previous reachability of sum s without including num — must OR to keep it true if it was already reachable.
- **`dp = new boolean[target]` instead of `new boolean[target + 1]`:** Need indices 0 through target inclusive.
