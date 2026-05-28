## Reference solution

**Complexity:** O(n²) time, O(n + W) space (W = total length of all words).

```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int n = s.length();

        // dp[i] = true if s[0..i-1] can be segmented into dictionary words
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;  // empty prefix is always valid

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                // If the prefix of length j is valid AND s[j..i-1] is a word → valid!
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;  // no need to check other j values
                }
            }
        }

        return dp[n];
    }
}
```

## Line-by-line notes
- **`dp[0] = true`:** The empty string can always be "segmented" (zero words). This ensures single-word prefixes are handled: when j=0, dp[0]=true and s[0..i-1] in wordSet → dp[i]=true.
- **`wordSet.contains(s.substring(j, i))`:** `substring(j, i)` extracts s[j..i-1]. O(i-j) to create the substring; O(i-j) to hash it — each call is O(n) in the worst case, giving O(n³) total without the `break`.
- **`break` after finding dp[i]=true:** Once we know dp[i] is true, no need to check other j values. This doesn't change correctness but reduces work.
- **Inner loop `j < i`:** j ranges from 0 to i-1 so that s[j..i-1] is a non-empty substring.

## Common bugs to avoid
- **`dp[i] = true` without setting j to end of range:** Forgetting the `break` doesn't cause bugs (dp[i] is already true), just wastes time.
- **Array size `n` instead of `n+1`:** We need indices 0 through n. `new boolean[n]` is off by one.
- **`wordSet.contains(s.substring(j, i-1))`:** Off-by-one — should be `substring(j, i)` (exclusive end) to cover s[j..i-1].
