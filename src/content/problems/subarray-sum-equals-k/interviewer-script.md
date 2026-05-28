## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Can the array contain negative numbers? (Yes — this is why sliding window won't work.)
- Can k be 0 or negative?
- Should I count all subarrays, including overlapping ones? (Yes — every distinct [i,j] pair counts separately.)
- What's the expected return — a count of subarrays, not the subarrays themselves?"

### 2. State the brute force (90 seconds)
"Brute force: for each start index i, scan right accumulating a running sum. When sum equals k, count it. O(n²) time. With negatives, sliding window doesn't help because adding an element can increase or decrease the sum. I'll use prefix sums and a HashMap for O(n)."

### 3. Walk through the optimal approach (3 minutes)
"The insight is that a subarray sum equals k ↔ the difference of two prefix sums equals k. `prefix[j] - prefix[i] = k` means I'm looking for an earlier prefix sum of `prefix[j] - k`. As I scan, I keep a map of prefix sum values seen so far and how many times each appeared.

Steps:
1. Initialize map = {0: 1} — prefix sum of 0 appears once (before the array starts).
2. Scan: sum += nums[i]. count += map.get(sum - k, default 0). Then map[sum]++.

Trace `[1, 1, 1]`, k=2:
- sum=1: look for -1 → 0. map={0:1, 1:1}
- sum=2: look for 0 → found once! count=1. map={..., 2:1}
- sum=3: look for 1 → found once! count=2. map={..., 3:1}
Answer: 2. The two subarrays are [1,1] starting at index 0 and [1,1] starting at index 1."

### 4. State complexity before coding
"O(n) time, O(n) space. One pass, one HashMap. I'll code it."

### 5. After coding
"Edge case: k=0 — subarrays that sum to 0. If all elements are 0: `[0,0,0]`, k=0.
- sum=0 after each step. count += map[0-0=0] = 1,2,3. Total = 1+2+3=6. Correct: 6 subarrays (each single 0, both pairs, and the full array)."
