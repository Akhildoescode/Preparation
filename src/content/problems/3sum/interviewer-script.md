## What to say, in order

### 1. Clarifying questions (60 seconds)
"Let me confirm the requirements:
- Triplets are unordered sets, right? So [-1, 0, 1] and [0, -1, 1] count as the same triplet and should only appear once?
- Can elements be reused? I.e., if only one 0 is in the array, can I use it in multiple triplets? (No — each element can only be used once per triplet, but the same VALUE at different indices is fine.)
- Return an empty list if no solution, not null, correct?"

### 2. State the brute force (90 seconds)
"The brute force is three nested loops trying all triplets, O(n³). With a Set for deduplication it still TLEs at n=3000. If I pick one element and reduce the remaining problem to Two Sum, I get O(n²). But I can do better deduplication by sorting first."

### 3. Walk through the optimal approach (3 minutes)
"I'll sort the array first. Then fix one element `nums[i]` with an outer loop — I'm looking for a pair in the rest that sums to `-nums[i]`. Since the subarray to the right is sorted, I can use two pointers.

Key details:
1. **Skip duplicate i values:** if `nums[i] == nums[i-1]`, skip — same fixed element → same triplets.
2. **Early exit:** if `nums[i] > 0`, the array is sorted so all remaining are positive → sum > 0, impossible.
3. Two pointers: if sum == 0, record, advance both, skip duplicates. If sum < 0, left++. If sum > 0, right--.

Let me trace `[-2, 0, 0, 2, 2]`:
- i=0, nums[i]=-2: look for pairs summing to 2.
  - left=1,right=4: 0+2=2 → record [-2,0,2], advance → left=2,right=3: both 0+2=2 → wait, skip dup on right (2==2): right=3→2? No, right becomes 3 after first find. Let me redo:
  - left=1(0), right=4(2): sum=-2+0+2=0 → record [-2,0,2]. Advance left++→2(0), right--→3(2). Skip dup left: nums[2]==nums[1]=0, left++→3. Now left≥right, stop.
- i=1(0): check i>0 && nums[1]==nums[0]? No (-2≠0). Look for pairs summing to 0.
  - left=2(0), right=4(2): sum=0+0+2=2>0 → right--→3(2). sum=0+0+2=2>0 → right--→2. left≥right, stop. Nothing found.
- i=2(0): nums[2]==nums[1]=0 → skip.
Result: [[-2,0,2]]. ✓"

### 4. State complexity before coding
"O(n²) time, O(log n) extra space for sort. I'll code it now."

### 5. After coding
"Test with `[0, 0, 0]`: i=0, no duplicate skip; left=1, right=2: 0+0+0=0 → record [0,0,0], advance, skip dups → left becomes right, done. Result: [[0,0,0]]. Correct."
