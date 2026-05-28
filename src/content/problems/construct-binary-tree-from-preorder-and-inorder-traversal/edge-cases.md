## Cases to mention to the interviewer

- **Empty input / null root:** Both arrays are empty (length 0). The initial call is build(0, 0, 0), which hits size==0 and returns null. Correct.
- **Single node:** preorder=[1], inorder=[1]. build(0,0,1): root=1, mid=0, leftSize=0. Both children recurse with size=0 and return null. Returns a lone leaf. Correct.
- **All nodes in a left-skewed tree:** preorder=[1,2,3], inorder=[3,2,1]. At each level, mid=last position, leftSize=size-1, right subtree is empty. Recursion chains down the left side correctly.
- **All nodes in a right-skewed tree:** preorder=[1,2,3], inorder=[1,2,3]. At each level, mid=inStart, leftSize=0, left subtree is null, right subtree gets all remaining elements.
- **Duplicate values are not allowed:** The problem guarantees unique values. If duplicates existed, the HashMap would overwrite entries and the result would be undefined. Mentioning this constraint shows you understand why the algorithm works.
- **Large input causing deep recursion:** For n=100,000 skewed tree, recursion depth reaches 100,000. Mention that an iterative version using an explicit stack avoids potential stack overflow, though the recursive version passes LeetCode's limits in practice.
