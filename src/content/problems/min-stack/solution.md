## Reference solution

**Complexity:** O(1) all operations, O(n) space.

```java
class MinStack {

    // main storage — LIFO order of pushed values
    private final java.util.ArrayDeque<Integer> mainStack = new java.util.ArrayDeque<>();

    // parallel stack: minStack.peek() always equals the current minimum
    private final java.util.ArrayDeque<Integer> minStack  = new java.util.ArrayDeque<>();

    public void push(int val) {
        mainStack.push(val);
        // new minimum is the smaller of val and the previous minimum
        int newMin = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(newMin);
    }

    public void pop() {
        mainStack.pop();  // remove top value
        minStack.pop();   // restore previous minimum
    }

    public int top() {
        return mainStack.peek();  // current top value
    }

    public int getMin() {
        return minStack.peek();   // current minimum — O(1)
    }
}
```

## Line-by-line notes
- **Two `ArrayDeque` fields:** Using `final` fields ensures they are never reassigned; the constructor body can be empty (Java default constructor suffices).
- **`minStack.isEmpty() ? val : Math.min(val, minStack.peek())`:** Handles the first push — no previous minimum exists, so `val` is the minimum by definition.
- **`minStack.pop()` mirrors `mainStack.pop()`:** The two stacks must always have the same size. Popping from both simultaneously preserves the invariant that `minStack.peek()` reflects the minimum of the current `mainStack` contents.
- **No null checks needed:** The problem guarantees `pop()`, `top()`, and `getMin()` are called on a non-empty stack.

## Common bugs to avoid
- Only pushing to `minStack` when the new value is ≤ the current minimum — this makes `minStack` smaller than `mainStack`, causing `minStack.pop()` to desynchronise and corrupt the minimum after future pops.
- Using `Integer` instead of `int` in comparisons — auto-unboxing is safe here since values are never null, but be aware of the boxing cost; using `int` primitives where possible (via `ArrayDeque<Integer>` with auto-unboxing) is fine.
- Forgetting the `minStack.isEmpty()` check on the first push — `minStack.peek()` on an empty deque throws `NoSuchElementException`.
