## Cases to mention to the interviewer

- **Single node:** `[5]`. `validate(5, Long.MIN_VALUE, Long.MAX_VALUE)`: 5 is in range → true. ✓
- **Root with value Integer.MIN_VALUE:** `validate(MIN_VALUE, Long.MIN_VALUE, Long.MAX_VALUE)`. Check: MIN_VALUE ≤ Long.MIN_VALUE? No (int MIN_VALUE > Long.MIN_VALUE as a long). MIN_VALUE ≥ Long.MAX_VALUE? No. → valid. Using `int` bounds would cause `MIN_VALUE <= Integer.MIN_VALUE` to be true (equal), returning false — wrong!
- **Root with value Integer.MAX_VALUE:** Same reasoning with the right bound. `long` bounds handle this correctly.
- **All duplicate values:** `[5, 5, 5]`. The left child 5 fails `5 < 5 (node.val)` — correctly returns false.
- **Subtree violating ancestor constraint:** `[10, 5, 15, null, null, 6, 20]`. Node 6 is in the right subtree of 10, so it must be > 10. But 6 < 10 → invalid. `validate(6, 10, 15)`: 6 ≤ 10 → false. ✓ This catches the constraint from the grandparent, not just the parent.
- **Already sorted in-order traversal:** `[2, 1, 3]`. Valid BST. Trace: validate(2): left=validate(1,-∞,2)=true, right=validate(3,2,+∞)=true → true.
- **Empty tree (null):** If root is null, `validate(null,...)` returns true immediately. An empty tree is a valid BST.
