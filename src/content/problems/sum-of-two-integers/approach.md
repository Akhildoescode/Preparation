## Understanding the problem
Add two integers without using `+` or `-` operators. This forces a bit-level simulation of binary addition. While trivial in production code, it tests deep understanding of how addition works at the hardware level.

## Brute force
There is no "brute force" here — we simply cannot use `+`. We must implement addition from first principles using bitwise operations.

## Key insight
Binary addition has two components: the sum of bits without carry (`a XOR b`) and the carry (`(a AND b) shifted left by 1`). Repeatedly apply these two steps until the carry is 0.

Example: 5 (101) + 3 (011):
- Sum without carry: 101 ^ 011 = 110
- Carry: (101 & 011) << 1 = 001 << 1 = 010
- Now add 110 + 010:
  - Sum: 110 ^ 010 = 100
  - Carry: (110 & 010) << 1 = 010 << 1 = 100
- Now add 100 + 100:
  - Sum: 100 ^ 100 = 000, carry = 100 << 1 = 1000
- Now add 000 + 1000:
  - Sum: 0000 ^ 1000 = 1000, carry = 0
- Done, answer = 1000 = 8. Correct (5+3=8)!

## Optimal approach
```java
while (b != 0) {
    int carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
}
return a;
```

## Why this works
In binary addition, `a XOR b` gives the sum of each bit position without considering carries. `(a AND b) << 1` represents the carry — each position where both a and b have a 1 produces a carry into the next higher position. We repeatedly propagate carries until no carry remains. This terminates because each iteration, the carry bits shift left (toward higher positions), eventually becoming 0.

## Complexity
- Time: O(1) — at most 32 iterations (the number of bits in an integer)
- Space: O(1)
