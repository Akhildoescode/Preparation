## Understanding the problem
Given an array where every element appears exactly twice except for one element which appears once, find that single element. The clever constraint "every other element appears exactly twice" is the key to an O(1) space solution.

## Brute force
Use a HashMap to count occurrences and return the key with count 1. O(n) time, O(n) space. Works but uses extra space.

## Key insight
XOR has two critical properties: `a ^ a = 0` (any number XORed with itself is 0) and `a ^ 0 = a` (any number XORed with 0 is itself). XOR is also commutative and associative. So XORing all elements: paired elements cancel to 0, leaving only the single element: `e1 ^ e1 ^ e2 ^ e2 ^ ... ^ x = 0 ^ 0 ^ ... ^ x = x`.

## Optimal approach
XOR all elements together. Return the result.
```java
int result = 0;
for (int n : nums) result ^= n;
return result;
```

## Why this works
XOR is commutative (`a^b = b^a`) and associative (`(a^b)^c = a^(b^c)`), so the order of elements doesn't matter — all pairs cancel regardless of their positions in the array. The single element XORed with 0 remains itself.

## Complexity
- Time: O(n) — one pass through the array
- Space: O(1) — only a single accumulator variable
