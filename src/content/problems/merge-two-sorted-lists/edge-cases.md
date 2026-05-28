## Cases to mention to the interviewer

- **Both lists empty (null):** The while loop never runs. `current.next` is set to null (both null, ternary picks list2 which is null). `dummy.next` is null — returns null. Correct for merging two empty lists.
- **One list empty:** `l1 = null`, `l2 = 1 → 2 → 3`. Loop skips. Remainder attaches `l2` directly. Returns `l2`'s head. Correct.
- **Single-element lists:** `l1 = [1]`, `l2 = [2]`. One comparison, smaller is attached, loop ends, remainder attached. Returns `1 → 2`.
- **All duplicates across lists:** `l1 = [1, 1]`, `l2 = [1, 1]`. The `<=` condition picks from `l1` when equal, so output is `1 → 1 → 1 → 1`. All values are present, sorted, and no node is lost.
- **One list is a strict prefix of merged output:** `l1 = [1, 2, 3]`, `l2 = [4, 5]`. The while loop drains `l1` entirely first, then attaches `l2` as the remainder.
- **Lists of very different lengths:** `l1 = [1]`, `l2 = [2, 3, 4, 5, 6]`. After one comparison, `l1` is exhausted; the tail of `l2` is appended in O(1) — no extra iteration needed.
- **Integer overflow risk:** Not applicable — we compare node values but never add them.
