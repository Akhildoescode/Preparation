## Cases to mention to the interviewer

- **Empty string insert/search/startsWith:** LeetCode constraints say word length ≥ 1, so empty strings aren't tested. But if they were: traversal loop doesn't run; `insert` sets `root.isEnd = true`; `search("")` returns `root.isEnd`; `startsWith("")` returns true (root is always reachable).
- **Word that is a prefix of another:** Insert "app" then "apple". `search("app")` → true (isEnd set at 'p'). `search("apple")` → true (isEnd set at 'e'). Both words coexist — they share the "app" path.
- **Prefix that is a word:** `startsWith("app")` after inserting "apple" → true. `search("app")` after inserting only "apple" → false (`isEnd` at 'p' is NOT set since only "apple" was inserted, which terminates at 'e').
- **Single character words:** Insert "a". `children['a'-'a']` at root is non-null, `isEnd=true`. `search("a")` → true. `startsWith("a")` → true. `search("ab")` → false ('b' child of 'a' node is null).
- **All 26 letters used:** Root can have up to 26 non-null children. The fixed array of size 26 handles all lowercase letter combinations.
- **Long words:** With m=2000 (max per constraints), a single `insert` does 2000 array lookups. Still O(m) and fast.
- **Duplicate inserts:** Inserting the same word twice is harmless — all nodes already exist, and `isEnd = true` is set again on an already-true flag.
