## Reference solution

**Complexity:** O(m · n) time, O(n) space (rolling row).

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        // prev[j] = dp[i-1][j]; curr[j] = dp[i][j]
        int[] prev = new int[n + 1];
        int[] curr = new int[n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    // Characters match: extend the LCS from both strings one step back
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // No match: take the best LCS from skipping one character in either string
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            // Advance: current row becomes previous for the next iteration
            int[] temp = prev;
            prev = curr;
            curr = temp;  // reuse the old prev array as the new curr (zero out if needed)
            Arrays.fill(curr, 0);
        }

        return prev[n];
    }
}
```

## Line-by-line notes
- **`prev[j-1]`:** Represents dp[i-1][j-1] — the LCS of the shorter prefixes of both strings (before the current characters). When characters match, we extend this by 1.
- **`prev[j]` vs `curr[j-1]`:** Skipping text1[i-1] gives dp[i-1][j] = prev[j]. Skipping text2[j-1] gives dp[i][j-1] = curr[j-1] (already updated this row). Max of both is the mismatch case.
- **Array swap:** Reusing arrays avoids repeated allocation. `Arrays.fill(curr, 0)` resets the recycled array.

## Common bugs to avoid
- **Using a single array and updating left-to-right:** Unlike Unique Paths, the LCS recurrence uses both dp[i-1][j-1] (diagonal) and dp[i-1][j] (above). Updating in-place with a single array overwrites dp[i-1][j-1] before it's needed. Use two arrays (or save the diagonal value before updating).
- **Off-by-one: `text1.charAt(i)` instead of `text1.charAt(i-1)`:** The dp table is 1-indexed but strings are 0-indexed.
- **`return prev[n]` vs `return curr[n]`:** After the swap at the end of the outer loop, the result is in `prev[n]` (the just-computed row).
