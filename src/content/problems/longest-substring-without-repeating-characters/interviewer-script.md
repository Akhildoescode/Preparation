## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few quick clarifications:
- What characters can appear in the string — just lowercase letters, or also uppercase, digits, spaces, symbols? This affects whether I use an array of size 26 or a HashMap.
- Should I return the length, or also the actual substring?
- What's the expected output for an empty string — 0?"

### 2. State the brute force (90 seconds)
"The brute force checks every substring and uses a Set to verify all characters are unique. That's O(n²) substrings, each taking up to O(n) time to check — O(n³) total. I can improve to O(n²) by extending the Set incrementally, but we can do O(n) with a sliding window."

### 3. Walk through the optimal approach (3 minutes)
"I'll maintain a window [left, right] where all characters are unique. As I advance `right`, I track the last-seen index of each character in a HashMap. If `s[right]` was seen inside the current window (at an index ≥ left), I jump `left` past that previous occurrence.

Two important details:
- I compare the stored index to `left` — if the character was last seen before `left`, it's no longer in the window, so no conflict.
- I jump `left` directly to `lastSeen[c] + 1` instead of incrementing one step at a time — O(1) per step.

Let me trace `'abcabcbb'`:
- right=0(a): map={a:0}, max=1
- right=1(b): map={b:1}, max=2
- right=2(c): map={c:2}, max=3
- right=3(a): a was at 0 ≥ left(0) → left=1. map={a:3}, window='bca', max=3
- right=4(b): b was at 1 ≥ left(1) → left=2. map={b:4}, window='cab', max=3
- right=5(c): c was at 2 ≥ left(2) → left=3. window='abc', max=3
- right=6(b): b was at 4 ≥ left(3) → left=5. window='cb', max=3
- right=7(b): b was at 6 ≥ left(5) → left=7. window='b', max=3
Answer: 3."

### 4. State complexity before coding
"O(n) time — right advances n times, left never goes backward. O(min(n,m)) space for the map, where m is charset size. I'll code it."

### 5. After coding
"Edge cases: empty string → loop doesn't run, return 0. Single character → window of size 1. All same character like 'aaa' → left chases right, window stays size 1 throughout. Looks correct."
