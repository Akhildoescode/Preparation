## Understanding the problem
Koko has `piles` of bananas and `h` hours before the guards return. Each hour she eats up to `k` bananas from ONE pile (any remainder stays). Find the minimum integer speed `k` such that she finishes all piles within `h` hours. For a pile of `p` bananas at speed `k`, she needs `ceil(p / k)` hours.

## Brute force
Try speeds from 1 upward: for each speed, compute total hours needed. Return the first speed where total hours ≤ h. O(max(piles) × n) — too slow.

## Key insight
Binary search on the **answer space**: speed `k` ranges from 1 to `max(piles)`. For any speed `k`, we can compute in O(n) whether it's feasible. The feasibility function is **monotone**: if speed `k` works, any speed `k' > k` also works. Binary search finds the minimum feasible speed in O(n log(max(piles))).

## Optimal approach — Binary Search on Answer
- `lo = 1`, `hi = max(piles)`.
- While `lo < hi`:
  - `mid = lo + (hi - lo) / 2`.
  - If `canFinish(piles, mid, h)` → try slower: `hi = mid`.
  - Else → need faster: `lo = mid + 1`.
- Return `lo`.

**`canFinish(piles, speed, h)`:** Sum `ceil(pile / speed)` for all piles. Return `totalHours <= h`.

**Key:** `ceil(p / k)` in integer arithmetic = `(p + k - 1) / k` = `(int) Math.ceil((double) p / k)`.

Trace `piles=[3,6,7,11]`, h=8:
- lo=1, hi=11.
- mid=6: hours=ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)=1+1+2+2=6 ≤ 8 → feasible. hi=6.
- mid=3: hours=1+2+3+4=10 > 8 → not feasible. lo=4.
- mid=5: hours=1+2+2+3=8 ≤ 8 → feasible. hi=5.
- mid=4: hours=1+2+2+3=8 ≤ 8 → feasible. hi=4.
- lo=hi=4 → return 4. ✓

## Why this works
The feasibility function is monotonically non-increasing: higher speed → fewer hours. Binary searching on the answer finds the minimum feasible speed in O(log(max)) iterations, each O(n). 

## Complexity
- Time: O(n log(max(piles))).
- Space: O(1).
