## Understanding the problem
There are n gas stations arranged in a circle. Station i has gas[i] liters and costs cost[i] to reach the next station. Starting with an empty tank, find the starting station index to complete a full circular route, or return -1 if no such starting point exists. The solution is guaranteed to be unique if it exists.

## Brute force
Try each station as a starting point, simulate the circuit, and check if the tank stays non-negative. O(n²) time.

## Key insight
**Insight 1 (existence):** If the total gas sum ≥ total cost sum, a valid starting point always exists (not intuitive — requires proof, but always true for this problem).

**Insight 2 (finding the start):** Simulate the circuit from station 0. Maintain `tank` (current fuel). If `tank` drops below 0 at some station j, we know no station from 0 to j can be the valid starting point (each would have an even lower tank at j). Reset `tank = 0` and try starting from j+1.

## Optimal approach
```
totalGas = 0, tank = 0, start = 0
for i from 0 to n-1:
    diff = gas[i] - cost[i]   // net gain at station i
    totalGas += diff
    tank += diff
    if tank < 0:
        start = i + 1          // stations 0..i can't be the start
        tank = 0               // reset tank for the new candidate start
return totalGas >= 0 ? start : -1
```

## Why this works
If the running `tank` goes negative after station i, any starting station between `start` (current candidate) and i would also run out of fuel before or at station i — because starting later means you've accumulated less gas up to station i. So station i+1 becomes the next candidate. After one pass, if `totalGas >= 0`, the last candidate `start` is valid (by the global-sum argument). The single pass guarantees O(n) time.

## Complexity
- Time: O(n) — one pass through all stations
- Space: O(1) — only four variables
