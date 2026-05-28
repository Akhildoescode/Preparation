## Same pattern, different problem

- **Trapping Rain Water (LeetCode 42):** Same two-pointer shrinking idea, but now water is trapped at every individual cell between walls; requires tracking left-max and right-max arrays (or two-pointer variant) rather than a single pair area.
- **Best Time to Buy and Sell Stock (LeetCode 121):** Also scans with an implicit left pointer (minimum price) and right pointer (current day); the "retire the weaker side" instinct is the same, applied to price differences instead of areas.
- **3Sum (LeetCode 15):** After sorting, fixes one element and uses a two-pointer shrink on the remaining subarray — the same "move the side that can't improve" logic drives which pointer to advance.
- **Valid Palindrome (LeetCode 125):** Two pointers starting at both ends and moving inward — the simplest expression of the shrinking two-pointer skeleton without any optimization argument needed.

## When this pattern applies

Use a **shrinking two-pointer** when the answer depends on a pair of elements at two positions, the search space is a contiguous range, and you can prove that one end of the current range is "dominated" and can be permanently discarded in O(1). The critical prerequisite is a monotone argument: moving one pointer in one direction can never help given the current state of the other pointer. If the problem is on a sorted array or admits a sorted transformation, two pointers are almost always worth considering first.
