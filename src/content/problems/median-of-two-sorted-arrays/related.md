## Same pattern, different problem
- **Find Minimum in Rotated Sorted Array:** Binary search to locate a structural boundary rather than an exact value.
- **Koko Eating Bananas:** Binary search on the answer space — same lo/hi/mid template applied to a different decision function.
- **Search a 2D Matrix:** Maps a 2D problem to a 1D binary search.
- **Time Based Key-Value Store:** Binary search for the rightmost entry satisfying a condition.

## When this pattern applies
This is one of the hardest binary search problems because you're not searching for a value in an array — you're searching for a *partition* that satisfies a global invariant across two arrays simultaneously. The pattern applies when you can frame the problem as "find the boundary where some property switches from false to true" and that boundary is monotone with respect to your search variable. Recognize it when you need to find a position, split, or cut-point rather than a concrete value.
