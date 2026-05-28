## Reference solution (expand-around-center)

**Complexity:** O(n²) time, O(1) space.

```java
class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        int lo = 0, hi = 0;  // indices of the longest palindrome found so far

        for (int i = 0; i < n; i++) {
            // Try both odd-length (center at i) and even-length (center between i and i+1)
            int len1 = expand(s, i, i);       // odd-length palindrome
            int len2 = expand(s, i, i + 1);   // even-length palindrome
            int len = Math.max(len1, len2);

            if (len > hi - lo + 1) {
                // Update the best palindrome's boundary indices
                lo = i - (len - 1) / 2;
                hi = i + len / 2;
            }
        }

        return s.substring(lo, hi + 1);
    }

    private int expand(String s, int left, int right) {
        // Expand outward while both pointers are valid and characters match
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // After the loop, left and right are one step past the palindrome boundary
        // Length = right - left - 1
        return right - left - 1;
    }
}
```

## Line-by-line notes
- **`len = right - left - 1`:** After the loop exits, `left` is one to the left and `right` is one to the right of the palindrome boundaries. The palindrome length is `(right - 1) - (left + 1) + 1 = right - left - 1`.
- **`lo = i - (len - 1) / 2`:** For a palindrome of length `len` centered at `i`, the start index is `i - (len-1)/2`. Integer division handles both odd and even lengths correctly.
- **`hi = i + len / 2`:** The end index. For odd len: `(len-1)/2 == len/2 - 0` — symmetric. For even len (center between i and i+1): `(len-1)/2 = len/2 - 1` start offset, `len/2` end offset.

## Common bugs to avoid
- **`expand(s, i, i+1)` when i = n-1:** `right = n` is out of bounds for `s.charAt(right)`, but the while condition checks `right < s.length()` first — safe due to short-circuit evaluation.
- **`s.substring(lo, hi)` instead of `s.substring(lo, hi + 1)`:** Java's `substring(lo, hi)` is exclusive of `hi`. To include `hi`, use `hi + 1`.
- **Not initializing `lo = hi = 0`:** Without initialization, a string of length 1 might return an empty substring if `len > hi - lo + 1` never triggers. Initializing to index 0 ensures at minimum the first character is returned.
