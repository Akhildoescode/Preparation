## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I design:
- Are timestamps guaranteed to be strictly increasing across all `set` calls for the same key? That's crucial — it's what lets me binary search.
- What should `get` return if no timestamp ≤ the query exists for that key?
- Are keys arbitrary strings? Any constraint on the number of distinct keys or total operations?"

### 2. State the brute force (90 seconds)
"The naive approach stores all (timestamp, value) pairs per key in a list, then linearly scans for the largest timestamp ≤ the query. That's O(1) for set and O(n) for get where n is the number of set calls for that key. We can do better."

### 3. Walk through the optimal approach (3 minutes)
"Since timestamps are strictly increasing, the list for each key is already sorted. So for `get`, I can binary search for the largest timestamp ≤ the query — a 'find rightmost valid' variant:

Set lo=0, hi=list.size()-1, result=-1.
While lo ≤ hi:
  mid = lo + (hi-lo)/2
  If list[mid].time <= query: result = mid, lo = mid+1.  // mid is valid, maybe there's a later one
  Else: hi = mid-1.
Return result == -1 ? '' : list[result].value.

Let me trace: set('foo', 'bar', 1), set('foo', 'baz', 3), get('foo', 4):
List for 'foo': [{1,'bar'}, {3,'baz'}].
lo=0, hi=1.
- mid=0. time=1 ≤ 4 → result=0, lo=1.
- mid=1. time=3 ≤ 4 → result=1, lo=2.
lo > hi. Return list[1].value = 'baz'. Correct."

### 4. State complexity before coding
"O(1) for set, O(log n) for get per key. Space O(n) total. Sounds good?"

### 5. After coding
"Edge case: get called before any set for that key — map doesn't contain the key, return ''. Edge case: query timestamp smaller than all stored timestamps — result remains -1, return ''."
