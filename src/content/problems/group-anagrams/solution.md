## Reference solution

**Complexity:** O(n * m log m) time, O(n * m) space.

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Maps each sorted-character key to the group of original strings
        // that produce that key. All anagrams of a word share one key.
        var map = new HashMap<String, List<String>>();

        for (var s : strs) {
            // Produce the canonical key: sort the characters of s.
            // "eat", "tea", "ate" all become "aet".
            var chars = s.toCharArray();
            Arrays.sort(chars);
            var key = new String(chars);

            // If this key is new, create an empty list for it first.
            // computeIfAbsent avoids the explicit null-check boilerplate.
            map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(s);
        }

        // Return all groups; order is unspecified so wrap values() directly.
        return new ArrayList<>(map.values());
    }
}
```

## Line-by-line notes
- **`s.toCharArray()` then `Arrays.sort(chars)`:** Strings are immutable in Java; we must extract a `char[]`, sort in-place, then reconstruct the key string. There is no `String.sorted()` shortcut.
- **`map.computeIfAbsent(key, ignored -> new ArrayList<>()).add(s)`:** Atomically: if the key is absent, insert a new list and return it; if present, return the existing list. Chaining `.add(s)` in one line avoids a separate `get` call.
- **`new ArrayList<>(map.values())`:** `map.values()` returns a `Collection` view, not a `List`. The constructor wraps it in a proper `List` as required by the return type.

## Common bugs to avoid
- **Using `s` directly as a key without sorting:** Two anagrams would get different keys and land in separate buckets — the entire grouping logic breaks.
- **Mutating the `key` string:** In Java, strings are immutable, so once constructed from `chars`, the key is safe. In languages with mutable strings, you would need to be careful about aliasing.
- **`map.get(key) == null` check instead of `computeIfAbsent`:** Both are correct, but the null-check version requires two map lookups (get + put) instead of one — less idiomatic in Java 8+.
