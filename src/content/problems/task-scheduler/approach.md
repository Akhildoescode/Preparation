## Understanding the problem

You have a list of tasks (each identified by a letter A-Z) and a cooldown integer `n`. A CPU must execute one task per time unit, and the same task must be at least `n` intervals apart. You can insert idle slots to respect the cooldown. Return the minimum total time to finish all tasks.

## Brute force

Simulate the process: at each time unit, pick the highest-frequency task that is not on cooldown. Use a max-heap of (frequency, task) pairs and a cooldown queue. This works but requires careful bookkeeping and runs in O(total\_time) which can be large.

## Key insight

The most frequent task is the bottleneck. If `maxCount` is the highest frequency, those tasks alone force at least `(maxCount - 1) * (n + 1)` slots to fit all the cooldown gaps. The remaining tasks fill those gaps. The answer is simply `max(tasks.length, (maxCount - 1) * (n + 1) + numMaxCount)` where `numMaxCount` is how many tasks share the maximum frequency.

## Optimal approach

Pattern: **heap + greedy** (but the mathematical formula collapses it to O(n)).

1. Count frequency of each task using an array of size 26.
2. Find `maxCount` = the highest frequency.
3. Count `numMaxCount` = how many tasks have that frequency.
4. Return `max(tasks.length, (maxCount - 1) * (n + 1) + numMaxCount)`.

The formula represents the "frame" structure: `(maxCount - 1)` full frames of size `(n + 1)`, plus a final partial frame containing all tasks tied for max frequency.

## Why this works

Each full frame holds `n + 1` slots. The most frequent tasks anchor each frame — one per frame. All other tasks slot into the gaps. If there are enough tasks to fill every gap, we never need idle slots and the answer is just `tasks.length`. If tasks are sparse, the frame structure dictates the minimum length.

## Complexity
- Time: O(n) because we iterate over the tasks array once to count frequencies, then do O(26) work to find the max — effectively O(n).
- Space: O(1) because the frequency array is always size 26 regardless of input size.
