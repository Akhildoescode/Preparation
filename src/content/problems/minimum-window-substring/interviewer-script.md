## What to say, in order

### 1. Clarifying questions (60 seconds)
"Let me confirm the requirements:
- If `t` has repeated characters, e.g. `t = 'AAB'`, the window must contain at least two A's and one B?
- Should I return the actual substring or just its length?
- If there are multiple minimum windows of the same length, which do I return? (LeetCode: return any one.)
- If no valid window exists, return empty string?"

### 2. State the brute force (90 seconds)
"Brute force: try all O(n²) substrings of s, check each one against t's frequency map. O(n²m) total — too slow. I'll use a sliding window that expands and shrinks efficiently."

### 3. Walk through the optimal approach (3 minutes)
"I'll use two pointers. `right` expands the window until it's valid (covers all of `t`'s characters at required frequency), then `left` shrinks it looking for the minimum valid window, then `right` expands again.

Key optimization: instead of rescanning the frequency map to check validity, I track `formed` — the count of unique characters in `t` that are currently satisfied in the window. When `formed == required` (number of unique chars in t), the window is valid.

Pseudocode:
1. Build tFreq from t.
2. required = tFreq.size().
3. For each right: add s[right] to windowFreq. If windowFreq[s[right]] == tFreq[s[right]], formed++.
4. While formed == required: record min window. Remove s[left] from windowFreq. If count drops below required, formed--. left++.

Let me trace s='ADOBECODEBANC', t='ABC':
- Expand to cover A, B, C → [0,5]='ADOBEC'. formed=3.
- Shrink: remove A, formed drops → expand again → cover more...
- Eventually, [9,12]='BANC' is the minimum valid window. Answer: 'BANC'."

### 4. State complexity before coding
"O(n + m) time, O(m) space. I'll code it now."

### 5. After coding
"Edge case: t='A', s='A'. right=0: add A, formed=1=required. Record window 'A', left=0: remove A, formed drops to 0. left=1. right exhausted. Return 'A'. ✓"
