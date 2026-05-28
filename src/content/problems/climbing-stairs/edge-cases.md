## Cases to mention to the interviewer

- **n = 0:** There is 1 way to "reach" the top — don't move. Return 1.
- **n = 1:** One way — take a single 1-step. Return 1.
- **n = 2:** Two ways — [1+1] or [2]. Return 2. This is the first non-trivial case where both options from step 0 differ.
- **Large n:** For n=45 (problem constraint max), the answer is 1,836,311,903 — within int range (just barely). For n>45, you'd need long or BigInteger.
- **Generalization (k steps):** If up to k steps are allowed, the recurrence extends to `dp[i] = dp[i-1] + dp[i-2] + ... + dp[i-k]` — worth mentioning as a follow-up.
