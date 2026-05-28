## Same pattern, different problem

- **Valid Palindrome II (LeetCode 680):** Same two-pointer inward scan, but you are allowed one deletion. When a mismatch is found, try skipping the left character or the right character and check if either remaining range is a palindrome — the same helper is called recursively with tightened bounds.
- **Container With Most Water (LeetCode 11):** The identical "two pointers start at both ends, move inward" skeleton, but the movement rule is driven by which side is the binding constraint rather than character equality.
- **3Sum (LeetCode 15):** After sorting, an outer loop fixes one element and an inner two-pointer pair scans from both ends of the remaining subarray — the same inward convergence, applied to sum matching instead of character matching.
- **Longest Repeating Character Replacement (LeetCode 424):** Uses two pointers moving in the same direction (sliding window) rather than inward — shows the contrast between the two main two-pointer configurations.

## When this pattern applies

Use **inward two pointers** when the correctness of a pair (left element, right element) can be checked independently of all inner pairs, and after confirming or rejecting a pair you can safely discard both endpoints and move inward. The strongest signal is symmetry: palindromes, balanced brackets, or problems where the answer depends on matching elements equidistant from a center. If the two pointers need to move in the same direction (one always chases the other), use a sliding window instead.
