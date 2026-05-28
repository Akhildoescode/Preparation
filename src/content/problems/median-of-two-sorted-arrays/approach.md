## Understanding the problem
Given two sorted arrays `nums1` and `nums2`, find the median of the merged sorted array in O(log(m + n)) time. The combined array's median depends on which elements sit at positions `(m+n)/2` and `(m+n-1)/2` — we don't need to merge, just locate them.

## Brute force
Merge the two sorted arrays (like merge-sort's merge step) and return the middle element(s). O(m + n) time and space. The constraint demands O(log(m + n)).

## Key insight
The median partitions the combined array into two halves: a left half (all elements ≤ median) and a right half (all elements ≥ median). We need to find a partition point `i` in `nums1` and a corresponding partition point `j` in `nums2` such that:
- Left half has exactly `(m + n + 1) / 2` elements (works for both even and odd total lengths).
- The max of the left halves ≤ the min of the right halves.

We binary search on the partition index `i` in the shorter array.

## Optimal approach
Without loss of generality, let `nums1` be the shorter array (swap if needed).
1. Binary search `i` from `0` to `m` (inclusive). `j = half - i` where `half = (m + n + 1) / 2`.
2. Define: `maxLeft1 = i > 0 ? nums1[i-1] : Integer.MIN_VALUE`; `minRight1 = i < m ? nums1[i] : Integer.MAX_VALUE`; similarly for nums2.
3. If `maxLeft1 > minRight2`: `i` is too large → `hi = i - 1`.
4. If `maxLeft2 > minRight1`: `i` is too small → `lo = i + 1`.
5. Otherwise, found the right partition:
   - If odd total: `return Math.max(maxLeft1, maxLeft2)`.
   - If even total: `return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0`.

## Why this works
We want the partition where every left element ≤ every right element. Because both arrays are sorted, `maxLeft1 ≤ minRight1` and `maxLeft2 ≤ minRight2` always hold. We only need to check the cross conditions: `maxLeft1 ≤ minRight2` and `maxLeft2 ≤ minRight1`. Binary searching `i` while maintaining `j = half - i` keeps the left half size fixed.

## Complexity
- Time: O(log(min(m, n))) — we binary search only over the shorter array
- Space: O(1)
