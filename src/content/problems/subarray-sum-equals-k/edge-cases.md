## Cases to mention to the interviewer

- **k = 0 with all zeros:** `[0, 0, 0]`, k=0. Every subarray (of which there are n(n+1)/2 = 6) sums to 0. The prefix sum is always 0, so `currentSum - k = 0` is always in the map with an increasing count. Correct.
- **k = 0 with mixed values:** `[1, -1, 1, -1]`, k=0. Subarrays: [1,-1], [-1,1], [1,-1], [1,-1,1,-1] = 4 subarrays. The algorithm counts each correctly through prefix sum coincidences.
- **Negative numbers:** `[-1, -1, 1]`, k=-2. Expected: 1 (subarray [-1,-1]). Prefix sums: 0,-1,-2,-1. At index 2 (sum=-2): look for -2-(-2)=0 → seen once → count=1. ✓
- **Single element equals k:** `[5]`, k=5. sum=5, look for 0 → found once (seeded). count=1. ✓
- **No valid subarray:** `[1, 2, 3]`, k=10. Max possible sum is 6 < 10. All lookups return 0. count=0. ✓
- **Large k (negative):** `[1, 2, 3]`, k=-1. No subarray of positive numbers sums to -1. count=0. ✓
- **Integer overflow risk:** With n=2×10⁴ elements each at ±10⁷ (the problem's actual constraints are -1000 to 1000, so no overflow issue), but in general with large arrays of large values, the prefix sum could overflow a 32-bit int. Use `long` if needed.
