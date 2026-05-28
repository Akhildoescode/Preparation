## Reference solution

**Complexity:** set — O(1), get — O(log n) per key; Space — O(n).

```java
class TimeMap {
    // Each key maps to a list of {timestamp, value} pairs, sorted by timestamp
    private final Map<String, List<int[]>> times;
    private final Map<String, List<String>> values;

    public TimeMap() {
        times = new HashMap<>();
        values = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        // Timestamps are strictly increasing per key, so just append
        times.computeIfAbsent(key, k -> new ArrayList<>()).add(new int[]{timestamp});
        values.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
    }

    public String get(String key, int timestamp) {
        if (!times.containsKey(key)) return "";

        List<int[]> ts = times.get(key);
        List<String> vals = values.get(key);

        // Binary search for the rightmost timestamp <= query
        int lo = 0, hi = ts.size() - 1, result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (ts.get(mid)[0] <= timestamp) {
                result = mid;   // valid candidate; search right for a later one
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return result == -1 ? "" : vals.get(result);
    }
}
```

## Line-by-line notes
- **Two parallel lists:** Keeping timestamps and values in separate lists avoids creating wrapper objects — `int[]` for timestamps is cache-friendly.
- **`computeIfAbsent`:** Creates the list on first access cleanly without a null-check.
- **`result = mid; lo = mid + 1`:** This is the "find last valid" binary search pattern. We record the current best and keep searching right for a potentially larger valid timestamp.
- **`result == -1`:** No timestamp ≤ query was found for this key; return "".

## Common bugs to avoid
- **Using `lo = mid` instead of `lo = mid + 1` when valid:** Without `+1`, the search doesn't advance and can infinite-loop.
- **Forgetting the key-not-found case:** If `get` is called for a key that was never `set`, return "" not throw a NullPointerException.
- **Wrong comparison direction:** We want the *largest* timestamp ≤ query, so when `ts[mid] <= query` we advance `lo` (look for a bigger valid index), not `hi`.
