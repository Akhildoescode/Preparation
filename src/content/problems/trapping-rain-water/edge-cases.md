## Cases to mention to the interviewer

- **Flat terrain:** `[3, 3, 3]`. No elevation difference, no water trapped. The algorithm correctly adds 0 at each step because height equals maxLeft (or maxRight).
- **Monotonically increasing:** `[1, 2, 3, 4]`. No water — each bar is the new max from one side. Algorithm adds 0 everywhere.
- **Monotonically decreasing:** `[4, 3, 2, 1]`. No water — same reason, from the other side.
- **Single pit:** `[3, 0, 3]`. Water at index 1 = min(3,3) - 0 = 3. Algorithm: left=0(3)≤right=2(3) → maxL=3, water+=3-3=0, left→1. Now left=1(0)≤right=2(3) → maxL=3, water+=3-0=3, left→2. left≥right. Total: 3. ✓
- **Left wall shorter:** `[1, 0, 3]`. Water at index 1 = min(1, 3) - 0 = 1. Algorithm correctly uses left side (1, the bottleneck). Total water: 1.
- **Multiple valleys:** `[4, 2, 0, 3, 2, 5]`. Expected: 9. The two-pointer approach accumulates water correctly across multiple valleys without needing to identify them separately.
- **All zeros:** `[0, 0, 0]`. Water = 0. maxLeft and maxRight remain 0, so every `maxLeft - height[i]` is 0.
- **Length 2:** `[5, 5]`. Left and right start at 0 and 1. Loop runs once: height[0]=5 ≤ height[1]=5, maxL=5, water+=0, left→1. left≥right. Return 0. Correct — two bars with no space between them trap no water.
