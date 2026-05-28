## Same pattern, different problem
- **Minimum Window Substring (#76):** The more general sliding window — maintain a window that satisfies a constraint (all required characters present), and shrink/expand based on whether the constraint is met. The two-pointer structure is identical.
- **Longest Repeating Character Replacement (#424):** Sliding window where the constraint is "at most k non-dominant characters." Instead of a uniqueness invariant, you track frequency counts and a max-frequency variable.
- **Subarray Sum Equals K (#560):** Sliding window's cousin — uses prefix sums and a map instead of two pointers, but the same "O(n) with constant-time lookup" philosophy.
- **Fruit Into Baskets (#904):** Sliding window with a constraint of at most 2 distinct character types — directly maps to "at most k distinct" variant of this problem.

## When this pattern applies
Use a **sliding window with a HashMap** (or array) when you need the longest/shortest subarray or substring satisfying some constraint on its character frequency, and the constraint is monotone — i.e., adding more elements can only violate it, never fix it (or vice versa). The signals: "longest subarray/substring without X" or "with at most K distinct Y." Two pointers work because both pointers only move forward, keeping the total work linear.
