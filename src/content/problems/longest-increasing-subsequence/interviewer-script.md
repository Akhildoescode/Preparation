## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Strictly increasing — so equal elements are not allowed in the subsequence?
- Does 'subsequence' mean elements must maintain their relative order in the original array, but need not be contiguous?
- What should be returned — the length, or the actual subsequence? The problem asks for length."

### 2. State the brute force (90 seconds)
"Try all 2^n subsequences, filter those that are strictly increasing, return the maximum length. O(2^n) — completely impractical."

### 3. Walk through the optimal approach (3 minutes)
"I'll describe the O(n²) DP first, then the O(n log n) optimization.

O(n²) DP: dp[i] = length of LIS ending at index i. For each i, scan all j < i where nums[j] < nums[i]: dp[i] = max(dp[i], dp[j]+1). Answer: max of all dp.

Trace for [10,9,2,5,3,7,101,18]:
dp = [1,1,1,2,2,3,4,4]. Answer: 4.

O(n log n) — patience sorting: maintain `tails`, a sorted list of the smallest known tail of each LIS length. For each number, binary search for the first tail >= num:
- If all tails are smaller: append (new longest LIS).
- Otherwise: replace `tails[pos]` (greedily keep the smallest possible tail for that length).

Trace: [10,9,2,5,3,7,101,18].
10→[10]. 9→[9]. 2→[2]. 5→[2,5]. 3→[2,3]. 7→[2,3,7]. 101→[2,3,7,101]. 18→[2,3,7,18].
Length=4. Correct."

### 4. State complexity before coding
"O(n log n) time for the patience sorting approach. O(n) space. I'll implement this version."

### 5. After coding
"I'll note: `tails` is NOT the actual LIS — it's a bookkeeping structure. To reconstruct the actual subsequence, you'd need a parent array in the O(n²) DP version."
