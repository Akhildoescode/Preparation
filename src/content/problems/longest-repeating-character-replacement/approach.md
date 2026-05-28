## Understanding the problem

You are given a string `s` consisting of uppercase English letters and an integer `k`. In one operation you may replace any character in `s` with any other uppercase letter. Find the length of the longest substring you can obtain that contains only one distinct character, using at most `k` replacements.

## Brute force

Try every possible substring by fixing a start index and an end index. For each substring, find the most frequent character and check if `(length - max_frequency) <= k`. If yes, it is a valid window; track the maximum length. This is O(n²) substrings times O(26) to count frequencies = O(n²) overall, which is too slow for n = 100,000.

## Key insight

The validity condition for a window `[l, r]` is: `(windowSize - countOfMostFrequentChar) <= k`. The characters that are not the most frequent must be replaced. Rather than shrinking the window when it becomes invalid, we can keep the window size monotonically non-decreasing — we only ever try to grow it. We track `maxCount`, the highest frequency any single character has reached inside any window we have seen. Even if the current window's actual max-frequency drops, `maxCount` does not decrease, which means we never shrink the window — we only slide it.

## Optimal approach

Pattern: **sliding window with a frequency map**.

1. Maintain a frequency array `count[26]` for characters in the current window `[l, r]`.
2. Maintain `maxCount` = highest single-character frequency seen across all windows so far.
3. Expand `r` one step at a time:
   a. Increment `count[s.charAt(r) - 'A']`.
   b. Update `maxCount = Math.max(maxCount, count[s.charAt(r) - 'A'])`.
   c. If `(r - l + 1) - maxCount > k`, the window is too large — slide `l` right by 1 and decrement `count[s.charAt(l) - 'A']`.
4. The answer is `r - l + 1` at the end of the loop (window size never shrinks, so the max is the final size).

## Why this works

`maxCount` is a lower bound on what we need: we only move `l` when the window would require more than `k` replacements even assuming the best possible character distribution. Because we never shrink the window below its historical maximum size, we never miss a valid configuration that was good at a previous step. The window "slides" rather than shrinks, so the largest valid window encountered is preserved in the final window size.

## Complexity
- Time: O(n) because both `l` and `r` each advance at most n steps.
- Space: O(1) because the frequency array has a fixed size of 26, independent of n.
