## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few clarifications:
- We cannot use + or - anywhere in the code, including helper functions?
- The inputs can be negative integers (signed 32-bit)?
- Can we use comparison operators, loops, and bitwise operators? Yes — just no + or -."

### 2. State the brute force (90 seconds)
"There's no simpler approach here — we fundamentally cannot use addition operators. We must implement binary addition from scratch. The insight is that modern CPUs compute binary addition in exactly this way: XOR for the sum bits, AND-shift for the carry."

### 3. Walk through the optimal approach (3 minutes)
"Binary addition: `a XOR b` gives the bit-by-bit sum ignoring carries. `(a AND b) shifted left 1` gives the carries (a carry propagates from position p to position p+1).

Iteratively: let `a` accumulate the intermediate sum, `b` be the carry. When carry is 0, `a` is the answer.

Let me trace 5 + 3 (binary: 0101 + 0011):
- a=0101, b=0011. carry = (0101&0011)<<1 = 0001<<1 = 0010. a = 0101^0011 = 0110. b = 0010.
- a=0110, b=0010. carry = (0110&0010)<<1 = 0010<<1 = 0100. a = 0110^0010 = 0100. b = 0100.
- a=0100, b=0100. carry = (0100&0100)<<1 = 0100<<1 = 1000. a = 0100^0100 = 0000. b = 1000.
- a=0000, b=1000. carry = 0. a = 0000^1000 = 1000. b = 0.
Loop exits. Return a = 1000 = 8. Correct (5+3=8)."

### 4. State complexity before coding
"O(1) time — at most 32 iterations. O(1) space. Coding now."

### 5. After coding
"Java note: for this problem in Java, the loop must handle negative numbers too — XOR and AND work correctly on two's complement signed integers. No special casing needed."
