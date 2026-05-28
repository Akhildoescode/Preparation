## Understanding the problem
Given an array of integers and a target sum, find the indices of the two numbers that add up to the target. Each input has exactly one solution and you cannot use the same element twice. The key challenge is doing this in better than O(n²) time.

## Brute force
Check every pair (i, j) where i < j and test whether `nums[i] + nums[j] == target`. This is O(n²) time and O(1) space — fine for tiny inputs but unacceptable at scale. With n = 10⁴, that's 10⁸ operations.

## Key insight
For any number `nums[i]`, its required partner is exactly `target - nums[i]`. If we could check in O(1) whether that partner already exists in the array, we could solve the whole problem in a single pass. A HashMap lets us do exactly that.

## Optimal approach
Use a **hash map** pattern: store each number and its index as we scan. For each element:
1. Compute `complement = target - nums[i]`.
2. Check if `complement` is already in the map. If yes, return `[map.get(complement), i]`.
3. If not, store `nums[i] → i` in the map and move on.

We don't need to pre-populate the map. Checking the map before inserting ensures we never use the same element twice, and it correctly handles cases where two identical numbers sum to the target (e.g., `[3, 3]` with target 6 — when we reach the second 3, the first 3 is already in the map).

## Why this works
The loop invariant is: the map always contains every element seen so far. So when we check for a complement, we're asking "has the required partner appeared anywhere before my current position?" If yes, we have a pair. If we exhaust the array without finding one, there's no solution (guaranteed by problem constraints not to happen).

## Complexity
- Time: O(n) because we do one linear scan and each HashMap operation is O(1) amortized.
- Space: O(n) because in the worst case (no solution found until the last pair) we store all n elements in the map.
