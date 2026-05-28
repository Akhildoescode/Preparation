## Cases to mention to the interviewer

- **Empty input array:** If `strs` is empty, the loop never runs, the map is empty, and `new ArrayList<>(map.values())` returns an empty list. Correct.

- **Single string:** One string forms a single group by itself. The map gets one entry with a one-element list. Output is `[[s]]`.

- **All strings are the same (e.g., ["abc", "abc", "abc"]):** Every string produces the same sorted key; all three land in one group. Output is `[["abc","abc","abc"]]`.

- **No two strings are anagrams (e.g., ["abc", "def", "ghi"]):** Every sorted key is unique; each string forms its own singleton group. Output has as many groups as input strings.

- **Empty strings in input (e.g., ["", ""]):** The empty string sorts to "" — two empty strings are anagrams of each other. Both land in the same group under key "". Return `[[""," ""]]`.

- **Strings of different lengths:** Anagrams must have the same length, so strings of different lengths can never share a sorted key. The algorithm naturally separates them without any length check.

- **Integer overflow risk:** Not applicable — this problem involves string lengths, not numeric values. However, if you were using a frequency-vector key (int[26] converted to string) instead of sorting, be mindful of key collision if the encoding is ambiguous.
