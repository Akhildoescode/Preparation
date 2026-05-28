## Cases to mention to the interviewer

- **Empty string s:** dp[0]=true, loop doesn't execute, return dp[0]=true. Vacuously true.
- **Single character that's a word:** s="a", wordDict=["a"]. dp[1]: j=0, dp[0]=true, "a" in dict → dp[1]=true. Return true.
- **Single character not a word:** s="a", wordDict=["b"]. dp[1]: "a" not in dict. Return false.
- **Word reuse:** s="aaa", wordDict=["a"]. dp[1]=true (j=0, "a"∈dict). dp[2]: j=1, dp[1]=true, "a"∈dict → true. dp[3]: j=2, dp[2]=true, "a"∈dict → true. Return true.
- **Long word that covers the whole string:** s="something", wordDict=["something"]. Only j=0, dp[0]=true, entire s in dict → dp[9]=true.
- **Substring match but not full coverage:** s="catsandog", wordDict=["cats","dog","sand","cat","an"]. The DP correctly finds no valid segmentation for the full string.
