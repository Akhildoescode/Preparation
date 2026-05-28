## Cases to mention to the interviewer

- **Single element array:** `nums = [99]` — XOR of one element with 0 is 99. Return 99.
- **Negative numbers:** `nums = [-1, -1, -2]` — XOR works on two's complement bit representation. Return -2.
- **Single element is 0:** `nums = [1, 1, 0]` — 1^1=0, 0^0=0. Return 0. Result starts at 0, then 0^0=0 at the end — correct.
- **Large array:** Linear scan, O(n) — no performance concerns.
- **Single element at the beginning, middle, or end:** XOR is commutative — position doesn't matter.
