## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can the arrays be empty? Can both be empty simultaneously?
- Is the output a floating-point number or can it be a double?
- The constraint is O(log(m+n)) — that rules out merging; I'll need binary search."

### 2. State the brute force (90 seconds)
"The simple approach: merge both arrays in O(m+n) time, then index into the middle. That's clearly O(m+n) which violates the constraint. The interesting question is whether we can find the median without looking at all elements."

### 3. Walk through the optimal approach (3 minutes)
"The key insight is that the median partitions the combined array into two equal halves. If I choose a partition point `i` in nums1 and the corresponding `j = half - i` in nums2, I get a valid partition when the largest left element ≤ smallest right element across both arrays.

I binary search `i` over `[0, m]` where m is the shorter array's length. If nums1's left part is too large — nums1[i-1] > nums2[j] — I move `i` left. If nums2's left part is too large, I move `i` right.

Example: nums1=[1,3], nums2=[2,4,5,6]. m=2, n=4, half=3.
- lo=0, hi=2. mid=1 (i=1, j=2).
  maxLeft1=1, minRight1=3, maxLeft2=2, minRight2=5.
  maxLeft1=1 ≤ minRight2=5 ✓. maxLeft2=2 ≤ minRight1=3 ✓.
  Total is even. Median = (max(1,2) + min(3,5)) / 2.0 = (2+3)/2 = 2.5."

### 4. State complexity before coding
"O(log(min(m,n))) time, O(1) space. This is genuinely tricky to code — let me be careful with the sentinel values for boundary partitions."

### 5. After coding
"I'll verify with an odd-total example: nums1=[1,2], nums2=[3,4,5]. half=3. i=2,j=1. maxLeft1=2, minRight1=MAX, maxLeft2=3, minRight2=4. maxLeft2=3 > minRight1=MAX? No. Check other direction: 2 ≤ 4 ✓. 3 ≤ MAX ✓. Odd total: return max(2,3) = 3. Correct (merged = [1,2,3,4,5], median=3)."
