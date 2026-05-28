## Cases to mention to the interviewer

- **Empty string:** Loop never runs, stack remains empty, returns `true`. An empty string is trivially valid.
- **Single opening bracket:** `"("` — stack has one element after the loop, `stack.isEmpty()` is false → returns `false`. Correct.
- **Single closing bracket:** `")"` — stack is empty when we see the closer, return `false` immediately. Correct.
- **All same type, correctly nested:** `"((()))"` — three pushes, three matching pops, empty stack → `true`.
- **Interleaved mismatched types:** `"([)]"` — push '(', push '[', see ')': pop '[', but '[' != '(' → return `false`. The crossing structure is caught immediately.
- **Only closing brackets:** `")))"` — first character triggers empty-stack check → `false`.
- **Only opening brackets:** `"((("` — all pushed, stack non-empty → `false`.
- **Odd length:** Any odd-length string cannot be valid (brackets are always in pairs). The code handles this naturally — the stack will be non-empty or a mismatch will be detected.
