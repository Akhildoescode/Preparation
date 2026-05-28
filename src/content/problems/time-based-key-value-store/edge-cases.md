## Cases to mention to the interviewer

- **Key never set:** `get("foo", 5)` when "foo" was never passed to `set` — return "".
- **Query timestamp before all stored timestamps:** `set("a","v",10); get("a",5)` — no valid entry, return "".
- **Exact timestamp match:** `set("a","v",5); get("a",5)` — should return "v"; the `<=` in the comparison handles equality.
- **Multiple values for same key, different timestamps:** `set("a","v1",1); set("a","v2",3); get("a",2)` — should return "v1" (largest timestamp ≤ 2 is 1).
- **Query timestamp after all stored timestamps:** Should return the most recent value — the binary search converges to the last element.
- **Single set, single get exact match:** Simplest case — list has one entry, binary search returns it directly.
