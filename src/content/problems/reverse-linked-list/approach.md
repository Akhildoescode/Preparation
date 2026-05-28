## Understanding the problem
Reverse a singly linked list in-place. Given the head of the list, return the new head. The reversal should not allocate additional node objects — only pointer reassignments are allowed.

## Brute force
Collect all node values into an array. Then overwrite each node's value in reverse. O(n) time but O(n) space. Alternatively, push all nodes onto a stack and relink. Also O(n) space.

## Key insight
Reverse the `next` pointer of each node one at a time using three pointers: `prev`, `curr`, and `next`. At each step, save `curr.next`, point `curr.next` to `prev`, then advance both pointers. When `curr` becomes null, `prev` is the new head.

## Optimal approach — Iterative
- `prev = null` (the reversed list's last node points to null).
- `curr = head`.
- While `curr != null`:
  1. `next = curr.next` (save before overwriting).
  2. `curr.next = prev` (reverse the pointer).
  3. `prev = curr` (advance prev).
  4. `curr = next` (advance curr).
- Return `prev` (new head).

Trace `1 → 2 → 3 → null`:
- Step 1: next=2, 1→null, prev=1, curr=2
- Step 2: next=3, 2→1, prev=2, curr=3
- Step 3: next=null, 3→2, prev=3, curr=null
- Loop ends. Return prev=3. Result: 3→2→1→null. ✓

**Recursive alternative:** `reverse(node.next)` returns the new tail's previous pointer. Then `node.next.next = node; node.next = null`. Elegant but O(n) stack space.

## Why this works
The three-pointer technique maintains the invariant that all nodes before `curr` have already been reversed. After each step, `prev` points to the last correctly reversed node. When `curr` is null, all nodes are reversed and `prev` is the new head.

## Complexity
- Time: O(n) — one pass through all nodes.
- Space: O(1) — three pointer variables, no extra data structures.
