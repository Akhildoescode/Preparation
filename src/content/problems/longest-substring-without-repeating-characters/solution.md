## Reference solution

**Complexity:** O(n) time, O(min(n, m)) space where m is the character set size.

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Maps character to its most recently seen index
        var lastSeen = new HashMap<Character, Integer>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // If c is in the window (last seen at index >= left), jump past it
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }

            // Always update the last-seen index for c
            lastSeen.put(c, right);

            // Window [left, right] now has all unique characters
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

## Line-by-line notes
- **`lastSeen.get(c) >= left`:** This check is critical. A character may be in the map from a previous window (left pointer already moved past it). Without `>= left`, we'd incorrectly move `left` backward to before the current window — violating the invariant and potentially shrinking the window.
- **Jump `left = lastSeen.get(c) + 1`:** Directly jump rather than increment one by one. The invariant is restored in O(1): the duplicate at the old position is now to the left of the window.
- **Update `lastSeen` after the left-pointer move:** We update `lastSeen.put(c, right)` regardless of whether we jumped. This ensures the map always reflects the most recent position of each character.
- **`right - left + 1`:** Window size is inclusive on both ends.

## Common bugs to avoid
- **Forgetting `lastSeen.get(c) >= left`:** Without this guard, stale map entries (characters seen before the current window) cause incorrect leftward jumps that shrink the valid window.
- **Moving left one step at a time with a while loop:** This works but is O(n²) in the worst case (e.g., "aaaa"). The direct jump is O(1).
- **Not updating `lastSeen` after jumping:** If you only update when no jump happens, a character seen inside the window retains a stale index and causes a missed conflict on the next occurrence.
