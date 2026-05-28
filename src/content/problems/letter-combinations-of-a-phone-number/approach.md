## Understanding the problem
Given a string of digits 2–9, return all possible letter combinations those digits could represent on a phone keypad (2→abc, 3→def, 4→ghi, 5→jkl, 6→mno, 7→pqrs, 8→tuv, 9→wxyz). Each digit contributes exactly one letter; order is fixed by the digit sequence. This is a Cartesian product of letter sets.

## Brute force
Iteratively build combinations: start with the letters for digit 0, then for each subsequent digit, pair every existing combination with each letter for that digit. The same O(4^n · n) time and space — but backtracking is more elegant and avoids building intermediate lists.

## Key insight
At depth `idx` (0-indexed), we're choosing one letter for `digits[idx]`. There are 3 or 4 choices per digit. The decision tree has depth equal to the number of digits, and each root-to-leaf path is one complete combination. Backtracking over this tree is natural: append a letter, recurse to the next digit, remove the letter (backtrack).

## Optimal approach
1. Build a phone map: `PHONE = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}`.
2. `backtrack(idx, sb)`:
   - If `idx == digits.length()`: record `sb.toString()`.
   - For each `ch` in `PHONE[digits.charAt(idx) - '0']`: append `ch`, recurse with `idx+1`, delete last char.

## Why this works
At each depth we commit exactly one letter for the current digit, and the available letters depend only on that digit (independent of previous choices). Removing the last character restores the StringBuilder so the next letter for the same digit starts from the same prefix. Every leaf corresponds to one complete combination of one letter per digit.

## Complexity
- Time: O(4^n · n) — at most 4 choices per digit, n digits deep, n characters to copy at each leaf
- Space: O(n) recursion depth plus O(4^n · n) for the output
