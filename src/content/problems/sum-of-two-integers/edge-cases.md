## Cases to mention to the interviewer

- **a = 0:** carry = 0, a = 0 ^ b = b. Loop exits immediately after one iteration (b = carry = 0). Return b. Correct.
- **b = 0 initially:** Loop never executes. Return a. Correct.
- **Negative numbers:** a=-1 (all 1s), b=1. XOR: all 1s ^ 0001 = 1111...1110 = -2. Carry: (1111...1111 & 0001) << 1 = 0001 << 1 = 0010. Continue... eventually converges to 0. Correct (−1 + 1 = 0).
- **Both negative:** Works correctly via two's complement arithmetic — XOR and AND operate on the bit representation without caring about sign interpretation.
- **Overflow:** Handled naturally — if the true sum overflows 32-bit int, the bit operations will produce the same modular result that `+` would, matching Java's defined integer overflow behavior.
- **Large values near Integer.MAX_VALUE:** e.g., a = Integer.MAX_VALUE, b = 1. The carry from position 30 to 31 produces Integer.MIN_VALUE — same as what `+` would overflow to in Java.
