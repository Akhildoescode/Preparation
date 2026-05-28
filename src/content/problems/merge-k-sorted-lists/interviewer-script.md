## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- Are the k lists guaranteed to be sorted in non-decreasing order?
- Can lists be null or empty? (Some lists might have 0 nodes.)
- What should I return if all lists are empty or k=0? (Return null.)
- The values can be negative, right?"

### 2. State the brute force (90 seconds)
"The naive approach is to merge lists pairwise: merge list1 and list2 (O(n₁+n₂)), then merge that with list3, etc. If all lists have n/k nodes each, total work is O(nk) — too slow for large k. I'll use a min-heap for O(n log k)."

### 3. Walk through the optimal approach (3 minutes)
"I'll use a PriorityQueue (min-heap) that holds one node per list — the current smallest unmerged node from each list. At each step, poll the minimum, attach it to the result, then push that node's next node (if any) into the heap. This ensures the heap always holds the frontier of each list.

I'll use a dummy head node to simplify the result list construction — no need to special-case the first node.

Let me trace `[[1→4→5], [1→3→4], [2→6]]`:
- Init heap: {1(L1), 1(L2), 2(L3)}.
- Poll 1(L1), push 4(L1). Heap: {1(L2), 2(L3), 4(L1)}.
- Poll 1(L2), push 3(L2). Heap: {2(L3), 3(L2), 4(L1)}.
- Poll 2(L3), push 6(L3). Heap: {3(L2), 4(L1), 6(L3)}.
... final: 1→1→2→3→4→4→5→6."

### 4. State complexity before coding
"O(n log k) time — n total poll/push operations, each O(log k) heap operation. O(k) space for the heap. I'll code it now."

### 5. After coding
"Edge case: one of the lists is null. I only push non-null heads in initialization, and only push node.next when it's non-null — handled. Edge case: k=0 or all null lists — heap stays empty, dummy.next is null, return null. ✓"
