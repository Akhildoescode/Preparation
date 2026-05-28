## Cases to mention to the interviewer

- **Single element, then getMin:** push(42) → getMin() returns 42. Only element is trivially the minimum.
- **Push then pop, then push again:** push(5), pop(), push(3) — minStack correctly resets. After the second push, getMin returns 3, not 5.
- **Pushing a new minimum:** push(10), push(5), push(3) — minStack = [10, 5, 3]. Each push records a new lower minimum. getMin returns 3.
- **Pushing a value larger than current min:** push(3), push(10) — minStack = [3, 3]. The minimum stays 3. After pop(), minStack = [3], getMin still 3. The larger value's presence and removal don't affect the minimum.
- **Negative values:** push(-1), push(-2) — minStack = [-1, -2]. getMin returns -2. pop() — minStack = [-1], getMin returns -1. Works correctly; no special handling needed for negatives.
- **All same values:** push(7), push(7), push(7) — minStack = [7, 7, 7]. Each pop reduces both stacks but getMin remains 7 until empty.
- **Integer overflow risk:** `Math.min(val, minStack.peek())` — both are int values. If the problem uses `Integer.MIN_VALUE`, the comparison is still valid; no overflow occurs from min comparison.
