## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Is the input a signed 32-bit integer, or unsigned? In Java, int is signed, but we treat it as unsigned — so negative numbers have a leading 1 bit that counts.
- Should I handle the edge case of n = 0? Yes — 0 has zero '1' bits.
- Is using built-in methods like Integer.bitCount acceptable, or do you want the manual implementation?"

### 2. State the brute force (90 seconds)
"The straightforward approach: convert to a binary string and count '1' characters — O(32). Works but misses the bit-manipulation insight. A bitwise approach is O(k) where k is the number of set bits, which can be much better for sparse numbers."

### 3. Walk through the optimal approach (3 minutes)
"The key trick: `n & (n-1)` clears the lowest set bit of n.

Why? When you subtract 1, the lowest set bit flips to 0 and all lower bits (which were 0) flip to 1. ANDing with n zeroes those flipped positions, leaving only the bits above the lowest set bit unchanged.

Example: n = 13 = 1101 in binary.
- 13 & 12 = 1101 & 1100 = 1100 = 12. One '1' bit removed (the lowest 1).
- 12 & 11 = 1100 & 1011 = 1000 = 8. Another removed.
- 8 & 7 = 1000 & 0111 = 0000 = 0. Third removed.
Loop exits. count = 3. And indeed 1101 has three '1' bits."

### 4. State complexity before coding
"O(k) where k is the number of set bits — at most 32 for a 32-bit integer. O(1) space. I'll code it now."

### 5. After coding
"Alternative worth mentioning: right-shifting `n >>>= 1` and checking `n & 1` each time. This is always O(32) but simpler to reason about. The `>>>` (unsigned right-shift) is critical — `>>` on a negative int preserves the sign bit, causing an infinite loop."
