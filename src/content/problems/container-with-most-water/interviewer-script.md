## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can heights be zero? If so, a container with a zero-height wall holds no water — that's fine, we'd just skip it naturally.
- Are we looking for the maximum volume of water, not the pair of indices themselves?
- The lines have no width, so the area formula is strictly min(height[l], height[r]) times (r - l), correct?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to try every pair of lines (l, r) with l less than r, compute min(height[l], height[r]) times (r - l), and track the maximum. That gives us O(n²) time because we check all n-choose-2 pairs. With n up to 100,000, that's around 5 billion operations — too slow. We can do better with two pointers."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the water level is limited by the shorter of the two walls. If I start with the widest possible container — left pointer at index 0, right pointer at the last index — I get the maximum possible width. To potentially do better, I need a taller short wall, which means I should move the pointer pointing at the shorter line inward. Moving the taller line inward is pointless: the bottleneck is still the short line, and now width is smaller too. So my approach is:
- Step 1: Place left and right pointers at the two ends.
- Step 2: Compute water at current pair, update the max.
- Step 3: Move the pointer with the shorter height one step inward. Repeat.

Let me trace through: height = [1, 8, 6, 2, 5, 4, 8, 3, 7].

- l=0 (h=1), r=8 (h=7). water = min(1,7)*8 = 8. maxWater=8. Move l (shorter).
- l=1 (h=8), r=8 (h=7). water = min(8,7)*7 = 49. maxWater=49. Move r (shorter).
- l=1 (h=8), r=7 (h=3). water = min(8,3)*6 = 18. maxWater=49. Move r.
- l=1 (h=8), r=6 (h=8). water = min(8,8)*5 = 40. maxWater=49. Move either (say l).
- ...pointers converge. Best was 49."

### 4. State complexity before coding
"This will be O(n) time and O(1) space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with [1, 8, 6, 2, 5, 4, 8, 3, 7] — we should get 49. Now the edge case: [1, 1] — two lines, water = 1*1 = 1, pointers meet and we stop. Correct. Any concerns about the approach or the code?"
