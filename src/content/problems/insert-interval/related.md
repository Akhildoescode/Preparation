## Same pattern, different problem
- **Merge Intervals (LC #56):** The general merge problem — sort first, then merge. Insert Interval skips the sort since input is already sorted.
- **Non-overlapping Intervals (LC #435):** Remove minimum intervals to eliminate all overlaps — greedy sort by end time.
- **Meeting Rooms II (LC #253):** Track how many intervals are active simultaneously — different use of sorted intervals.
- **Range Module (LC #715):** Dynamically add/remove ranges — extends Insert Interval to a persistent data structure.

## When this pattern applies
The three-zone sweep applies when you insert one interval into an already-sorted non-overlapping list. The pattern: (1) copy intervals before the new one, (2) merge intervals overlapping the new one by expanding it, (3) copy intervals after. This is a special case of Merge Intervals that avoids re-sorting. More generally, whenever you must handle an insertion into a sorted structure that may cause overlapping merges, the three-zone approach cleanly separates the problem into non-overlapping prefix, overlapping middle, and non-overlapping suffix.
