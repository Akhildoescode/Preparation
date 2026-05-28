## Cases to mention to the interviewer

- **Word longer than total grid cells:** `m * n < word.length()` — guaranteed no solution; add a guard at the top for this.
- **Single cell grid, matching:** `grid=[['A']], word="A"` → true. idx=0 equals word.length()-1 immediately.
- **Single cell grid, non-matching:** `grid=[['B']], word="A"` → character mismatch at root, return false.
- **Word with repeated characters:** `word="AABB"` in a grid where A and B alternate — the sentinel prevents reusing the same 'A' cell for both A positions.
- **Same character in multiple locations:** DFS starts from every cell, so all possible starting points for the first character are tried.
- **Path must backtrack and branch:** A path that goes right, hits a dead end, comes back, and goes down — the restore step ensures dead-end branches don't corrupt subsequent explorations.
