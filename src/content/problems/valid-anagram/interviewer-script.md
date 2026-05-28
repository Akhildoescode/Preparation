## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Are the inputs guaranteed to be lowercase English letters only, or could there be uppercase, digits, or Unicode characters?
- Is an empty string considered an anagram of another empty string?
- Can the strings have different lengths — should I return false immediately in that case?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to sort both strings and compare them character by character. Sorting each string takes O(n log n) and the comparison takes O(n), giving O(n log n) overall. We can do better with a linear pass."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that two strings are anagrams if and only if their character frequency distributions are identical. I can capture this with a single int array of size 26 — one slot per letter. I increment for characters in s and decrement for characters in t. A perfect anagram cancels everything to zero. So my approach is:

Step 1: Short-circuit if the lengths differ — can't be anagrams.
Step 2: Walk both strings simultaneously, incrementing freq for s's char and decrementing for t's char.
Step 3: Verify all 26 entries are zero.

Let me trace through `s = \"cat\"`, `t = \"act\"`:
- i=0: s='c', t='a' → freq['c'-'a']++ → freq[2]=1, freq['a'-'a']-- → freq[0]=-1
- i=1: s='a', t='c' → freq[0]=0, freq[2]=0
- i=2: s='t', t='t' → freq[19]++ then -- → freq[19]=0
- All zeros → return true."

### 4. State complexity before coding
"This will be O(n) time and O(1) space — fixed 26-slot array regardless of input length. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `s = \"rat\"`, `t = \"car\"` — r, a, t counts go to +1 each from s; c, a, r from t — 'c' has count -1 at the end, so we return false. Edge case: empty strings — length check passes (both 0), loop doesn't run, all zeros, returns true. Looks correct. Any concerns about the approach or the code?"
