## Cases to mention to the interviewer

- **Single zero:** `[1, 0, 3, 4]`. Only the position that skips the zero gets a non-zero product. `output[1] = 1*3*4 = 12`; all others are 0 (since they include the 0 in their product). Result: `[0, 12, 0, 0]`.
- **Two or more zeros:** `[1, 0, 0, 4]`. Every position's product includes at least one zero, so the entire output is `[0, 0, 0, 0]`.
- **All ones:** `[1, 1, 1, 1]`. Every output entry is 1 (product of three 1s). Trivial but verifies the algorithm doesn't break on uniform input.
- **Two elements:** `[3, 5]`. output = [5, 3]. The loop in Pass 1 runs once; Pass 2 runs twice. Works correctly.
- **Negative numbers:** `[-1, 2, -3, 4]`. Products may flip signs. The algorithm handles negatives transparently — no special casing.
- **Integer overflow risk:** With elements up to ±30 and n up to 10⁵, products can far exceed 32-bit int range. Ask whether the constraints guarantee the answer fits in an int. If not, use `long`. LeetCode's constraints for this problem guarantee fit, but it's worth mentioning.
- **All same value:** `[2, 2, 2, 2]`. Each output is 2³ = 8. The algorithm produces `[8, 8, 8, 8]`. Correct.
