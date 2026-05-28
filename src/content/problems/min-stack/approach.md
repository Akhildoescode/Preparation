## Understanding the problem

Design a stack that supports four operations — `push(val)`, `pop()`, `top()`, and `getMin()` — all in O(1) time. The tricky operation is `getMin()`: after any sequence of pushes and pops, it must return the current minimum of all values still on the stack, in constant time.

## Brute force

Store all values in a single stack. For `getMin()`, scan every element and return the smallest. This is O(n) for `getMin()` and O(1) for everything else. The O(n) minimum query violates the problem constraint.

## Key insight

When we push a value, we know the new minimum: it is the smaller of the pushed value and the previous minimum. When we pop a value, the minimum may change — it reverts to what it was before the popped element was pushed. If we record the running minimum at every push (in a parallel min-tracking stack), we can restore the previous minimum in O(1) on every pop.

## Optimal approach

**Pattern: Auxiliary min-tracking stack**

Maintain two `ArrayDeque<Integer>` stacks:
- `mainStack`: holds all pushed values in LIFO order.
- `minStack`: at each level, holds the minimum of all values currently in the stack at that stack depth.

**`push(val)`:**
1. Push `val` onto `mainStack`.
2. Compute `newMin = Math.min(val, minStack.isEmpty() ? val : minStack.peek())`.
3. Push `newMin` onto `minStack`.

**`pop()`:**
1. Pop from both `mainStack` and `minStack` simultaneously.

**`top()`:**
1. Return `mainStack.peek()`.

**`getMin()`:**
1. Return `minStack.peek()`.

**Invariant:** `minStack.peek()` always equals the minimum of all values currently in `mainStack`. The two stacks always have the same size.

## Why this works

At every stack depth d, `minStack[d]` records the minimum of all elements from the bottom of the stack up to depth d. When we pop, depth decreases by one and `minStack.peek()` correctly reflects the minimum of the remaining elements — no scanning needed.

## Complexity
- Time: O(1) for all four operations because each is a constant number of `ArrayDeque` peek/push/pop calls
- Space: O(n) because both stacks together hold at most 2n elements for n pushed values
