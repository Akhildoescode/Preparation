## Cases to mention to the interviewer

- **n = 1:** One queen on a 1×1 board — always a valid configuration. Return `[["Q"]]`.
- **n = 2 or n = 3:** No valid configuration exists — the function returns an empty list. Verify your code handles this (it will, since no column passes all three conflict checks for any row).
- **n = 4:** Classic example with exactly 2 distinct solutions.
- **n = 8:** The famous 8-Queens problem — has 92 solutions. Your algorithm finds all of them with n! pruned search.
- **Diagonal conflict tracking:** Manually verify that placing queens at (0,0) and (1,1) conflicts: d1 = 0-0=0 and 1-1=0 — same main diagonal. Correctly blocked by diag1.
- **Anti-diagonal conflict tracking:** (0,3) and (1,2): d2 = 0+3=3 and 1+2=3 — same anti-diagonal. Correctly blocked by diag2.
