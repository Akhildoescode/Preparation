## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public boolean isPalindrome(String s) {
        var l = 0;
        var r = s.length() - 1;

        while (l < r) {
            // Skip non-alphanumeric characters from the left.
            // The `l < r` guard prevents l from overshooting r when the
            // tail of the string is all punctuation/spaces.
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) {
                l++;
            }

            // Skip non-alphanumeric characters from the right.
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) {
                r--;
            }

            // Both l and r now point to valid alphanumeric characters.
            // Compare case-insensitively.
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;  // Mismatch — not a palindrome.
            }

            // Matched — move both pointers one step inward.
            l++;
            r--;
        }

        // All corresponding pairs matched (or the filtered string was empty/single char).
        return true;
    }
}
```

## Line-by-line notes
- **`Character.isLetterOrDigit`:** Handles the full Unicode spectrum correctly — safer than writing `(c >= 'a' && c <= 'z') || ...` which misses digits or non-ASCII letters.
- **`Character.toLowerCase` on both sides:** Avoids a conditional branch for case handling; comparing both lowercased values is simpler than checking `Math.abs(l - r) == 32` (the ASCII gap between uppercase and lowercase).
- **Inner `while` guards with `l < r`:** Without this guard, if the entire right half is punctuation, `r` could go below `l` or below 0. The guard is the same as the outer loop condition.

## Common bugs to avoid
- **Missing `l < r` guard in the inner skip loops:** If the string ends with non-alphanumeric characters (e.g., "a."), `r` will skip past index 0, producing an ArrayIndexOutOfBoundsException or an incorrect comparison.
- **Using `==` to compare `Character` objects instead of primitives:** `s.charAt(l)` returns `char` (a primitive), so `==` works correctly here. Bugs arise only if you box to `Character` objects — avoid unnecessary boxing.
- **Forgetting to advance both pointers after a match:** Incrementing only `l` or only `r` causes an infinite loop on matching characters.
