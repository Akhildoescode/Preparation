## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- No duplicates in the array?
- I must find the target's index, not just whether it exists?
- Return -1 if not found?
- The array can have any length ≥ 1?"

### 2. State the brute force (90 seconds)
"Linear scan is O(n) — obviously correct but misses the point of the sorted structure. We need O(log n), which means binary search with a twist."

### 3. Walk through the optimal approach (3 minutes)
"Even in a rotated array, at any `mid`, one of the two halves [left, mid] or [mid, right] is fully sorted. I determine which half is sorted and check if the target falls in that range. If yes, narrow to that half. If no, narrow to the other half.

Key check: if `nums[left] <= nums[mid]`, the left half is sorted (no wrap-around in it). Otherwise, the right half is sorted.

Then: is target in the sorted half? If so, binary search there. Otherwise, search the other half.

Trace [4,5,6,7,0,1,2], target=0:
- left=0,right=6,mid=3(7). nums[0]=4≤nums[3]=7 → left sorted. Is 4≤0<7? No → search right: left=4.
- left=4,right=6,mid=5(1). nums[4]=0≤nums[5]=1 → left sorted. Is 0≤0<1? Yes → search left: right=4.
- left=4,right=4,mid=4(0). nums[4]==0 → return 4. ✓"

### 4. State complexity before coding
"O(log n) time, O(1) space. Standard binary search with modified conditional logic. I'll code it."

### 5. After coding
"Not found test: [1], target=0. left=right=mid=0. nums[0]≠0. left half sorted (trivially). 1≤0<1? No. Search right: left=1 > right=0. Return -1. ✓"
