## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Are all elements distinct? That affects whether I need to handle duplicates specially.
- Is there guaranteed to be a rotation, or could the array already be sorted?
- What is the expected output — the minimum value, or its index?"

### 2. State the brute force (90 seconds)
"The naive approach is a linear scan to find the minimum in O(n). That works but ignores the sorted structure. Since part of the array is still sorted, I can binary search to get O(log n)."

### 3. Walk through the optimal approach (3 minutes)
"The key observation: after rotation, we have two sorted segments. The minimum is at the boundary — the first element of the second segment. I compare `nums[mid]` to `nums[hi]` to decide which side the boundary is on.

If `nums[mid] > nums[hi]`: the right half is the smaller half, so the minimum is in `[mid+1, hi]`. Set `lo = mid + 1`.

If `nums[mid] <= nums[hi]`: the left half either is fully in the larger segment, or `mid` itself is the minimum. Set `hi = mid` — keep mid in range.

Let me trace: `[3, 4, 5, 1, 2]`.
- lo=0, hi=4, mid=2. nums[2]=5 > nums[4]=2 → lo=3.
- lo=3, hi=4, mid=3. nums[3]=1 <= nums[4]=2 → hi=3.
- lo=3 == hi=3. Return nums[3]=1. Correct!"

### 4. State complexity before coding
"O(log n) time, O(1) space. I'll code it up now."

### 5. After coding
"Edge case: not rotated — `[1, 2, 3, 4, 5]`. nums[mid]=3 <= nums[hi]=5 → hi shrinks toward lo=0. We always keep reducing until lo==hi at index 0, which is the minimum. Correct."
