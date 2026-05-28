## Understanding the problem

Given two strings s and t, determine if t is an anagram of s. An anagram uses all the same characters as the original string with the same frequencies — just in a different order. If t has any character that s does not, or any character count that differs, the answer is false.

## Brute force

Sort both strings and compare. Sorting takes O(n log n) time. If the sorted strings are equal, they are anagrams. This works but is slower than necessary and creates O(n) extra space for the sorted copies (or mutates character arrays). It also hides the structure of the problem.

## Key insight

Two strings are anagrams if and only if they have identical character frequency distributions. We can represent the frequency difference in a single integer array of size 26 (one slot per lowercase letter). Incrementing for s and decrementing for t means a perfect anagram leaves all zeros.

## Optimal approach

**Pattern: Fixed-size frequency array (character hashing)**

1. If `s.length() != t.length()`, return `false` immediately.
2. Allocate `int[] freq = new int[26]`.
3. Iterate through both strings simultaneously using the same index i.
4. For each position: `freq[s.charAt(i) - 'a']++` and `freq[t.charAt(i) - 'a']--`.
5. After the loop, check if every entry in `freq` is 0.
6. If all zeros, return `true`; otherwise `false`.

**Invariant:** After processing all characters, `freq[c]` holds (count of c in s) minus (count of c in t). Anagram ⟺ all differences are zero.

## Why this works

Because we increment for s and decrement for t in a single pass, each letter's net count is exactly the surplus or deficit relative to s. If t is a true anagram, every count cancels to zero. The length check upfront prevents a string with extra characters from accidentally passing if the extra characters happen to cancel something else.

## Complexity
- Time: O(n) because we make one pass over both strings of length n, plus O(1) to check 26 slots
- Space: O(1) because the frequency array is always size 26 regardless of input size
