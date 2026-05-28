## Same pattern, different problem
- **Construct Binary Tree from Preorder and Inorder Traversal (#105):** Also reconstructs a binary tree from traversal information — but requires two traversals (preorder + inorder) and no null markers. This problem is simpler because null markers make the encoding unambiguous on their own.
- **Encode N-ary Tree to Binary Tree (#431):** Serialization of a more complex structure — uses a clever encoding of N-ary parent-child relationships as a binary tree. Same "represent structure as a string" mindset.
- **Design HashMap (#706):** Encoding and decoding of data structures — different context but same principle of needing a reversible, complete representation.
- **Serialize and Deserialize BST (#449):** The BST variant can use a more compact encoding — no null markers needed because BST ordering uniquely determines left/right boundaries. Smaller output size.

## When this pattern applies
Use **preorder DFS with explicit null markers** whenever you need to uniquely encode a binary tree as a linear sequence. The key insight: preorder + null markers is a *complete* representation of the tree structure (unlike preorder alone, which is ambiguous without knowing which nodes are leaves). Deserialization works by mirroring the serialization — consuming tokens in exactly the same preorder order, letting the recursion structure naturally reconstruct the tree.
