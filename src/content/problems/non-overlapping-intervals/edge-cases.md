## Cases to mention to the interviewer

- **No overlaps:** All intervals are already non-overlapping. Count = 0. Every interval's start ≥ prevEnd.
- **All overlap with each other:** e.g., [[1,5],[2,6],[3,7]]. Sort by end: [[1,5],[2,6],[3,7]]. Keep [1,5] (prevEnd=5). Remove [2,6] (start=2 < 5, count=1). Remove [3,7] (start=3 < 5, count=2). Return 2 (keep only 1).
- **Single interval:** n=1, never overlaps with anything. Count = 0.
- **Two non-overlapping:** [[1,2],[3,4]]. Keep both. Count=0.
- **Two overlapping:** [[1,3],[2,4]]. Sort by end: [[1,3],[2,4]]. Keep [1,3], remove [2,4]. Count=1.
- **Touching endpoints:** [[1,3],[3,5]]. start=3, prevEnd=3. 3 < 3 is false — not overlapping. Keep both. Count=0. Correct per problem definition.
