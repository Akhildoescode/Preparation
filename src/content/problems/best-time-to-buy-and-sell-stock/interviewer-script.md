## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can prices be negative, or are they guaranteed non-negative?
- If no profit is possible—say prices are strictly decreasing—should I return 0 or a negative number?
- Is a same-day buy and sell allowed, i.e., profit of 0 counts?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to try every pair of days (i, j) with i < j and compute prices[j] minus prices[i], keeping track of the maximum. That gives us O(n²) time because we check every combination. With n up to 100,000 that's too slow, so we can do better."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that when I'm standing at day i deciding whether to sell, the best day to have bought is simply the cheapest day I've seen so far. So my approach is:
- Step 1: Track a running minimum price as I scan left to right.
- Step 2: At each day, compute the profit if I sell today: current price minus the running minimum.
- Step 3: Update the global max profit whenever that profit is larger.

Let me trace through a small example: prices = [7, 1, 5, 3, 6, 4].

- Day 0: price=7. minPrice=7, profit=0, maxProfit=0.
- Day 1: price=1 < minPrice. minPrice=1, maxProfit stays 0.
- Day 2: price=5. profit = 5-1 = 4. maxProfit=4.
- Day 3: price=3. profit = 3-1 = 2. maxProfit still 4.
- Day 4: price=6. profit = 6-1 = 5. maxProfit=5.
- Day 5: price=4. profit = 4-1 = 3. maxProfit still 5.

Answer is 5 — buy on day 1, sell on day 4."

### 4. State complexity before coding
"This will be O(n) time and O(1) space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with [7, 1, 5, 3, 6, 4] — we get 5, which matches. Now let me check an edge case: [7, 6, 4, 3, 1] — strictly decreasing. minPrice keeps updating but profit is always negative, so maxProfit stays 0. We correctly return 0. Looks correct. Any concerns about the approach or the code?"
