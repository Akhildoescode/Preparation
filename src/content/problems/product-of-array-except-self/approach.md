## Understanding the problem
Return an array `output` where `output[i]` equals the product of all elements in `nums` except `nums[i]`. You cannot use division, and the solution must run in O(n) time. The follow-up asks for O(1) extra space (not counting the output array).

## Brute force
For each index i, multiply all other elements. Two nested loops, O(n²) time. With division, you could compute the total product and divide by each element, but division is explicitly forbidden and breaks on zeros anyway.

## Key insight
For position i, `output[i] = (product of all elements to the LEFT of i) × (product of all elements to the RIGHT of i)`. These two parts — left prefix products and right suffix products — can be computed in separate passes, each in O(n).

## Optimal approach — two-pass prefix/suffix
**Pass 1 (left to right):** Fill `output[i]` with the product of all elements strictly to the LEFT of i.
- `output[0] = 1` (nothing to the left).
- `output[i] = output[i-1] * nums[i-1]` for i > 0.

**Pass 2 (right to left):** Multiply `output[i]` by the product of all elements strictly to the RIGHT of i. Use a running `rightProduct` variable instead of a second array (achieving O(1) extra space).
- `rightProduct = 1` initially.
- For i from n-1 to 0: `output[i] *= rightProduct`, then `rightProduct *= nums[i]`.

Trace through `[1, 2, 3, 4]`:
- After Pass 1: `output = [1, 1, 2, 6]` (prefix products).
- Pass 2 (right = 1):
  - i=3: output[3] = 6 × 1 = 6, right = 4
  - i=2: output[2] = 2 × 4 = 8, right = 12
  - i=1: output[1] = 1 × 12 = 12, right = 24
  - i=0: output[0] = 1 × 24 = 24, right = 24
- Final: `[24, 12, 8, 6]` ✓ (1×2×3×4 / each element)

## Why this works
By computing prefix and suffix products separately, we never need the element itself. The left-pass populates the output array with left products; the right-pass folds in right products multiplicatively. The output array is the only O(n) structure — no separate prefix or suffix arrays needed.

## Complexity
- Time: O(n) — two linear passes.
- Space: O(1) extra (output array itself is not counted per the problem statement).
