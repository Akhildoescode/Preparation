## Same pattern, different problem
- **3Sum (#15):** Extends Two Sum by fixing one element with an outer loop and reducing the remaining problem to Two Sum on a sorted array with two pointers. The complement lookup concept is the same but executed differently to handle deduplication.
- **Subarray Sum Equals K (#560):** Uses the same "store seen values, check for required complement" trick but applied to prefix sums — instead of `target - nums[i]`, you look for `prefixSum - k` in the map.
- **Two Sum II — Input Array Is Sorted (#167):** Same problem on a sorted array. Because the array is sorted, two pointers (no extra space) replace the HashMap, giving O(1) space.
- **Group Anagrams (#49):** Also relies on a HashMap for grouping; the "key" is a sorted string instead of a numeric complement, but the mental model of "compute a canonical key and group by it" is identical.

## When this pattern applies
Reach for a **complement HashMap** when the problem involves finding pairs (or elements) whose values combine to a fixed target, and you need to avoid the O(n²) nested-loop brute force. The signal in the problem statement is usually "find two numbers/indices such that [arithmetic relationship] equals [constant]." Any time the answer depends on the *difference* between a target and a seen value, a hash map gives you O(1) lookup of that seen value.
