## Cases to mention to the interviewer

- **Single pile:** `piles = [10], h = 1` → must eat all 10 in 1 hour → answer is 10 (the pile itself). Binary search: lo=1, hi=10. When speed=10: hours=1 ≤ 1, feasible → hi=10. Converges to 10.
- **h equals number of piles:** Each pile must be eaten in exactly 1 hour → answer is `max(piles)`. You can't split an hour, so any speed below max causes a pile to overflow. E.g., `piles=[3,6,7,11], h=4` → answer is 11.
- **h much larger than piles.length:** Answer approaches 1. `piles=[3,6,7,11], h=1000` → speed=1 works (takes 3+6+7+11=27 hours ≤ 1000). Answer is 1.
- **All piles equal:** `piles=[5,5,5], h=3` → answer is 5. `piles=[5,5,5], h=6` → answer is 3 (ceil(5/3)=2 per pile × 3 piles = 6 hours — but ceil(5/3) = 2, so 2×3=6 ≤ 6 ✓, speed=2 works; check speed=1: ceil(5/1)=5 per pile × 3 = 15 > 6, no. Speed=2 is minimum). Answer is 3? Wait: speed=2: ceil(5/2)=3 hours per pile × 3 = 9 > 6. Speed=3: ceil(5/3)=2 × 3 = 6 ≤ 6. So answer is 3.
- **Pile of size 1:** `piles=[1,1,1], h=3` → answer is 1. Any positive speed ≥ 1 finishes each pile in 1 hour.
- **Integer overflow in hours sum:** With n=10⁴ piles each of size 10⁹, and speed=1, total hours = 10¹³ which overflows int. The early-exit `if (hours > h) return false` mitigates this in practice because h ≤ 10⁹, but accumulating before comparing could overflow. Using `long` for the hours counter is safer.
- **Ceiling division correctness:** For pile=7, speed=3: (7 + 3 - 1) / 3 = 9/3 = 3 = ceil(7/3) ✓. For pile=6, speed=3: (6 + 3 - 1) / 3 = 8/3 = 2 = ceil(6/3) ✓. For pile=1, speed=10: (1 + 10 - 1) / 10 = 10/10 = 1 = ceil(1/10) ✓.
