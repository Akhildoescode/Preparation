## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few quick checks:
- Division is off the table, right? I want to confirm before I mention the total-product approach.
- Can the array contain zeros? Multiple zeros? (If yes, there are interesting cases where some or all outputs are 0.)
- What about negative numbers? They don't change my approach but affect sign.
- The output array doesn't count toward the space constraint, correct?"

### 2. State the brute force (90 seconds)
"The naive solution is O(n²): for each index, multiply all other elements in a nested loop. If division were allowed, we'd compute the total product and divide by each element — O(n) time, O(1) space — but that breaks with zeros and is disallowed. We need something smarter."

### 3. Walk through the optimal approach (3 minutes)
"The key insight is that the answer at position i is the product of everything to i's LEFT times everything to i's RIGHT. I can compute these independently in two passes.

**Pass 1:** Scan left to right. `output[i]` = product of all elements before i.
- output[0] = 1 (nothing to the left)
- output[i] = output[i-1] * nums[i-1]

**Pass 2:** Scan right to left. Keep a running `rightProduct` and multiply it into each output[i].
- Start with rightProduct = 1
- output[i] *= rightProduct, then rightProduct *= nums[i]

Let me trace `[1, 2, 3, 4]`:
- After Pass 1: output = [1, 1, 2, 6]
- Pass 2: output = [24, 12, 8, 6] ✓

This uses the output array itself as scratch space — no extra O(n) array needed."

### 4. State complexity before coding
"O(n) time, O(1) extra space (output array is excluded). Very clean two-pass solution. I'll code it."

### 5. After coding
"Let me test with a zero: `[1, 0, 3, 4]`:
- Pass 1: output = [1, 1, 0, 0]
- Pass 2 (right=1): i=3→0×1=0,r=4; i=2→0×4=0,r=12; i=1→1×12=12,r=0; i=0→1×0=0,r=0
- Result: [0, 12, 0, 0] ✓ (only index 1, which skips the zero, gets a non-zero product)

All good. Any questions?"
