## Cases to mention to the interviewer

- **Empty input:** If `prices` is empty or null, there are no days to trade, so the answer is 0. The for-each loop body never executes and we return the initial `maxProfit = 0` safely.

- **Single element:** With only one price, you cannot both buy and sell on different days. Profit is 0. The loop runs once, updates `minPrice`, but the else branch never runs, so `maxProfit` stays 0.

- **Strictly decreasing prices (e.g., [5, 4, 3, 2, 1]):** Every day is a new minimum, so the else branch never fires and we correctly return 0 — meaning "don't trade."

- **All prices equal (e.g., [3, 3, 3, 3]):** `price < minPrice` is false after day 0; every else branch computes profit = 0. We return 0, which is correct since there is no profit to be made.

- **Single large spike at the end (e.g., [1, 1, 1, 1, 10000]):** minPrice stays 1 throughout; on the last day profit = 9999 is captured. Verify the algorithm doesn't miss end-of-array sells.

- **Integer overflow risk:** `prices[i]` is at most 10,000 per LeetCode constraints, so `price - minPrice` fits in an `int`. If constraints were relaxed to 32-bit prices, the difference could overflow; in that case use `long`.
