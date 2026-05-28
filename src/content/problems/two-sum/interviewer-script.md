## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the array contain negative numbers or duplicates? That won't change my approach but I want to be sure about the output format.
- Is there always exactly one solution, or should I handle the case where none exists?
- Can I use the same element twice? I.e., if `nums[0] = 3` and target is 6, does `[0, 0]` count?
- Should I return indices in sorted order or in the order I find them?"

### 2. State the brute force (90 seconds)
"The simplest approach is to check every pair of indices (i, j) where i < j and see if `nums[i] + nums[j]` equals the target. That's two nested loops — O(n²) time, O(1) space. For n up to 10⁴ that's 10⁸ operations; I'd expect a TLE. We can do better."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that for any number I'm looking at, its required partner is exactly `target - nums[i]`. If I can check in O(1) whether that partner exists — and where — then one pass through the array is enough.

So my approach:
- Maintain a HashMap from `value → index`.
- For each element at index i: compute `complement = target - nums[i]`.
- If complement is already in the map, return `[map.get(complement), i]`.
- Otherwise, insert `nums[i] → i` into the map and continue.

Let me trace through `nums = [2, 7, 11, 15]`, target = 9:
- i=0: complement = 7. Map is empty — not found. Insert 2→0.
- i=1: complement = 2. Map has 2→0 — found! Return [0, 1]. ✓"

### 4. State complexity before coding
"This runs in O(n) time because each HashMap lookup and insert is O(1) amortized. Space is O(n) for the map. I'll start coding."

### 5. After coding
"Let me test with `nums = [3, 3]`, target = 6:
- i=0: complement = 3, map is empty. Insert 3→0.
- i=1: complement = 3, map has 3→0. Return [0, 1]. ✓

Edge case where complement would be the element itself — handled correctly because we check before inserting, so we'd never match index i with itself.

Any concerns about the approach or code?"
