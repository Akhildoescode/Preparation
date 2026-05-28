## Cases to mention to the interviewer

- **Empty list (`head == null`):** The null guard at the top returns `false` immediately. An empty list has no cycle by definition.
- **Single node, no self-loop:** `head.next == null`. The null guard catches this — returns `false`.
- **Single node, self-loop:** `head.next == head`. The null guard does NOT catch this (head.next is not null). Fast starts at head, moves to head.next.next = head. Slow moves to head.next = head. Both equal head after one iteration → return `true`.
- **Two-node cycle:** `1 → 2 → 1`. Fast starts at 1, moves to 2.next = 1. Slow moves to 2. Next iter: slow=1, fast=1 → return `true`.
- **Cycle at tail only (tail → head):** The longest possible path before entering the cycle. Fast laps slow within L additional iterations where L is the list length.
- **Very long list, no cycle:** Fast reaches null after approximately n/2 iterations. Tests the termination condition under a long acyclic list.
- **Integer overflow risk:** Not applicable — we are not summing or multiplying values, just dereferencing pointers.
