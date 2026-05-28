## Understanding the problem
Design a key-value store where each key maps to multiple values recorded at different timestamps. `set(key, value, timestamp)` stores the pair. `get(key, timestamp)` returns the value associated with the largest timestamp ≤ the given timestamp, or "" if none exists. Timestamps are strictly increasing per key, which is the property that enables binary search.

## Brute force
For `get`, scan all (timestamp, value) pairs for the key and find the largest timestamp ≤ the query. O(n) per query where n is the number of `set` calls for that key.

## Key insight
Since timestamps are guaranteed to arrive in strictly increasing order (per problem constraints), the list of (timestamp, value) pairs for each key is naturally sorted by timestamp. We can binary search for the rightmost timestamp ≤ the query timestamp.

## Optimal approach
- Store a `HashMap<String, List<int[]>>` where each list holds `[timestamp, valueIndex]` pairs sorted by timestamp (maintained for free since timestamps are strictly increasing).
- Actually simpler: store `HashMap<String, List<long[]>>` or two parallel lists per key. Or store pairs directly.
- For `get`: binary search for the last entry with timestamp ≤ the given timestamp. Use a "find rightmost ≤" variant of binary search.

Implementation:
1. `Map<String, List<int[]>> store` where each `int[]` is `{timestamp, valueIndex}` and values are stored in a parallel `List<String>`.
2. Simpler: `Map<String, List<int[]>>` where we store the value as an int index into a string list — or just `Map<String, List<String[]>>` with `{timestampStr, value}`.
3. For `get`, binary search within the list for the key.

## Why this works
The "find last ≤" binary search invariant: maintain `lo` as the best candidate index found so far. When `times[mid] <= target`, `mid` is a valid candidate → `lo = mid` (or record answer). When `times[mid] > target` → `hi = mid - 1`.

## Complexity
- `set`: O(1) amortized (append to list)
- `get`: O(log n) per query where n = number of set calls for that key
- Space: O(n) total across all keys
