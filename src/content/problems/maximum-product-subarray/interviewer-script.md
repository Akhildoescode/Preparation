## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can the array contain zeros? Zeros reset the product.
- Can the array contain negative numbers? The main challenge — a pair of negatives can give a large positive.
- Can the array be empty? The problem guarantees at least one element.
- Is the subarray required to be non-empty? Yes — at minimum it has one element."

### 2. State the brute force (90 seconds)
"Try all O(n²) subarrays, compute each product. O(n²) time. This misses the key insight that products have a sign-flip behavior under negative numbers."

### 3. Walk through the optimal approach (3 minutes)
"Unlike sum (where larger is always better), products of negatives can become large positives. So I track both the maximum and minimum product ending at each position.

At each index i, the new max and min are one of three things:
- nums[i] alone (start fresh)
- previous max × nums[i]
- previous min × nums[i] (critical when nums[i] is negative)

Trace: nums = [2, 3, -2, 4].
- i=0: max=2, min=2, result=2
- i=1: max=max(3,6,6)=6, min=min(3,6,6)=3, result=6
- i=2: max=max(-2,-4,-6)=-2, min=min(-2,-4,-6)=-12, result=6
- i=3: max=max(4,-8,-48)=4, min=min(4,-8,-48)=-48, result=6
Answer: 6 ([2,3])."

### 4. State complexity before coding
"O(n) time, O(1) space. Coding now."

### 5. After coding
"Edge cases: [0,2] — zero resets the product. The 'take nums[i] alone' option handles this: max = max(2, 0*2=0, 0*2=0) = 2."
