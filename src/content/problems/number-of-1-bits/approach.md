## Understanding the problem
Count the number of '1' bits (also called the Hamming weight) in a 32-bit unsigned integer. The challenge is working at the bit level rather than as a decimal number.

## Brute force
Convert the integer to a binary string and count '1' characters. O(32) time. Works but doesn't demonstrate bit manipulation knowledge — interviewers expect a bitwise solution.

## Key insight
The trick `n & (n - 1)` clears the lowest set bit of n. Subtracting 1 from n flips the lowest set bit to 0 and all lower bits (which were 0) to 1. ANDing with the original n clears all those flipped bits. Each application of this trick removes exactly one '1' bit. Count how many times you apply it before n becomes 0.

## Optimal approach
**Method 1 — n & (n-1) loop:**
```java
int count = 0;
while (n != 0) { n &= (n - 1); count++; }
return count;
```
Runs in O(k) where k is the number of set bits (best case: sparse numbers).

**Method 2 — right-shift loop:**
```java
int count = 0;
while (n != 0) { count += (n & 1); n >>>= 1; }
return count;
```
Always O(32). Use `>>>` (unsigned right-shift) not `>>` (signed) to avoid infinite loops on negative numbers (signed shift preserves the sign bit).

**Method 3 — Integer.bitCount(n):** Built-in Java utility, O(1).

## Why this works
`n & (n-1)` correctness: if the lowest set bit is at position p, then `n-1` has 0 at position p and 1s below p (where n had 0s). The AND operation zeroes out position p and leaves everything above it unchanged. So each iteration removes exactly one set bit.

## Complexity
- Time: O(k) with the n & (n-1) approach where k is the number of 1-bits (at most 32)
- Space: O(1)
