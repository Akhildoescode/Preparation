## Same pattern, different problem

- **Longest Substring Without Repeating Characters (LeetCode 3):** Same expanding-right, conditionally-shrinking-left window; the validity condition is "no duplicate in window" instead of "at most k replacements needed."
- **Minimum Window Substring (LeetCode 76):** Also a sliding window with a frequency map, but instead of maximizing window length it minimizes it while satisfying a coverage condition — the complement of this problem's optimization direction.
- **Max Consecutive Ones III (LeetCode 1004):** Identical algorithm structure — window is valid if number of zeros (the "bad" character) is at most k. This problem is essentially Longest Repeating Character Replacement restricted to a binary alphabet.
- **Longest Subarray of 1s After Deleting One Element (LeetCode 1493):** Another sliding window where you budget one "flaw" in the window; the same `if`-not-`while` shrink trick applies.

## When this pattern applies

Reach for a **fixed-budget sliding window** whenever you need the longest contiguous subarray or substring satisfying a condition that can be expressed as "at most k deviations from ideal." The shape of the solution is always: expand right freely, and when the budget is exceeded, slide left by one. The key check before choosing this pattern: can validity be maintained incrementally (O(1) update per step)? If revalidating the window from scratch takes O(window size), a different approach is needed.
