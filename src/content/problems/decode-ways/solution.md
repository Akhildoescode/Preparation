## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        if (s.charAt(0) == '0') return 0;  // leading zero — no valid decoding

        // prev2 = dp[i-2], prev1 = dp[i-1]
        int prev2 = 1;  // dp[0] = 1 (empty prefix)
        int prev1 = 1;  // dp[1] = 1 (s[0] != '0' already checked)

        for (int i = 2; i <= n; i++) {
            int curr = 0;

            // Case 1: decode s[i-1] as a single digit (valid if != '0')
            if (s.charAt(i - 1) != '0') {
                curr += prev1;
            }

            // Case 2: decode s[i-2..i-1] as a two-digit number (valid if 10–26)
            int twoDigit = Integer.parseInt(s.substring(i - 2, i));
            if (twoDigit >= 10 && twoDigit <= 26) {
                curr += prev2;
            }

            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

## Line-by-line notes
- **Leading zero guard:** If s[0]=='0', no valid decoding exists regardless of the rest.
- **`prev1 = 1` for dp[1]:** Since we've already confirmed s[0] != '0', dp[1] = 1 (one way: take s[0] as a single letter).
- **Single-digit case `!= '0'`:** Digits 1-9 are valid single-character encodings. '0' has no mapping.
- **Two-digit case `twoDigit >= 10 && twoDigit <= 26`:** Values 01-09 are not valid two-digit encodings (01 would just be 1). Values 27-99 exceed 'Z'. Only 10-26 are valid.

## Common bugs to avoid
- **Forgetting to check `twoDigit >= 10`:** Values like '01', '06', '09' would incorrectly be treated as valid two-digit codes. The lower bound of 10 prevents this.
- **`s.charAt(i-1) == '0'` vs `s.charAt(i-1) != '0'`:** Single digit is valid when it's NOT '0'. Easy to flip the condition.
- **Not initializing `curr = 0`:** If neither case applies (e.g., s[i-1]='0' and s[i-2..i-1] is 30, 40, etc.), curr should be 0 (no valid decodings).
