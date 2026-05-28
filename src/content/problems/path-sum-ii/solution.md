## Reference solution

**Complexity:** O(n log n) time (O(n) visits + O(n log n) path copies for balanced tree), O(n) space.

```java
class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        var results = new ArrayList<List<Integer>>();
        var path    = new ArrayList<Integer>();   // reused across all DFS calls
        dfs(root, targetSum, path, results);
        return results;
    }

    private void dfs(TreeNode node, int remaining,
                     List<Integer> path, List<List<Integer>> results) {
        // Null node — nothing to explore in this direction
        if (node == null) return;

        // Commit: add this node to the current path and reduce remaining budget
        path.add(node.val);
        remaining -= node.val;

        // A valid path ends exactly at a leaf with zero remaining sum
        boolean isLeaf = (node.left == null && node.right == null);
        if (isLeaf && remaining == 0) {
            // Snapshot required — path will be modified after this call returns
            results.add(new ArrayList<>(path));
        }

        // Explore both subtrees even if remaining < 0 because node values can be negative
        dfs(node.left,  remaining, path, results);
        dfs(node.right, remaining, path, results);

        // Backtrack: undo the addition of this node before returning to the parent
        path.remove(path.size() - 1);
    }
}
```

## Line-by-line notes
- **Line 4 (`path` shared):** A single `ArrayList` threaded through all recursive calls avoids O(n * h) list allocations. The backtrack step on the last line makes this safe.
- **Line 15 (`remaining -= node.val`):** Subtracting as we go is cleaner than passing `targetSum - pathSum` because it never requires recomputing the running sum.
- **Line 20 (`isLeaf` check):** Without this, internal nodes with a matching partial sum would be incorrectly included. The problem explicitly defines paths as root-to-leaf.
- **Line 22 (`new ArrayList<>(path)`):** The snapshot copy is the entire reason results stay correct. Without it, every entry in `results` would point to the same mutating list and end up empty after full backtracking.
- **Line 27 (explore left and right regardless):** We do not prune when `remaining < 0` because negative node values mean the sum might recover later.

## Common bugs to avoid
- **Forgetting to copy the path:** Adding `path` directly instead of `new ArrayList<>(path)` stores a live reference; all stored paths will show the same (final empty) list.
- **Checking remaining at non-leaf nodes:** An internal node whose prefix happens to sum to targetSum is not a valid answer. Always combine `isLeaf && remaining == 0`.
- **Using `path.remove(node.val)` instead of `path.remove(path.size() - 1)`:** `remove(Object)` not `remove(int index)` — if `node.val` happens to be a valid index like 2, Java will call the index-based overload. Always use `remove(int index)` with the last index.
