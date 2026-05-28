## Cases to mention to the interviewer

- **Empty lists array:** `lists = []` or `lists = null`. The for loop doesn't run. Heap is empty. Return `dummy.next = null`. ✓
- **All lists are null/empty:** `lists = [null, null, null]`. The null check skips all of them. Heap empty. Return null. ✓
- **k=1:** Single list — just return it. Heap holds one node at a time, draining the single list into the result. Correct but slightly wasteful; could special-case but not necessary.
- **Lists of different lengths:** `[[1,2,3], [4], [5,6]]`. Heap handles variable-length lists naturally — shorter lists just stop contributing nodes sooner.
- **Negative values:** `[[-3,-1,2], [-4,0]]`. The `Comparator.comparingInt` heap correctly orders negative values since it compares by integer value.
- **Duplicate values across lists:** `[[1,2], [1,3]]`. Heap may hold two nodes with value 1. Both are valid to poll first — result correctly starts with `1,1,...`.
- **Single node in each list:** `[[1],[2],[3]]`. Three heap operations total. Result: `1→2→3`. ✓
- **Very large k:** With k=10⁴ and total n=10⁴ (one node per list), the heap has size up to 10⁴ and operations are O(log 10⁴) ≈ 13. Total: O(n log k) ≈ 130K ops. Fast.
