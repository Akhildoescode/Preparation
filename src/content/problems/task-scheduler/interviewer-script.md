## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Can the task array be empty, and if so should I return 0?
- Is n always non-negative? So n=0 means no cooldown?
- Tasks are identified by uppercase letters A-Z, so at most 26 distinct tasks — is that right?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to simulate the CPU cycle by cycle. At each step I pick the highest-frequency available task using a max-heap, and I track cooldowns with a queue. That gives us O(total time) which is at worst O(tasks.length * n) — so O(n^2) in the worst case. We can do better with a mathematical observation."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that the most frequent task is the bottleneck. If some task appears `maxCount` times, I need at least `(maxCount - 1)` full cooldown frames plus a final chunk. Each frame has size `n + 1` — one slot for the frequent task and `n` slots for others or idle. The minimum time is `max(tasks.length, (maxCount - 1) * (n + 1) + numMaxCount)` where `numMaxCount` is how many tasks tie for the max frequency.

Let me trace through: tasks = [A, A, A, B, B, B], n = 2.
- Frequencies: A=3, B=3. maxCount=3, numMaxCount=2.
- Formula: max(6, (3-1)*(2+1) + 2) = max(6, 6+2) = max(6, 8) = 8.
- Schedule: A B _ A B _ A B — that's 8 units. Correct.

Now tasks = [A, A, A, B, B, B, C, C, C, D, D, E], n = 2.
- maxCount=3, numMaxCount=3 (A, B, C all appear 3 times).
- Formula: max(12, (3-1)*(3) + 3) = max(12, 9) = 12. No idle needed."

### 4. State complexity before coding
"This will be O(n) time to count frequencies and O(1) space since the frequency array is fixed at 26 entries. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with [A,A,A,B,B,B], n=2: freq[A]=3, freq[B]=3, maxCount=3, numMaxCount=2, result = max(6, 8) = 8. Correct. Edge case n=0: tasks=[A,A,A], result = max(3, (3-1)*1 + 1) = max(3, 3) = 3 — no cooldown, just run all tasks back to back. Looks correct."
