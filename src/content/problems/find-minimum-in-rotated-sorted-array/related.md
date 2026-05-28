## Same pattern, different problem
- **Search in Rotated Sorted Array:** After finding which half is sorted (same mid-vs-hi comparison), check if the target falls within the sorted half to decide where to search.
- **Binary Search:** The template is identical; the difference is what we're searching for and how we decide which half to discard.
- **Find Peak Element:** A similar "compare mid to neighbor" trick lets you binary search for a local maximum in an unsorted array.
- **Search a 2D Matrix:** Treats a 2D structure as a 1D sorted space; same lo/hi/mid mechanics.

## When this pattern applies
Any time an array was built by rotating or modifying a sorted sequence, binary search with a "which half is still ordered" check applies. The signal is O(log n) constraint on a partially sorted input. More generally, compare `nums[mid]` to a *boundary* element (lo or hi) rather than to the target itself, using the comparison to deduce structural properties about which half to discard.
