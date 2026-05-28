## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int characterReplacement(String s, int k) {
        // Frequency of each uppercase letter inside the current window [l, r].
        var count = new int[26];

        // Highest single-character frequency seen in ANY window so far.
        // We intentionally never decrease this — it encodes the best window size achieved.
        var maxCount = 0;

        var l = 0;

        for (var r = 0; r < s.length(); r++) {
            // Expand window to include s[r].
            var idx = s.charAt(r) - 'A';
            count[idx]++;

            // Only update maxCount upward — a decrease just means the window
            // would shrink, and we never want the window to shrink.
            maxCount = Math.max(maxCount, count[idx]);

            // Window size is (r - l + 1). Characters to replace = size - maxCount.
            // If that exceeds k, the window is invalid — slide left by one.
            // We slide by exactly 1 (not a full shrink) to keep window size non-decreasing.
            if ((r - l + 1) - maxCount > k) {
                count[s.charAt(l) - 'A']--;
                l++;
            }
        }

        // Because the window never shrank, its final size equals
        // the length of the longest valid window encountered.
        return s.length() - l;
    }
}
```

## Line-by-line notes
- **`maxCount` never decreases:** This is the subtle correctness trick. If `maxCount` were recomputed accurately after shrinking, the window would shrink further — but we only care about finding a window at least as large as the best one seen. Stale-but-high `maxCount` keeps the window at its peak size.
- **`if (...) { count--; l++; }`:** We move `l` by at most 1 per iteration of the outer loop, ensuring the window advances like a sliding pane rather than repeatedly collapsing.
- **`return s.length() - l`:** At the end, `l` is the left boundary and `r = s.length() - 1`, so window size = `s.length() - 1 - l + 1 = s.length() - l`.

## Common bugs to avoid
- **Recomputing maxCount as max over all 26 entries inside the loop:** This is O(26) per step and is correct, but the elegant insight is that you do not need to — the stale `maxCount` is sufficient and cheaper to reason about.
- **Shrinking the window more than 1 step:** Using a `while` loop instead of `if` would correctly compute the longest window too, but the window would shrink and you would need to track `maxLen` separately. The `if` trick is cleaner.
- **Forgetting to decrement `count` when advancing `l`:** The frequency array becomes stale if you advance `l` without updating `count`, causing `maxCount` to be computed on phantom characters.
