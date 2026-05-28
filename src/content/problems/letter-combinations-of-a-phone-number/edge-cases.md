## Cases to mention to the interviewer

- **Empty input:** `digits = ""` → return `[]`. Guard before calling backtrack.
- **Single digit:** `digits = "2"` → `["a", "b", "c"]`. Depth-1 tree, three leaves.
- **Digit '7' or '9' (4 letters):** `digits = "9"` → `["w","x","y","z"]`. Ensure PHONE[9]="wxyz" is correct.
- **Repeated digit:** `digits = "22"` → 9 combinations (3 × 3): aa, ab, ac, ba, bb, bc, ca, cb, cc.
- **Maximum length:** For n=4 digits, up to 4^4 = 256 combinations — very fast.
- **Digits '0' or '1':** The problem guarantees 2–9, but if encountered, `PHONE[0]=""` and `PHONE[1]=""` would cause the inner loop to iterate over an empty string, producing no combinations — effectively skipping that digit.
