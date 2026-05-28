## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    private int[] preorder;
    private int[] inorder;
    // Avoids O(n) linear scan per recursive call
    private Map<Integer, Integer> inorderIndex = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        this.preorder = preorder;
        this.inorder  = inorder;

        // Pre-build lookup: value → its position in inorder array
        for (int i = 0; i < inorder.length; i++) {
            inorderIndex.put(inorder[i], i);
        }

        return build(0, 0, preorder.length);
    }

    // Reconstruct the subtree whose preorder slice starts at preStart
    // and whose inorder slice starts at inStart with the given size
    private TreeNode build(int preStart, int inStart, int size) {
        // Empty subtree — base case
        if (size == 0) return null;

        // First element of the preorder slice is always this subtree's root
        int rootVal  = preorder[preStart];
        int mid      = inorderIndex.get(rootVal);  // root's position in inorder
        int leftSize = mid - inStart;              // nodes to the left of root in inorder = left subtree size

        var root = new TreeNode(rootVal);

        // Left subtree occupies the next leftSize entries in preorder
        root.left  = build(preStart + 1, inStart, leftSize);

        // Right subtree starts after the left subtree's preorder entries
        root.right = build(preStart + 1 + leftSize, mid + 1, size - leftSize - 1);

        return root;
    }
}
```

## Line-by-line notes
- **Line 5 (`inorderIndex`):** The HashMap is the entire optimization over O(n²). Without it, we would call `Arrays.asList` or do a for-loop scan at each recursive call.
- **Line 23 (`size == 0`):** Checking size (not array bounds) is cleaner than checking `preStart >= preorder.length` because it directly encodes "no nodes in this subtree".
- **Line 28 (`leftSize = mid - inStart`):** The distance from the start of the inorder slice to the root's position gives the exact count of left subtree nodes. This count is then used to advance `preStart` for the right subtree.
- **Line 33 (`preStart + 1 + leftSize`):** Skip past the root (the +1) and past all left subtree nodes (the +leftSize) to reach the start of right subtree entries in preorder.

## Common bugs to avoid
- **Off-by-one in right subtree's inStart:** The right inorder slice starts at `mid + 1` (the position after the root in inorder), not `mid`.
- **Forgetting to subtract 1 for the root in right subtree size:** `size - leftSize - 1` — the -1 accounts for the root itself, which belongs to neither subtree.
- **Linear scan instead of HashMap:** Forgetting the HashMap and calling `Arrays.asList(inorder).indexOf(rootVal)` degrades to O(n²) and won't pass large inputs.
