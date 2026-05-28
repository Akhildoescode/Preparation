## Understanding the problem

Given an integer array, determine whether any value appears at least twice. You need to return true if any element is a duplicate, and false if every element is distinct. The input can have positive, negative, or zero values with no guaranteed ordering.

## Brute force

Compare every pair of elements: for each index i, scan all indices j > i and check if nums[i] == nums[j]. This is O(n²) time and O(1) space. It is too slow for large inputs because we repeat work — every element is compared against every other element even when an early duplicate exists.

## Key insight

If we track elements we have already seen in a hash set, each lookup and insert is O(1). The moment we try to insert an element that is already in the set, we have found our duplicate. We never need to look backward through the array.

## Optimal approach

**Pattern: HashSet membership test**

1. Create an empty `HashSet<Integer>`.
2. Iterate through each number in the array.
3. Before inserting, check if the set already contains the number.
4. If yes, return `true` immediately — a duplicate was found.
5. Otherwise, add the number to the set and continue.
6. If the loop finishes without a hit, return `false`.

**Invariant:** At each step i, the set contains exactly the elements nums[0..i-1]. A collision means nums[i] appeared earlier.

## Why this works

A HashSet stores unique values and provides O(1) average-case `contains` and `add` operations. Because we check membership before inserting, the first repeated value triggers an immediate return. If we exhaust all elements without a collision, all values are distinct by the invariant.

## Complexity
- Time: O(n) because we visit each element once and each set operation is O(1) amortized
- Space: O(n) because in the worst case (no duplicates) we store all n elements in the set
