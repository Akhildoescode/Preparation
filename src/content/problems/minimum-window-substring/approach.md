## Understanding the problem
Find the smallest window (substring) in string `s` that contains every character of string `t` with at least the required frequency. If no such window exists, return `""`. The window may contain extra characters beyond those in `t`.

## Brute force
Try all O(n²) substrings of `s`. For each, count character frequencies and check if it covers `t`. O(n²m) time where m is the length of `t`. Far too slow.

## Key insight
Use a **shrinking sliding window**: expand the right pointer until the window is valid (contains all of `t`'s characters at required frequencies), then shrink from the left to find the minimum valid window, then expand again. Track "how many unique characters in t have their required count satisfied" with a `formed` counter to avoid re-scanning the frequency map each step.

## Optimal approach
1. Build `tFreq` map (character → required count from `t`).
2. Track `windowFreq` (character → current count in window).
3. Track `formed` (how many unique chars in `t` are currently satisfied: `windowFreq[c] >= tFreq[c]`).
4. `required` = number of unique characters in `t`.
5. Expand `right` one step at a time:
   - Add `s[right]` to `windowFreq`.
   - If `windowFreq[s[right]] == tFreq[s[right]]`, increment `formed`.
6. While `formed == required` (window is valid), try to shrink from `left`:
   - Update answer if current window is smaller.
   - Remove `s[left]` from `windowFreq`. If its count drops below required, decrement `formed`.
   - `left++`.
7. Continue until `right` reaches end of `s`.

Trace `s = "ADOBECODEBANC"`, `t = "ABC"`, required=3:
- Expand until window covers A, B, C: [0..5] = "ADOBEC"
- Shrink: remove A → formed drops → re-expand... eventually find "BANC" [9..12] as minimum.
Answer: "BANC". ✓

## Why this works
The window moves monotonically — right only goes forward, left only goes forward. Each character is added and removed at most once. The `formed` counter lets us know in O(1) whether the window is currently valid, avoiding re-scanning the frequency map.

## Complexity
- Time: O(n + m) where n = |s|, m = |t| — each pointer moves at most n steps; building tFreq is O(m).
- Space: O(m) for the frequency maps (bounded by alphabet size).
