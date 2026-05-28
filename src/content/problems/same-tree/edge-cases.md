## Cases to mention to the interviewer

- **Empty input / null root:** Both p and q are null — return true. One is null, the other is not — return false. Both cases are handled by the first two guards.
- **Single node, same value:** Both trees are just a root with no children. Both children recurse to (null, null) which returns true. Returns true overall.
- **Single node, different value:** Root values differ, so we return false immediately at the value comparison, never touching children.
- **Structurally identical trees, one value differs deep in the tree:** The algorithm recurses all the way to the differing node, returns false there, and propagates false back up via short-circuit &&. It correctly returns false.
- **Mirror/symmetric trees:** [1, 2, 3] vs [1, 3, 2] — same values, different structure. At the root's children, isSameTree(2, 3) finds 2 != 3 and returns false. Correctly returns false because isSameTree is about identical structure, not symmetry.
- **Integer overflow risk:** Node values are compared with `!=` on primitives, so no overflow concern. If values were `Integer` objects, you would need `.equals()` instead of `==`.
