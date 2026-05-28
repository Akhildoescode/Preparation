## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- The string contains only uppercase English letters, right?
- k can be 0, meaning no replacements allowed — in that case we want the longest run of a single character?
- We want the length of the substring, not the substring itself?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to check every substring. For each pair of start and end indices, count character frequencies, find the most frequent character, and check if (length minus that count) is at most k. That gives us O(n²) substrings and we spend O(26) per substring — effectively O(n²). For n equals 100,000 that's 10 billion operations, too slow. We can do better with a sliding window."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that a window is valid exactly when (window size minus count of the most frequent character) is at most k — those are the characters we must replace. So my approach is:
- Step 1: Expand the right pointer, updating a frequency array and tracking maxCount — the highest single-character frequency any window has ever had.
- Step 2: If the window needs more than k replacements, slide the left pointer one step right.
- Step 3: Since the window never shrinks, its final size equals the longest valid window we found.

Let me trace through: s = 'AABABBA', k = 1.

- r=0 (A): count[A]=1, maxCount=1. Window='A', size=1, replacements=0. Valid.
- r=1 (A): count[A]=2, maxCount=2. Window='AA', size=2, replacements=0. Valid.
- r=2 (B): count[B]=1, maxCount=2. Window='AAB', size=3, replacements=1. Valid.
- r=3 (A): count[A]=3, maxCount=3. Window='AABA', size=4, replacements=1. Valid.
- r=4 (B): count[B]=2, maxCount=3. Window='AABAB', size=5, replacements=2. 2 > k=1 — slide l. Remove A: count[A]=2. Window='ABAB', size=4. Still size 4.
- r=5 (B): count[B]=3, maxCount=3. Window='ABABB', size=5, replacements=2. Slide l. Remove A: count[A]=1. Window='BABB', size=4.
- r=6 (A): count[A]=2, maxCount=3. Window='BABBA', size=5, replacements=2. Slide l. Remove B: count[B]=2. Window='ABBA', size=4.

Window never grew past 4 after the first shrink, so answer is 4."

### 4. State complexity before coding
"This will be O(n) time and O(1) space — the frequency array is always 26 entries. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with 'AABABBA', k=1 — we get 4. Edge case: k=0, s='AAABBB' — longest run of one char is 3 (the A's). Correct. Any concerns about the approach or the code?"
