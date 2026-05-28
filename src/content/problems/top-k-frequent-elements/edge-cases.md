## Cases to mention to the interviewer

- **k equals total distinct elements:** All distinct elements are in the top-k. The heap never ejects anything — returns all distinct elements.
- **k = 1:** Return the single most frequent element. The heap maintains only one element — whichever has the highest frequency.
- **All elements identical:** `nums=[5,5,5], k=1`. Freq={5→3}. Only one distinct element; heap returns [5].
- **All elements distinct:** `nums=[1,2,3,4], k=2`. Each has frequency 1. The top-k is any 2 — the problem guarantees a unique answer, implying no tie here.
- **Single element array:** `nums=[7], k=1`. Freq={7→1}. Heap contains only 7. Return [7].
- **Negative numbers:** HashMap handles negative integer keys correctly.
