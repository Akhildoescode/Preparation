## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        // XOR all elements: paired elements cancel (a^a=0), single remains (a^0=a)
        for (int n : nums) {
            result ^= n;
        }
        return result;
    }
}
```

## Line-by-line notes
- **`result = 0` as initial value:** XOR identity — `0 ^ x = x`. Starting with 0 correctly handles the first element.
- **`result ^= n`:** Each XOR with a paired element will eventually cancel: once when the element is first seen (0 ^ a = a), once when seen again (a ^ a = 0). The single element is XORed once total, leaving it in `result`.
- **Why order doesn't matter:** XOR is commutative and associative. No matter how the duplicates are interleaved with the single element, they all cancel out.

## Common bugs to avoid
- **Initializing `result = nums[0]` and starting the loop at i=1:** This works but is unnecessary — starting with 0 and including all elements is simpler and equally correct.
- **Using `|` (OR) instead of `^` (XOR):** OR sets bits but never clears them, so paired elements don't cancel.
- **Thinking the array must be sorted:** XOR works regardless of element order — no sorting needed.
