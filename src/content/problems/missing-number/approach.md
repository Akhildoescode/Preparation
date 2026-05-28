## Understanding the problem
Given an array of n distinct numbers in the range [0, n], find the one missing number. The range has n+1 possible values but only n are present — exactly one is absent.

## Brute force
Sort and scan for the gap. O(n log n) time.

## Key insight (two approaches)
**XOR approach:** XOR all indices 0..n with all values in the array. Every value that appears in the array has a matching index somewhere in [0..n] — they cancel. The missing number's index has no matching value to cancel with, so it remains.

**Math approach:** The expected sum of 0 through n is `n*(n+1)/2`. Subtract the actual array sum. The difference is the missing number. O(n) time, O(1) space — simpler to explain.

## Optimal approach (Gauss formula)
```java
int expected = n * (n + 1) / 2;
int actual = 0;
for (int num : nums) actual += num;
return expected - actual;
```

**Alternative (XOR):**
```java
int xor = nums.length; // XOR in the index n explicitly
for (int i = 0; i < nums.length; i++) xor ^= i ^ nums[i];
return xor;
```

## Why this works
**Math:** The sum formula counts all numbers 0..n. Subtracting the actual sum leaves exactly the missing one.

**XOR:** Each non-missing number appears exactly twice in the XOR computation (once as an index, once as a value) — these cancel. The missing number appears only as an index in [0..n] — it remains.

## Complexity
- Time: O(n) for both approaches
- Space: O(1) — no extra data structure
