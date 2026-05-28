## Understanding the problem

You are given an array `prices` where `prices[i]` is the stock price on day `i`. You may complete exactly one buy-sell transaction, and you must buy before you sell. The goal is to return the maximum profit achievable, or 0 if no profit is possible.

## Brute force

Try every pair of days (i, j) where i < j and compute `prices[j] - prices[i]`. Track the maximum of all such differences. This is O(n²) time because there are n*(n-1)/2 pairs to check—for n = 100,000 that is roughly 5 billion operations, which is far too slow.

## Key insight

You do not need to reconsider all previous days at each step. When you reach day `i`, the best day to have bought is always the day with the lowest price seen so far. So a single left-to-right pass tracking `minPrice` is sufficient—this is the greedy insight that collapses O(n²) to O(n).

## Optimal approach

Pattern: **sliding window / greedy two-pointer** (implicit left = buy day, right = sell day).

1. Initialize `minPrice = Integer.MAX_VALUE` and `maxProfit = 0`.
2. For each price in the array:
   a. If `price < minPrice`, update `minPrice = price` (found a cheaper buy day).
   b. Otherwise, compute `profit = price - minPrice` and update `maxProfit = max(maxProfit, profit)`.
3. Return `maxProfit`.

The left pointer conceptually sits at the current `minPrice` day; the right pointer scans forward. Whenever the right pointer finds a lower price than the left, both conceptually move to that new day.

## Why this works

At every position `i`, `minPrice` holds the lowest price on any day 0..i. Therefore `prices[i] - minPrice` is the best possible profit if we sell on day `i`. Taking the maximum of this over all days yields the global optimum. No valid pair (buy, sell) is ever skipped because we always know the cheapest prior buy day.

## Complexity
- Time: O(n) because we make exactly one pass through the array of length n.
- Space: O(1) because we only store two scalar variables regardless of input size.
