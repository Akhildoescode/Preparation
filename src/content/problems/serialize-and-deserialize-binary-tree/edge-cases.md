## Cases to mention to the interviewer

- **Null root:** Serialize returns `"null,"`. Deserialize: first token is "null" → return null. ✓
- **Single node:** `[5]` → `"5,null,null,"`. Deserialize: create node(5), build left (null), build right (null). ✓
- **Skewed tree (all right children):** `[1,null,2,null,3]`. Serialize produces `"1,null,2,null,3,null,null,"`. Deserialize correctly builds the same structure.
- **Negative values:** `[-1,-2,-3]`. Integer.parseInt handles negatives correctly. The serialization uses `node.val` which prints negative ints with a minus sign.
- **Values with multiple digits:** `[100, -50, 200]`. `node.val + ","` correctly stringifies multi-digit and negative ints. `Integer.parseInt` correctly parses them on deserialization.
- **Complete binary tree vs. skewed tree:** The preorder format handles both correctly. A complete tree with n nodes produces a string with ~n "null" markers; a skewed tree produces ~n "null" markers as well (null left children all the way down, then one long chain of right children, each with two null markers).
- **Token delimiter collisions:** If a value could itself be "null" as a string, the encoding would be ambiguous. Since node values are integers, this can never happen.
