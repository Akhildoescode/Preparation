## Reference solution

**Complexity:** O(amount × n) time, O(amount) space.

```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // sentinel: impossible value larger than any valid answer
        dp[0] = 0;                   // base case: 0 coins to make amount 0

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (coin <= a) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

## Line-by-line notes
- **`dp[a] = amount + 1` as sentinel:** `amount + 1` is impossible (you'd need more than `amount` coins of denomination 1 to exceed `amount`). Using `Integer.MAX_VALUE` causes overflow when adding 1. `amount + 1` is a safe impossible sentinel.
- **`dp[0] = 0`:** Zero coins needed to make amount zero. This is the foundation — all subproblems build from here.
- **Inner loop iterates all coins:** For each target amount `a`, try every coin denomination. If `coin ≤ a`, consider using one of that coin: it costs `dp[a - coin] + 1` coins.
- **`Math.min(dp[a], dp[a - coin] + 1)`:** Take the best option across all coin choices.
- **Bottom-up direction:** We fill `dp` from 1 to `amount`. When computing `dp[a]`, all `dp[a - coin]` values are already computed (since `coin > 0` means `a - coin < a`).
- **Final check `dp[amount] > amount`:** If the sentinel value persisted (no valid combination found), return -1.

## Trace for `coins=[1,2,5], amount=11`
```
dp[0]=0
dp[1]: coin=1→dp[0]+1=1, coin=2>1 skip, coin=5>1 skip → dp[1]=1
dp[2]: coin=1→dp[1]+1=2, coin=2→dp[0]+1=1 → dp[2]=1
dp[3]: coin=1→2, coin=2→dp[1]+1=2 → dp[3]=2
dp[5]: coin=1→4, coin=2→3, coin=5→dp[0]+1=1 → dp[5]=1
dp[11]: coin=5→dp[6]+1=3, coin=1→dp[10]+1=3 → dp[11]=3
```
Answer: 3 coins (5+5+1). ✓
