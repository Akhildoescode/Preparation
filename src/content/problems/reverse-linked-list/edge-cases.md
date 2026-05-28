## Cases to mention to the interviewer

- **Empty list (null head):** `null` → `null`. `curr = null` → while loop doesn't run → `prev = null` → return `null`. ✓
- **Single node:** `[1]` → `[1]`. curr=1→null: next=null, 1.next=null, prev=1, curr=null. Return 1. ✓ Node unchanged (pointed to null before and after).
- **Two nodes:** `[1→2]` → `[2→1]`. Iter 1: next=2, 1.next=null, prev=1, curr=2. Iter 2: next=null, 2.next=1, prev=2, curr=null. Return 2. ✓
- **Palindromic list:** `[1→2→2→1]`. Reversal produces `[1→2→2→1]` — same structure. Relevant for the "Reorder List" problem which uses reversal as a step.
- **All same value:** `[3→3→3]`. Reversal is structurally identical but still needed — the pointers are different nodes even if values match.
- **Very long list:** Stack overflow risk with the recursive approach (O(n) call stack for n = 10⁵). The iterative approach is always safe — only 3 pointer variables on the stack.
- **Cycle in input:** The problem guarantees no cycle, but a cycle would cause the while loop to run forever. If the interviewer mentions cycles, `curr != null` condition would loop infinitely — Floyd's algorithm or a visited set would be needed to detect and break the cycle first.
