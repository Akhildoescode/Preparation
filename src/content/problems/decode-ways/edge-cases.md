## Cases to mention to the interviewer

- **Leading zero:** s = "06" → 0 ways. The leading zero guard catches this immediately.
- **Single digit, non-zero:** s = "7" → 1 way. dp[1] = 1 since s[0] = '7' != '0'.
- **"10":** dp[1]=1. i=2: s[1]='0' → single-digit invalid (curr=0). twoDigit='10' ∈ [10,26] → curr += prev2=1. dp[2]=1.
- **"20":** Same as "10" — dp[2]=1.
- **"30":** dp[1]=1. i=2: s[1]='0' → invalid. '30' > 26 → invalid. dp[2]=0. One zero in the dp chain makes everything downstream 0.
- **All same digits, e.g., "111111":** Many valid decodings — the 7th Fibonacci number (same recurrence as climbing stairs). Confirms the algorithm handles long strings correctly.
