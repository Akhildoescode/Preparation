## Reference solution

**Complexity:** O(m × n) time, O(m × n) space (reducible to O(min(m,n)) with rolling array).

```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        // dp[i][j] = min edits to convert word1[0..i-1] to word2[0..j-1]
        int[][] dp = new int[m + 1][n + 1];

        // Base cases: convert to/from empty string
        for (int i = 0; i <= m; i++) dp[i][0] = i; // delete all chars of word1
        for (int j = 0; j <= n; j++) dp[0][j] = j; // insert all chars of word2

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // chars match — no operation needed
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j - 1], // replace
                        Math.min(
                            dp[i - 1][j],  // delete from word1
                            dp[i][j - 1]   // insert into word1
                        )
                    );
                }
            }
        }

        return dp[m][n];
    }
}
```

## Line-by-line notes
- **`dp[i][j]` definition:** Minimum edit distance to convert `word1[0..i-1]` to `word2[0..j-1]`. The `+1` indexing lets us use row 0 / column 0 as the "empty string" base case.
- **`dp[i][0] = i`:** Converting word1's first i characters to empty string requires i deletions.
- **`dp[0][j] = j`:** Converting empty string to word2's first j characters requires j insertions.
- **Match case `dp[i-1][j-1]`:** Characters align — inherit the cost of aligning everything before them. Zero additional operations.
- **Replace = `dp[i-1][j-1] + 1`:** Replace word1[i-1] with word2[j-1]; then the problem reduces to aligning word1[0..i-2] with word2[0..j-2].
- **Delete = `dp[i-1][j] + 1`:** Delete word1[i-1]; then align word1[0..i-2] with word2[0..j-1].
- **Insert = `dp[i][j-1] + 1`:** Insert word2[j-1] at position i in word1; then align word1[0..i-1] with word2[0..j-2].

## Trace for `word1="horse", word2="ros"`
```
    ""  r  o  s
""   0  1  2  3
h    1  1  2  3
o    2  2  1  2
r    3  2  2  2
s    4  3  3  2
e    5  4  4  3
```
Answer: dp[5][3] = 3 (horse → rorse → rose → ros). ✓
