## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public boolean isValid(String s) {
        // ArrayDeque as stack — faster than java.util.Stack (no synchronisation)
        var stack = new java.util.ArrayDeque<Character>();

        for (char c : s.toCharArray()) {
            // opening brackets go onto the stack
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                // closing bracket — stack must have a matching opener on top
                if (stack.isEmpty()) return false;

                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }

        // valid only if all openers were matched and consumed
        return stack.isEmpty();
    }
}
```

## Line-by-line notes
- **`ArrayDeque` not `Stack`:** `java.util.Stack` is a legacy class backed by `Vector` with synchronisation overhead. `ArrayDeque` is the modern, faster replacement for stack semantics; use `push` / `pop` / `peek`.
- **`stack.isEmpty()` check before `pop()`:** If we see a closing bracket with an empty stack, there is no opener to match — return false immediately.
- **Three separate `if` checks for each closing bracket:** Explicit and readable; an alternative is a `Map.of(')', '(', '}', '{', ']', '[')` lookup, which is more concise for many bracket types.
- **`return stack.isEmpty()`:** A non-empty stack means some openers were never closed — the string is invalid.

## Common bugs to avoid
- Returning `true` at the end without checking `stack.isEmpty()` — misses strings like `"((("` that are all openers with no closers.
- Popping without first checking `isEmpty()` — throws `NoSuchElementException` on strings like `")("`.
- Using `Stack` from `java.util` — works but is a red flag in modern Java interviews; always use `ArrayDeque`.
