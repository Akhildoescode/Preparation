## Same pattern, different problem
- **Search in Rotated Sorted Array:** Binary search still works, but you must figure out which half is normally sorted before deciding where to recurse.
- **Find Minimum in Rotated Sorted Array:** Uses the same "compare mid to the right boundary" trick to identify which half contains the rotation point (and hence the minimum).
- **Koko Eating Bananas:** Binary search on the *answer space* (eating speed) rather than searching for a value in an array — the same template of lo/hi/mid applies to any monotone feasibility function.
- **Time Based Key-Value Store:** Binary search within a sorted list of timestamps to find the largest timestamp ≤ a query — a direct application of the "find last valid position" binary search variant.

## When this pattern applies
Reach for binary search whenever the input is sorted (or can be sorted cheaply) and you need to locate a value or a boundary. The tell-tale sign is when a linear O(n) scan is correct but obviously inefficient, and the sorted order lets you make a directional decision at each step. Also applies when you're searching over an implicit sorted space (all possible answers), not just an explicit array.
