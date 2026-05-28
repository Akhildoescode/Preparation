## Same pattern, different problem
- **Two Sum (#1):** 3Sum reduces to Two Sum after fixing one element. Understanding Two Sum deeply makes 3Sum feel like "Two Sum with an outer loop."
- **4Sum (#18):** The same pattern extended one more level. Fix two elements with nested loops, then use two pointers on the rest — O(n³) total. The deduplication logic is identical.
- **Container With Most Water (#11):** Two pointers on a sorted-ish constraint. The same "move the smaller pointer inward" intuition applies, though the problem isn't about sums.
- **3Sum Closest (#16):** Identical structure — sort + two pointers — but instead of target == 0, track the closest seen sum, updating a running answer.

## When this pattern applies
**Sort + two pointers** is the go-to when you need pairs (or triples) summing to a target in a sorted array, and O(n²) is acceptable. The key signals: "find all pairs/triplets with property X" and "no duplicates in output." Sorting is O(n log n) and unlocks O(n) per fixed element via two pointers, beats the O(n²) brute force per fixed element. Duplicate skipping is clean on a sorted array because equal values are adjacent.
