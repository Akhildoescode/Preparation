## Cases to mention to the interviewer

- **Empty list:** The null guard returns immediately. No nodes to reorder.
- **Single node:** `head.next == null` guard returns immediately. A single-node list is already in the correct order.
- **Two nodes:** `1 → 2`. Midpoint is node 1 (first half), second half is node 2. Reverse of a single node is itself. Merge produces `1 → 2`. Already correct — no visible change, but the code handles it without errors.
- **Even-length list:** `1 → 2 → 3 → 4`. Midpoint lands at node 2 (first half = 1→2, second = 3→4). Reversed second = 4→3. Merge: 1→4→2→3. Correct.
- **Odd-length list:** `1 → 2 → 3 → 4 → 5`. Midpoint lands at node 3 (first half = 1→2→3, second = 4→5). The middle node (3) stays at the end after merging, which is the expected behaviour.
- **All same values:** `[7, 7, 7, 7]`. The reorder still applies structurally to pointer positions, not values. Output pointer structure is correct regardless of duplicate values.
- **Integer overflow risk:** Not applicable — we never perform arithmetic on node values.
