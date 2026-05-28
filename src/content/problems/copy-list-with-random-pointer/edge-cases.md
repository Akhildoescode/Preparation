## Cases to mention to the interviewer

- **Empty list (null head):** Pass 1 and Pass 2 loops never execute. `map.get(null)` returns null. Correct — copying an empty list yields an empty list.
- **Single node, random = null:** Map has one entry. Pass 2 sets clone.next = null, clone.random = null. Returns the single clone correctly.
- **Single node, random points to itself:** Pass 2 sets clone.random = map.get(self) = clone. The clone correctly self-references, which is a valid deep copy (no original node is referenced).
- **All random pointers point to the head:** Every clone's random field is set to `map.get(head)` = head's clone. All clones correctly share a reference to the same clone node — no original node is referenced.
- **All random pointers are null:** Pass 2 sets all clone.random = `map.get(null)` = null. Works cleanly without any special handling.
- **Random pointer points to a later node (forward reference):** Since all clones are created in Pass 1 before any wiring in Pass 2, the forward-referenced clone already exists in the map. This is the main correctness argument for the two-pass design.
- **Integer overflow risk:** Not applicable — node values are copied as-is with no arithmetic.
