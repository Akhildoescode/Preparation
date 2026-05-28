## Reference solution

**Complexity:** O(n) time, O(1) space.

```java
class Solution {
    public int leastInterval(char[] tasks, int n) {
        // Count frequency of each task (only 26 possible)
        var freq = new int[26];
        for (var task : tasks) {
            freq[task - 'A']++;
        }

        // Find the maximum frequency
        var maxCount = 0;
        for (var f : freq) {
            maxCount = Math.max(maxCount, f);
        }

        // Count how many tasks share the maximum frequency
        var numMaxCount = 0;
        for (var f : freq) {
            if (f == maxCount) numMaxCount++;
        }

        // The frame structure gives minimum length; actual tasks may fill all slots
        var minFrameLength = (maxCount - 1) * (n + 1) + numMaxCount;
        return Math.max(tasks.length, minFrameLength);
    }
}
```

## Line-by-line notes
- **freq array:** Fixed size 26 — this is the O(1) space claim. We never need a HashMap here.
- **maxCount loop:** Simple linear scan; could also use `Arrays.stream(freq).max().getAsInt()` but explicit loop is clearer in an interview.
- **numMaxCount loop:** Counts ties at the max — e.g., A=3, B=3, C=3 all anchor the frames.
- **minFrameLength formula:** `(maxCount - 1)` full frames of width `(n + 1)`, then a tail of `numMaxCount` tasks that all need one more slot.
- **Math.max:** When tasks are dense enough to fill all frames with no idle, `tasks.length` wins. This handles n=0 naturally.

## Common bugs to avoid
- Forgetting the `Math.max` — if n is small and there are many distinct tasks, the answer is just `tasks.length` with no idle slots needed.
- Using `n` instead of `n + 1` for frame width — the frame includes the task itself plus `n` cooldown slots.
- Off-by-one on `maxCount - 1`: there are `maxCount - 1` gaps between the `maxCount` occurrences of the most frequent task, not `maxCount` gaps.
- Trying to sort or use a heap — the formula makes both unnecessary.
