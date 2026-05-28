## Reference solution

**Complexity:** O(n) time and space for both serialize and deserialize.

```java
public class Codec {
    private static final String NULL_MARKER = "null";
    private static final String DELIMITER = ",";

    // Encodes a tree to a single string using preorder traversal
    public String serialize(TreeNode root) {
        var sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }

    private void serializeHelper(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append(NULL_MARKER).append(DELIMITER);
            return;
        }
        sb.append(node.val).append(DELIMITER);
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }

    // Decodes your encoded data to tree
    public TreeNode deserialize(String data) {
        // Use ArrayDeque as a token queue for O(1) poll
        var tokens = new ArrayDeque<>(Arrays.asList(data.split(DELIMITER)));
        return buildTree(tokens);
    }

    private TreeNode buildTree(Deque<String> tokens) {
        String token = tokens.poll();
        if (NULL_MARKER.equals(token)) return null;

        var node = new TreeNode(Integer.parseInt(token));
        node.left = buildTree(tokens);   // consume left subtree tokens
        node.right = buildTree(tokens);  // consume right subtree tokens
        return node;
    }
}
```

## Line-by-line notes
- **`StringBuilder` for serialization:** Avoids O(n²) string concatenation that would occur with `+` in a loop. Each `append` is amortized O(1).
- **`NULL_MARKER` before children:** Serializing null children explicitly is what allows unambiguous deserialization — without them, we couldn't distinguish a leaf from a node with children.
- **`ArrayDeque` over `split` with index:** `tokens.poll()` is O(1) and cleaner than maintaining a separate index. `Arrays.asList` + `ArrayDeque` wraps the split result without extra copying.
- **`NULL_MARKER.equals(token)` not `token.equals(NULL_MARKER)`:** Using the constant as the receiver avoids NPE if `token` is somehow null. Safe defensive style.
- **Recursive `buildTree`:** Mirrors the serialization. Left child tokens always come before right child tokens in preorder — consuming from the front of the deque respects this ordering automatically.

## Common bugs to avoid
- **Using `data.split(",")` trailing behavior:** If the serialized string ends with `","`, `split` may or may not produce a trailing empty string depending on Java version. Trim the last delimiter or use the `ArrayDeque` approach which handles this gracefully.
- **Not marking null children:** Without null markers, `"1,2,3"` is ambiguous — is it a root with two children, or a skewed tree? Explicit nulls make the encoding unambiguous.
- **Off-by-one in token consumption:** The recursive structure naturally handles token ordering in preorder. Don't try to count tokens — let the recursion consume exactly what it needs.
