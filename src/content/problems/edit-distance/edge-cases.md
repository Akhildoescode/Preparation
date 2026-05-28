## Cases to mention to the interviewer

- **One or both strings empty:** `word1 = "", word2 = "abc"` → answer is 3 (3 insertions). Handled by base cases: `dp[0][j] = j`. `word1 = "abc", word2 = ""` → answer is 3 (3 deletions). `dp[i][0] = i`.
- **Identical strings:** `word1 = "abc", word2 = "abc"` → answer is 0. Every character matches, so `dp[i][j] = dp[i-1][j-1]` propagates 0 along the diagonal.
- **Single character strings:** `word1 = "a", word2 = "b"` → 1 replace. `word1 = "a", word2 = "a"` → 0.
- **One is a substring/prefix of the other:** `word1 = "abc", word2 = "abcdef"` → 3 insertions. `word1 = "abcdef", word2 = "abc"` → 3 deletions.
- **Completely different strings:** `word1 = "abc", word2 = "xyz"` → 3 replacements (length equal, all differ).
- **All same character:** `word1 = "aaaa", word2 = "aa"` → 2 deletions. The DP handles this correctly.
- **Off-by-one with indexing:** `word1.charAt(i - 1)` not `charAt(i)` — because `dp[i][j]` represents the first `i` characters, so the i-th character is at index `i-1` in the string.
- **Space optimization:** Rolling array reduces space to O(n). Keep just the previous row (or two rows). The standard O(m×n) solution is usually acceptable in interviews.
- **Symmetric property:** `minDistance(A, B) == minDistance(B, A)` — the three operations (insert, delete, replace) are symmetric when you consider insert from one side as delete from the other. But the DP as written treats directions asymmetrically — the answer is still correct either way.
