## What to say, in order

### 1. Clarifying questions (60 seconds)
"Quick clarifications:
- Is k guaranteed to be ≤ the number of distinct elements?
- Is the output order significant? I'll assume any order of the top-k is acceptable.
- Can there be ties in frequency? The problem guarantees a unique answer, so no tie-breaking needed."

### 2. State the brute force (90 seconds)
"Count frequencies with a HashMap, sort entries by frequency descending, take the first k. O(n log n) time. This works but we can do better since we don't need a full sort — only the top-k elements."

### 3. Walk through the optimal approach (3 minutes)
"Two good approaches: a min-heap of size k, or bucket sort.

Min-heap: maintain a min-heap (ordered by frequency) of size k. For each (element, freq) pair: if the heap has fewer than k elements or the current element's frequency exceeds the minimum in the heap, add it (pop the minimum if the heap exceeds k). This gives O(n log k).

Bucket sort: frequencies are bounded by n. Create an array of lists where `buckets[f]` contains all elements with frequency f. Scan from f=n down to f=1 and collect elements until we have k — O(n).

I'll implement the min-heap approach since it generalizes to streaming scenarios:

Example: nums=[1,1,1,2,2,3], k=2.
Freq map: {1→3, 2→2, 3→1}.
Min-heap (by freq):
- Add (1,3): heap=[(1,3)].
- Add (2,2): heap=[(2,2),(1,3)].
- Add (3,1): heap size=2=k. freq(3)=1 < heap.peek().freq=2, don't add. Heap stays [(2,2),(1,3)].
Result: [1, 2]."

### 4. State complexity before coding
"O(n log k) time, O(n) space. Bucket sort is O(n) if you prefer. I'll use the heap."

### 5. After coding
"The bucket sort variant is worth mentioning as a follow-up — O(n) time by exploiting the frequency bound. Useful if k is large relative to n."
