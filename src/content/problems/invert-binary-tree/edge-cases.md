## Cases to mention to the interviewer

- **Empty input / null root:** Return null immediately. The base case handles this with no side effects.
- **Single node:** Root has no children; swapping null and null leaves the tree unchanged, which is the correct mirror of itself.
- **Tree with only left children (left-skewed):** After inversion, every node should have only a right child. The recursion unwinds up the left chain, and each swap moves the child to the right side.
- **Tree with only right children (right-skewed):** Symmetric to above — every right child becomes a left child after inversion.
- **Already-symmetric tree:** Swapping still happens at every node; the output tree looks the same as the input. The algorithm is correct — it just happens to produce the same structure.
- **Very deep tree causing stack overflow:** For a tree with n = 100,000 nodes arranged in a line, recursion depth reaches 100,000, which can exceed Java's default stack size. Mention the iterative BFS alternative to avoid this risk in production.
