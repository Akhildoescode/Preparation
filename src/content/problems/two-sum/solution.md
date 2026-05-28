## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map each value to its index for O(1) complement lookup
        var seen = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // If complement was seen earlier, we have our pair
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }

            // Record current number AFTER the check — prevents using same index twice
            seen.put(nums[i], i);
        }

        // Problem guarantees exactly one solution, but Java needs a return
        throw new IllegalArgumentException("No solution exists");
    }
}
```

## Line-by-line notes
- **`var seen = new HashMap<Integer, Integer>()`:** `var` avoids repeating the type. Using `Integer` (boxed) is fine here since map keys/values must be objects; autoboxing overhead is negligible at interview scale.
- **`int complement = target - nums[i]`:** Derive the required partner rather than checking all other elements — this is the crux of the O(n) improvement.
- **Check *before* insert:** We check `seen.containsKey(complement)` first, then `seen.put(nums[i], i)`. This is deliberate: if `nums[i] == complement` (i.e., the number is half the target), we'd only match it with a *previous* occurrence, not with itself. Correct behavior, zero extra logic.
- **Return order:** `seen.get(complement)` is the earlier index; `i` is the current. Problem doesn't require sorted output but this naturally returns indices in ascending order.

## Common bugs to avoid
- **Inserting before checking:** If you `put` first and then `containsKey`, a number will match itself when `target == 2 * nums[i]` — returning `[i, i]`, which is wrong.
- **Using `nums[complement]` instead of `seen.get(complement)`:** The complement is a *value*, not an index. You need the map to get back the index.
- **Not handling the "throw" branch:** In a real interview the constraints guarantee a solution, but an unhandled return path will cause a compile error in Java. Add the throw or return a dummy.
