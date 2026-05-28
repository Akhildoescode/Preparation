## Reference solution

**Complexity:** O(n · 2^n) time, O(n²) space with DP precomputation.

```java
class Solution {
    private boolean[][] dp;
    private List<List<String>> result;
    private String s;

    public List<List<String>> partition(String s) {
        int n = s.length();
        this.s = s;
        this.result = new ArrayList<>();

        // Precompute: dp[i][j] = true if s[i..j] is a palindrome
        dp = new boolean[n][n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                // Single char always palindrome; longer: ends match AND interior is palindrome
                dp[i][j] = (s.charAt(i) == s.charAt(j))
                         && (j - i <= 2 || dp[i + 1][j - 1]);
            }
        }

        backtrack(0, new ArrayList<>());
        return result;
    }

    private void backtrack(int start, List<String> current) {
        if (start == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int end = start + 1; end <= s.length(); end++) {
            // dp[start][end-1]: is s[start..end-1] a palindrome? (end is exclusive)
            if (dp[start][end - 1]) {
                current.add(s.substring(start, end));
                backtrack(end, current);
                current.remove(current.size() - 1);
            }
        }
    }
}
```

## Line-by-line notes
- **`i` iterates from `n-1` down to `0`:** Building the DP table bottom-up from shorter to longer substrings ensures `dp[i+1][j-1]` is already computed when we need it.
- **`j - i <= 2` guard:** When i==j (length 1) or j==i+1 (length 2), the expression `dp[i+1][j-1]` would access `dp[i+1][i]` where `i+1 > i` — an invalid or trivially-true range. The guard short-circuits to avoid this.
- **`dp[start][end - 1]`:** `substring(start, end)` covers indices `start` through `end-1` inclusive, so the last index is `end - 1`.

## Common bugs to avoid
- **`dp[i+1][j-1]` without the `j - i <= 2` guard:** For a two-character string where `i+1 == j`, `dp[j][i]` accesses an uninitialized or wrong entry. Always include the length guard.
- **`end <= s.length()` vs `end < s.length()`:** Using `<` instead of `<=` misses the case where `end` points past the last character — which is valid for `substring(start, end)` when `end == s.length()`.
- **Not copying `current` when recording:** `result.add(current)` adds the live mutable reference; all result entries end up pointing to the same (eventually empty) list.
