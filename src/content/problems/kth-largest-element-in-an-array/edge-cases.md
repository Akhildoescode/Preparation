## Cases to mention to the interviewer

- **k = 1 (find the maximum):** Heap ends with one element — the largest seen. ✓
- **k = n (find the minimum):** Heap maintains all n elements after the last poll, and the top (minimum) is the answer. Every element is retained — n heap operations.
- **All duplicates:** `[3, 3, 3, 3]`, k=2. Answer is 3. Heap correctly handles duplicates; all elements are 3 and any of them is the "kth largest."
- **Negative numbers:** `[-1, -2, -3, -4]`, k=2. Answer is -2 (second largest). Min-heap: after processing, heap = {-2, -1}, peek = -2. ✓
- **Single element, k=1:** `[42]`, k=1. One heap operation, heap={42}, peek=42. ✓
- **QuickSelect worst case:** If input is sorted and pivot is always the last element, QuickSelect degrades to O(n²). Mention randomizing the pivot: `swap(nums, left + random.nextInt(right - left + 1), right)` before partitioning. This gives expected O(n) regardless of input order.
- **Integer overflow in QuickSelect comparator:** If using `(a, b) -> a - b` as comparator in a heap, values near ±Integer.MAX_VALUE cause overflow. Always use `Integer.compare(a, b)` or `Comparator.comparingInt`.
