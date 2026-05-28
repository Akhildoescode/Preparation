## Reference solution

**Complexity:** O(n log n) time, O(n) space.

```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        // tails[i] = smallest tail element of any increasing subsequence of length i+1
        List<Integer> tails = new ArrayList<>();

        for (int num : nums) {
            // Binary search for the first element in tails that is >= num
            int lo = 0, hi = tails.size();
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (tails.get(mid) < num) lo = mid + 1;
                else hi = mid;
            }

            if (lo == tails.size()) {
                // num is larger than all tails — extend the LIS by 1
                tails.add(num);
            } else {
                // Replace the first tail >= num with num (smaller tail = more room for future)
                tails.set(lo, num);
            }
        }

        return tails.size();
    }
}
```

## Line-by-line notes
- **`tails` is always sorted:** Each `set(lo, num)` replaces an element with a smaller value (since we found the first element >= num and replaced with num, which is <= that element). Sorting invariant is preserved.
- **Binary search finds the first tail >= num:** Using `< num` to advance `lo` — this is the "lower bound" binary search pattern (find first index not less than num).
- **`lo == tails.size()`:** num is strictly larger than all current tails — we extend the list.
- **`tails.size()` at the end:** The number of "length classes" equals the LIS length.

## Common bugs to avoid
- **Using `tails.get(mid) <= num`:** This would find the first element strictly greater than num, implementing upper bound instead of lower bound — wrong for strict LIS (would allow equal elements).
- **Thinking `tails` is the LIS:** It is NOT. `tails` changes as elements are replaced. Only the length of `tails` is meaningful, not its contents.
- **Using `Arrays.binarySearch`:** Returns a negative value when the element is not found, requiring index manipulation. Manual binary search is cleaner for this "lower bound" variant.
