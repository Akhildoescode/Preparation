## Same pattern, different problem
- **Single Number (LC #136):** XOR to cancel paired bits — uses the same `a ^ b` operation but for a different purpose.
- **Number of 1 Bits (LC #191):** `n & (n-1)` to clear bits — another bitwise manipulation of the internal structure.
- **Add Binary (LC #67):** Adding two binary strings — the same carry logic but on characters rather than bits.
- **Multiply Strings (LC #43):** Simulating multiplication without the multiply operator — same idea of implementing arithmetic from first principles.

## When this pattern applies
Bit-level arithmetic simulation applies whenever you're forbidden from using arithmetic operators (+, -, *, /) or when you need to implement arithmetic at a very low level. The signal: "without using + or -, compute X + Y." The key mappings: XOR = addition without carry, AND = carry generation, AND << 1 = carry propagation. For subtraction: `a - b = a + (~b + 1)` (two's complement negation), where `~b + 1` is again computed without subtraction using the same XOR/AND loop.
