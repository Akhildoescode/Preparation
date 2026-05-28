## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Are the strings lowercase English letters only, or can they contain uppercase or digits?
- Can strings be empty? An empty string is an anagram of itself, so it would form its own group.
- Does the order of groups or the order of strings within a group matter in the output?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to compare every pair of strings to check if they are anagrams — two strings are anagrams if their sorted character arrays are equal. That gives us O(n²) pair comparisons, each costing O(m log m) to sort. For n equals 10,000 strings that is far too slow. We can do better by observing that sorting is a canonical key."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that anagrams are exactly the strings that share the same sorted character sequence. So instead of comparing pairs, I can map every string to its sorted form and use a hash map to group strings with matching keys. My approach is:
- Step 1: For each string, sort its characters to produce a key.
- Step 2: Use a HashMap from key to list of original strings.
- Step 3: Return all the map's value lists.

Let me trace through: strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'].

- 'eat' → sorted key 'aet' → map: {'aet': ['eat']}
- 'tea' → sorted key 'aet' → map: {'aet': ['eat', 'tea']}
- 'tan' → sorted key 'ant' → map: {'aet': ['eat','tea'], 'ant': ['tan']}
- 'ate' → sorted key 'aet' → map: {'aet': ['eat','tea','ate'], 'ant': ['tan']}
- 'nat' → sorted key 'ant' → map: {'aet': ['eat','tea','ate'], 'ant': ['tan','nat']}
- 'bat' → sorted key 'abt' → map: {'aet': [...], 'ant': [...], 'abt': ['bat']}

Return the three value lists."

### 4. State complexity before coding
"This will be O(n * m log m) time and O(n * m) space, where n is the number of strings and m is the max length. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with the example — three groups: eat/tea/ate, tan/nat, bat. Now the edge case: a single empty string — sorted key is '', it forms its own group. Looks correct. Any concerns about the approach or the code?"
