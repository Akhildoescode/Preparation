## Reference solution

**Complexity:** O(n) time, O(n) space.

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        var result = new int[n];   // default 0 = "no warmer future day"

        // monotonic decreasing stack stores indices (not temperatures)
        var stack = new java.util.ArrayDeque<Integer>();

        for (int i = 0; i < n; i++) {
            // pop every unresolved day that is colder than today
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int j = stack.pop();
                result[j] = i - j;  // days waited = current index - unresolved index
            }
            // today is now the newest unresolved candidate
            stack.push(i);
        }

        // indices still in stack have no warmer day; result stays 0 (already initialised)
        return result;
    }
}
```

## Line-by-line notes
- **Store indices, not values:** We need to compute `i - j` for the answer, so the stack must hold indices. We can always recover the temperature via `temperatures[stack.peek()]`.
- **`temperatures[i] > temperatures[stack.peek()]`:** Strict greater-than — equal temperatures do not count as "warmer", so we don't pop on a tie.
- **`var result = new int[n]`:** Java initialises int arrays to 0, so indices never popped automatically have the correct answer without extra code.
- **`stack.push(i)` after the while loop:** Every index, whether or not it popped others, becomes a new candidate that future days may resolve.

## Common bugs to avoid
- Using `>=` instead of `>` in the comparison — equal temperatures are not warmer, so using `>=` incorrectly resolves tied-temperature days.
- Storing temperatures in the stack instead of indices — you lose the ability to compute `i - j` and cannot identify which result slot to update.
- Forgetting to push `i` after the while loop — the current day is never added as a candidate, so it is never resolved by future warmer days.
