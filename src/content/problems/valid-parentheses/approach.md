## Understanding the problem

Given a string containing only the characters `(`, `)`, `{`, `}`, `[`, and `]`, determine if the string is valid. A string is valid if every opening bracket has a corresponding closing bracket of the same type in the correct nested order — no crossing or unclosed brackets allowed.

## Brute force

Repeatedly scan the string and remove every adjacent matched pair (like `()`, `{}`, `[]`) until no more removals are possible, then check if the string is empty. This works but takes O(n²) time in the worst case due to repeated passes, and mutates the input string. It also obscures the natural last-in-first-out structure of the problem.

## Key insight

Brackets must close in reverse order of opening — the most recently opened bracket must be closed first. This is exactly the LIFO (last-in, first-out) property of a stack. Push opening brackets; on a closing bracket, check if the top of the stack is the matching opener.

## Optimal approach

**Pattern: Stack (matching pairs)**

1. Create a stack (use `ArrayDeque<Character>`).
2. Iterate through each character in the string:
   - If it is an opening bracket (`(`, `{`, `[`), push it onto the stack.
   - If it is a closing bracket:
     - If the stack is empty, return `false` (nothing to match).
     - Pop the top and check if it is the corresponding opener. If not, return `false`.
3. After the loop, the string is valid only if the stack is empty (no unmatched openers remain).

**Invariant:** The stack always holds the sequence of unmatched opening brackets seen so far, in the order they were encountered. The top of the stack is the most recent unmatched opener.

## Why this works

Nesting requires LIFO resolution: the innermost pair must close before any outer pair. The stack models this perfectly — pushing openers means the top is always the innermost unmatched opener that the next closer must match. An empty stack at the end proves every opener was matched.

## Complexity
- Time: O(n) because we visit each character exactly once and each stack operation is O(1)
- Space: O(n) because in the worst case (all opening brackets) the stack holds n/2 elements
