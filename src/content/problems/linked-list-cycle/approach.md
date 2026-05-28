## Understanding the problem

Given the head of a singly linked list, determine whether the list contains a cycle. A cycle exists when some node's `next` pointer points back to a previously visited node, creating an infinite loop. Return `true` if a cycle exists, `false` otherwise.

## Brute force

Use a HashSet to record every node reference we visit. At each step, check if the current node is already in the set. If yes, a cycle exists; if we reach `null`, no cycle. This is O(n) time but O(n) space because we store up to n node references. For very long lists, the memory cost is significant.

## Key insight

Two pointers moving at different speeds through the same loop must eventually meet. If there is a cycle, the fast pointer laps the slow pointer and they collide. If there is no cycle, the fast pointer reaches `null` first. This gives O(1) space with no extra data structures.

## Optimal approach

**Pattern: Floyd's cycle detection (tortoise and hare)**

1. Handle the null / single-node base case: if `head == null` or `head.next == null`, return `false`.
2. Initialise `slow = head` and `fast = head`.
3. Loop while `fast != null && fast.next != null`:
   - Move `slow = slow.next` (1 step).
   - Move `fast = fast.next.next` (2 steps).
   - If `slow == fast`, a cycle is confirmed — return `true`.
4. If the loop exits, `fast` hit `null` — no cycle, return `false`.

**Invariant:** At each iteration, `fast` is exactly one additional step ahead of `slow` relative to the previous iteration. In a cycle of length L, they meet within at most L iterations after `fast` enters the cycle.

## Why this works

In a cycle, the relative speed difference between fast and slow is 1 node per iteration. Modelling their positions modulo L, the gap closes by 1 each step, so they must meet within L steps. Without a cycle, the fast pointer reaches the end of the list in O(n/2) iterations, terminating the loop naturally.

## Complexity
- Time: O(n) because in the worst case fast traverses at most 2n nodes before either meeting slow or hitting null
- Space: O(1) because only two pointer variables are used regardless of list length
