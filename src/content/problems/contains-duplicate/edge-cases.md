## Cases to mention to the interviewer

- **Empty input:** The loop never runs, and we return `false`. No duplicates exist in an empty array, so this is correct.
- **Single element:** Only one element means no pair can repeat. The loop runs once, inserts the element, and exits. Returns `false` correctly.
- **All duplicates:** e.g., `[7, 7, 7, 7]`. We hit on the very first duplicate check (index 1) and return `true` early without processing the rest.
- **All identical values (length 2):** The minimal duplicate case `[5, 5]`. Verifies the base condition — hit on second element.
- **No duplicates at all (worst case for space):** e.g., `[1, 2, 3, 4, 5]`. The set fills to capacity n and we return `false` at the end. This is the worst-case scenario for memory.
- **Negative numbers and zero:** `[-1, 0, 1, -1]`. HashSet handles negative integers the same as positive, so this works without special handling.
- **Integer overflow risk:** Not applicable here — we are checking equality, not summing values.
