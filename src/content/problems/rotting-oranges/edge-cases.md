## Cases to mention to the interviewer

- **No fresh oranges:** Grid contains only 0s and 2s. freshCount = 0 before BFS starts — return 0 immediately without running BFS.
- **No rotten oranges but fresh ones exist:** Queue is empty, BFS never runs, freshCount > 0 after — return -1. Fresh oranges can never rot.
- **Fresh orange isolated by empty cells (0s):** e.g., [[2,0,1]]. BFS from (0,0) cannot cross the empty cell. freshCount remains 1 after BFS — return -1.
- **All oranges already rotten:** freshCount = 0 at start — return 0. No minutes needed.
- **Single cell grid:** [[0]] → return 0; [[1]] → return -1; [[2]] → return 0.
- **Grid where all fresh oranges are reachable but require many steps:** Ensure the level-counting logic correctly counts minutes — a common off-by-one is incrementing minutes even on the last empty BFS level. The `freshCount > 0` guard in the while condition prevents this.
- **Multiple rotten oranges racing toward the same fresh orange:** The first one to reach it marks it rotten and enqueues it — the second rotten orange will see value 2 and skip it. The minimum-distance guarantee of BFS ensures the correct minute count.
