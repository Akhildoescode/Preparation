## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int maxProfit(int[] prices) {
        // Conceptual left pointer: the cheapest buy day seen so far.
        // Start at "infinity" so the first real price always wins.
        var minPrice = Integer.MAX_VALUE;

        // Best profit we've locked in across all sell days examined so far.
        var maxProfit = 0;

        for (var price : prices) {
            if (price < minPrice) {
                // Found a cheaper buy day — slide the left pointer here.
                // We cannot sell today (buy == sell day gives 0 profit, handled below).
                minPrice = price;
            } else {
                // Selling today at `price`, having bought at `minPrice`.
                // Only update if this beats our current best.
                maxProfit = Math.max(maxProfit, price - minPrice);
            }
        }

        // If prices were strictly decreasing, every candidate profit was negative
        // and maxProfit remained 0 — correctly signals "don't trade".
        return maxProfit;
    }
}
```

## Line-by-line notes
- **`minPrice = Integer.MAX_VALUE`:** Ensures the very first price unconditionally becomes the initial minimum without a special-case check.
- **`if (price < minPrice)`:** We update min before computing profit so we never "sell before we buy" — the else branch only runs when price >= minPrice.
- **`Math.max(maxProfit, price - minPrice)`:** The subtraction is always non-negative here, so maxProfit can never be driven below 0 by this line.
- **Return `maxProfit` (initialized to 0):** Handles the no-profit case (empty array or strictly decreasing prices) without any extra branch.

## Common bugs to avoid
- **Updating minPrice and profit in the wrong order:** If you compute profit first then update minPrice, you may use a stale minimum for the current index—though in this two-branch structure it cannot happen, it does matter in single-expression rewrites.
- **Returning a negative profit:** Forgetting to initialize `maxProfit = 0` and instead initializing to `Integer.MIN_VALUE` will return a negative number when prices only fall.
- **Off-by-one on indices:** Iterating `i` from 1 but initializing `minPrice = prices[0]` is fine, but iterating from 0 with `prices[-1]` would throw—use the for-each loop to avoid index mistakes entirely.
