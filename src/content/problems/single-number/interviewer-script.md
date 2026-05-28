## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Is it guaranteed that exactly one element appears once and all others appear exactly twice?
- Can the numbers be negative? XOR works on the bit representation regardless of sign.
- Is there a constraint of O(1) extra space? The XOR approach achieves this."

### 2. State the brute force (90 seconds)
"The straightforward solution: use a HashMap to count each element, then find the one with count 1. O(n) time and O(n) space. We can do better — O(n) time and O(1) space using XOR."

### 3. Walk through the optimal approach (3 minutes)
"The key insight: XOR of a number with itself is 0, and XOR with 0 is the number itself. XOR is commutative and associative, so order doesn't matter.

If I XOR all elements together: every element that appears twice contributes `x ^ x = 0`. After all pairs cancel, what remains is the single element.

Let me trace: nums = [4, 1, 2, 1, 2].
- Start with 0.
- 0 ^ 4 = 4
- 4 ^ 1 = 5 (in binary: 100 ^ 001 = 101)
- 5 ^ 2 = 7 (101 ^ 010 = 111)
- 7 ^ 1 = 6 (111 ^ 001 = 110)
- 6 ^ 2 = 4 (110 ^ 010 = 100 = 4)
Return 4. Correct!"

### 4. State complexity before coding
"O(n) time, O(1) space. The code is literally three lines. Let me write it."

### 5. After coding
"This is one of those problems where the solution is deceptively short but requires knowing the XOR property. The interviewer is testing whether you know `a ^ a = 0` and can apply it."
