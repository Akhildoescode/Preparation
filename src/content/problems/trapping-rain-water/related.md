## Same pattern, different problem
- **Container With Most Water (#11):** Also uses two pointers from both ends, moving the shorter bar inward. The reasoning is nearly identical — the shorter bar is the bottleneck.
- **Product of Array Except Self (#238):** Uses the same left-pass / right-pass decomposition — compute left contribution, then right contribution. The two-pointer version of trapping rain water is a space-optimized version of the same idea.
- **Largest Rectangle in Histogram (#84):** Uses a monotonic stack to find, for each bar, the left and right boundaries of the largest rectangle. Related in that both problems require knowing the nearest taller bar in each direction.
- **Maximum Water in Container (#11):** Greedily move the shorter wall — the same "move the bottleneck" reasoning applies.

## When this pattern applies
**Two-pointer from both ends** works when the answer at position i depends on information from both the left and the right, AND the bottleneck is always the smaller of the two sides. The key insight is that processing the pointer on the side with the smaller current value is "safe" — you already know enough about the other side (it's at least as tall) to compute the answer. The pointers converge to a meet in O(n) time with O(1) space, beating the prefix/suffix array approach's O(n) space.
