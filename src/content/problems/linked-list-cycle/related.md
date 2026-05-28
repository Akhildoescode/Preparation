## Same pattern, different problem
- **Reorder List:** Also uses the slow/fast pointer trick to find the midpoint of the list before splitting and reversing — the first step of that solution is identical to finding where slow lands here.
- **Find the Duplicate Number:** Uses Floyd's cycle detection on an implicit linked list formed by treating array values as next-pointers; the exact same tortoise-and-hare logic detects where the duplicate is.
- **Merge Two Sorted Lists:** Related linked list manipulation — while not cycle detection, mastery of pointer rewiring is a prerequisite for both problems.
- **LRU Cache:** Requires understanding node identity (reference equality) and pointer manipulation at the same level of comfort as cycle detection.

## When this pattern applies
Use two pointers at different speeds whenever you need to detect a cycle or find the midpoint of a linked structure in O(1) space. The invariant is that the speed difference of 1 step per iteration causes fast to gain on slow by exactly 1 position per cycle iteration, guaranteeing a meeting in O(L) steps. Any problem that asks you to detect repetition or find the "middle" of a linked list without using extra memory is a candidate for this pattern.
