## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick confirms:
- 'Kth largest' by value, not distinct value? So in [3,3,3], k=2, the answer is 3?
- k is always valid (1 ≤ k ≤ n)?
- Should I aim for O(n log k) with a heap, or O(n) average with QuickSelect? I'll start with the heap and mention QuickSelect."

### 2. State the brute force (90 seconds)
"Sort descending, return `nums[k-1]`. O(n log n). Works but doesn't take advantage of the problem structure. A min-heap of size k reduces to O(n log k). QuickSelect averages O(n) without extra space."

### 3. Walk through the optimal approach (3 minutes)
"I'll use a min-heap of size k. The idea: the kth largest is the minimum of the k largest elements. Maintain a min-heap that always holds the k largest seen so far. When it exceeds k, evict the minimum (which is no longer in the top k).

For each number: add to heap. If heap size > k, poll the minimum. After processing all numbers, heap.peek() is the answer.

Trace `[3, 2, 1, 5, 6, 4]`, k=2:
- Add 3: heap={3}
- Add 2: heap={2,3}
- Add 1: heap={2,3} size=3>2, poll 1→heap={2,3}. Wait, heap is min, so poll 2? Let me redo: after adding 1, heap={1,2,3} size=3>2, poll min=1 → heap={2,3}. Hmm: add 3→{3}, add 2→{2,3} size≤2 ok, add 1→{1,2,3} size=3>2, poll 1→{2,3}, add 5→{2,3,5} size>2, poll 2→{3,5}, add 6→{3,5,6} poll 3→{5,6}, add 4→{4,5,6} poll 4→{5,6}. peek=5. ✓"

### 4. State complexity before coding
"O(n log k) time, O(k) space. I'll also mention QuickSelect gives O(n) average but O(n²) worst case without random pivot. Coding the heap approach now."

### 5. After coding
"Edge: k=1 means find the maximum. Heap ends up with just one element — the largest. ✓"
