## Cases to mention to the interviewer

- **n = 0:** Zero '1' bits. The while loop never executes, return 0.
- **n = 1:** One '1' bit at position 0. One iteration of the loop: 1 & 0 = 0. Return 1.
- **All bits set (n = -1 = 0xFFFFFFFF):** 32 set bits. The loop runs 32 times. Return 32.
- **Power of 2 (n = 8 = 1000):** Only one '1' bit. One iteration: 8 & 7 = 0. Return 1.
- **Negative numbers:** In Java, `int` is signed. -1 in binary is 32 ones (two's complement). `n != 0` handles this correctly; `n > 0` would not.
- **Large value with sparse bits (n = 2^31 = Integer.MIN_VALUE = 10000...0):** One '1' bit. One iteration of the loop. Return 1.
