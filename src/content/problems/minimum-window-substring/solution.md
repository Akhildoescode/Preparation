## Reference solution

**Complexity:** O(n + m) time, O(m) space where n = |s|, m = |t|.

```java
class Solution {
    public String minWindow(String s, String t) {
        if (s.isEmpty() || t.isEmpty()) return "";

        // Count required frequencies from t
        var tFreq = new HashMap<Character, Integer>();
        for (char c : t.toCharArray()) tFreq.merge(c, 1, Integer::sum);

        int required = tFreq.size(); // number of unique chars we must satisfy
        int formed = 0;              // number of unique chars currently satisfied in window

        var windowFreq = new HashMap<Character, Integer>();
        int left = 0;
        int minLen = Integer.MAX_VALUE;
        int minLeft = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            windowFreq.merge(c, 1, Integer::sum);

            // Check if adding c satisfies its requirement
            if (tFreq.containsKey(c) && windowFreq.get(c).equals(tFreq.get(c))) {
                formed++;
            }

            // Shrink from left while window is valid
            while (formed == required && left <= right) {
                // Record minimum window
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }

                // Remove leftmost character
                char leftChar = s.charAt(left);
                windowFreq.merge(leftChar, -1, Integer::sum);
                if (tFreq.containsKey(leftChar) &&
                    windowFreq.get(leftChar) < tFreq.get(leftChar)) {
                    formed--;
                }
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
    }
}
```

## Line-by-line notes
- **`tFreq.size()` → required:** We only care about unique characters in `t`. Multiple required chars' counts must ALL be satisfied for the window to be valid.
- **`windowFreq.get(c).equals(tFreq.get(c))`:** Use `.equals()` not `==` for Integer objects — autoboxing caches only -128 to 127. For character frequencies above 127 (very unusual but possible), `==` would give wrong results.
- **`formed++` only on the exact threshold:** We increment `formed` only when the window frequency exactly reaches the required frequency (not when it exceeds it). This prevents double-counting.
- **Shrink loop records minimum before removing left char:** We record first, then remove. This ensures we capture the exact minimum window before invalidating it.
- **`merge(leftChar, -1, Integer::sum)`:** Decrements the count. If the count drops below required, `formed` decreases and the shrink loop exits.

## Common bugs to avoid
- **Using `==` on `Integer` objects for frequency comparison:** Causes silent failures for frequencies > 127.
- **Not initializing the map with all t characters:** Only updating when `windowFreq[c] == tFreq[c]` requires `tFreq` to contain `c`. If `c` is not in `tFreq`, skip the formed check.
- **Forgetting to record the minimum BEFORE shrinking:** If you shrink before recording, you miss the current valid window.
