## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0;  // sum of all (gas[i] - cost[i]) — determines if a solution exists
        int tank     = 0;  // running tank balance from the current candidate start
        int start    = 0;  // current candidate starting station

        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            totalGas += diff;
            tank     += diff;

            if (tank < 0) {
                // Can't reach station i+1 from 'start' — eliminate all stations 0..i
                start = i + 1;
                tank  = 0;  // reset tank for the new candidate
            }
        }

        // If total gas < total cost, no solution exists
        return totalGas >= 0 ? start : -1;
    }
}
```

## Line-by-line notes
- **`totalGas` vs `tank`:** `totalGas` accumulates the global net gas (to check feasibility). `tank` tracks the local running balance from the current `start` candidate.
- **`start = i + 1`:** Stations 0 through i are eliminated. We try i+1 next. Note that `start` might go out of bounds if all stations are eliminated — but in that case `totalGas < 0` so we return -1.
- **`tank = 0`:** Reset the local tank for the new candidate start. We conceptually "restart" the simulation from station i+1.
- **`return totalGas >= 0 ? start : -1`:** If the total supply ≥ total consumption, a valid start exists, and it's the last `start` value from our greedy elimination.

## Common bugs to avoid
- **Checking `tank < 0` with `<=`:** If `tank == 0`, we exactly break even — still a valid position to be (empty tank, just enough). Use strict `< 0`.
- **Not tracking `totalGas` separately:** Using only `tank` and resetting it means you lose the global feasibility check. You need both.
- **`start = i` instead of `start = i + 1`:** Station i itself causes the tank to go negative — it cannot be the start. The new candidate is i+1.
