## Understanding the problem

Given a singly linked list L0 → L1 → … → Ln-1 → Ln, reorder it in-place to L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → … You are not allowed to modify node values — only the node pointers may change. The result must be written back into the original list.

## Brute force

Collect all nodes into an `ArrayList`, then use two pointers (left=0, right=n-1) to weave nodes by re-wiring `next` pointers. O(n) time and O(n) space. The space cost is unnecessary because the structure we need can be obtained in-place with pointer manipulation.

## Key insight

The reordering interleaves the first half of the list with the reversed second half. If we split the list at the midpoint, reverse the second half, and then merge the two halves by alternating nodes, we get exactly the desired order — all in O(1) extra space.

## Optimal approach

**Pattern: Find midpoint (slow/fast) + reverse second half + merge two halves**

**Step 1 — Find the midpoint:**
- Use slow/fast pointers. When fast reaches the end, slow is at the midpoint.
- Sever the list at the midpoint: `slow.next = null`.

**Step 2 — Reverse the second half:**
- Standard iterative reversal with `prev = null`, `curr = secondHalfHead`.
- After reversal, `prev` is the new head of the reversed second half.

**Step 3 — Merge the two halves by alternating:**
- `first` points into the original first half, `second` into the reversed second half.
- Each iteration: save `first.next` and `second.next`, then wire `first.next = second` and `second.next = savedFirstNext`, advance both pointers.
- Continue until `second == null`.

**Invariant:** After each merge iteration, one pair (Lk, Ln-k) has been correctly linked. The remaining first-half and second-half segments are still in their correct relative orders.

## Why this works

Reversing the second half converts Lm → Lm+1 → … → Ln into Ln → Ln-1 → … → Lm. Interleaving first and reversed-second nodes then produces L0 → Ln → L1 → Ln-1 → … exactly. The midpoint split ensures the two halves have at most a 1-node difference in length, so the merge terminates correctly.

## Complexity
- Time: O(n) because each of the three phases (find mid, reverse, merge) visits each node at most once
- Space: O(1) because all operations are in-place pointer rewiring with a fixed number of temporary variables
