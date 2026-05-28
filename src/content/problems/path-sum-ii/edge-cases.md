## Cases to mention to the interviewer

- **Empty input / null root:** The base case `if (node == null) return` handles this immediately. Results list stays empty.
- **Single node equal to targetSum:** The root is also a leaf. path=[root.val], remaining=0, isLeaf=true → snapshot added. Returns [[root.val]].
- **Single node not equal to targetSum:** remaining ≠ 0 at the leaf, nothing added. Returns [].
- **Negative node values:** We cannot prune when remaining becomes negative because a future negative node could bring remaining back to zero. We always recurse into both children regardless of remaining's sign.
- **targetSum = 0 with a single-node tree of value 0:** remaining starts at 0, we subtract 0, remaining is still 0 at a leaf. Correctly adds the path [0].
- **Multiple valid paths:** The algorithm collects all of them — each leaf that satisfies the condition is independently snapshotted. The order of results matches a pre-order left-first DFS traversal of the leaves.
- **Integer overflow risk:** Node values are int, and the accumulated sum could overflow if there are many large-value nodes. Using `long remaining` or checking for overflow before subtraction would be safer in production. Mention this to the interviewer and ask about constraints.
