## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        // seen tracks every value encountered so far
        var seen = new java.util.HashSet<Integer>(nums.length * 2);

        for (int num : nums) {
            // if already present, we found our duplicate — exit immediately
            if (!seen.add(num)) {
                return true;
            }
        }

        // exhausted all elements with no collision
        return false;
    }
}
```

## Line-by-line notes
- **`new HashSet<>(nums.length * 2)`:** Pre-sizing the set to twice the array length prevents rehashing under the default 0.75 load factor, keeping all operations O(1).
- **`seen.add(num)`:** `HashSet.add` returns `false` when the element is already present. Checking the return value avoids a redundant `contains` call and cuts constant factors in half.
- **Early return inside loop:** We exit as soon as the first duplicate is found rather than finishing the full scan.

## Common bugs to avoid
- Calling `seen.contains(num)` then `seen.add(num)` separately — doubles the hash operations; use the boolean return of `add` instead.
- Forgetting that an empty array should return `false` — the enhanced for-loop handles this correctly because it simply never executes.
- Using a sorted approach (`Arrays.sort` then adjacent comparison) — that is O(n log n) time and mutates the input array, which the caller may not expect.
