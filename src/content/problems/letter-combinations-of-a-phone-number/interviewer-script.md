## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Can the input be empty? I'll return an empty list for empty input.
- The phone map is fixed per the problem: 2→abc through 9→wxyz, with 7 and 9 having 4 letters (pqrs, wxyz). Correct?
- Should I handle '0' or '1'? The problem says digits are 2–9, so I'll assume no 0 or 1."

### 2. State the brute force (90 seconds)
"I could build combinations iteratively: start with the letters for the first digit, then extend each with every letter for the second digit, and so on. This produces the same output in the same time — O(4^n · n) — but backtracking is cleaner since it naturally handles the recursion over digit positions."

### 3. Walk through the optimal approach (3 minutes)
"I build combinations character by character. At depth `idx`, I pick one letter from `PHONE[digits[idx]]`, append it, recurse for digit `idx+1`, then remove it.

Trace: digits = '23'. PHONE['2'→0+2=2] = 'abc', PHONE['3'→3] = 'def'.
- idx=0, try 'a': sb='a'. idx=1, try 'd': sb='ad' → record. Try 'e': sb='ae' → record. Try 'f': sb='af' → record.
- idx=0, try 'b': sb='b'. idx=1: record 'bd','be','bf'.
- idx=0, try 'c': sb='c'. idx=1: record 'cd','ce','cf'.
Result: 9 combinations = 3 × 3. Exactly what we expect."

### 4. State complexity before coding
"O(4^n · n) time. O(n) auxiliary space — only the recursion stack and the StringBuilder. Coding now."

### 5. After coding
"I guard against empty input at the top, before calling backtrack. If digits is empty, the base case `idx == digits.length()` would fire immediately and add an empty string — not the expected behavior."
