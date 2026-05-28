## Cases to mention to the interviewer

- **Single interval:** [[1,5]] → [[1,5]]. The loop never executes; the post-loop `merged.add(current)` adds it.
- **All disjoint:** [[1,2],[3,4],[5,6]] → same. No overlaps detected; each becomes its own entry.
- **All overlapping into one:** [[1,4],[2,3],[3,6]] → [[1,6]]. Sort: [[1,4],[2,3],[3,6]]. All overlap with the running current. Final current = [1,6].
- **Touching endpoints:** [[1,3],[3,5]] → [[1,5]]. The `<=` in `next[0] <= current[1]` handles this correctly.
- **Fully contained interval:** [[1,10],[2,5],[3,7]] → [[1,10]]. All three intervals overlap; current stays [1,10] throughout.
- **Reverse sorted input:** [[5,6],[3,4],[1,2]] → After sort: [[1,2],[3,4],[5,6]] → [[1,2],[3,4],[5,6]]. Sort handles the ordering.
