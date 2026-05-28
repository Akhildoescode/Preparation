## Same pattern, different problem
- **Two Sum (#1):** Same "store seen values, look up complement" structure. Here the "complement" is `prefixSum - k`; there it's `target - nums[i]`.
- **Continuous Subarray Sum (#523):** Find if any subarray sums to a multiple of k. Uses prefix sums mod k — same map-lookup approach but with modular arithmetic.
- **Longest Subarray with Sum K:** (non-LeetCode variant). Instead of counting, find the longest such subarray. Change the map to store the *first* occurrence of each prefix sum (using `putIfAbsent`), and track max length instead of count.
- **Number of Subarrays with Bounded Maximum (#795):** More complex constraint but same principle — count subarrays satisfying a condition using a map or prefix-style reasoning.

## When this pattern applies
Use **prefix sum + HashMap** when:
1. You're counting or finding subarrays with an exact target sum.
2. The array contains negative numbers (ruling out the two-pointer sliding window).
3. The problem asks about subarray sums specifically (not subsequences).

The mental model: turn "find i,j such that sum(i..j) = k" into "find i,j such that prefix[j] - prefix[i] = k" into "for each j, count stored prefix[i] values equal to prefix[j] - k." The `{0:1}` initialization handles the case where the subarray starts from the beginning of the array.
