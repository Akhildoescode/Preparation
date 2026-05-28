## Understanding the problem

Given a string `s`, determine whether it is a palindrome after filtering out all non-alphanumeric characters and converting the remaining characters to lowercase. A palindrome reads the same forwards and backwards. For example, "A man, a plan, a canal: Panama" is a palindrome after stripping punctuation and spaces.

## Brute force

Clean the string first: iterate over every character, keep only alphanumeric characters and convert to lowercase, building a new string `clean`. Then check if `clean.equals(new StringBuilder(clean).reverse().toString())`. This is O(n) time and O(n) space for the auxiliary string. It is actually efficient enough, but it uses unnecessary extra memory — we can solve this in O(1) space.

## Key insight

We do not need to build the cleaned string at all. Two pointers — one from the left and one from the right — can scan inward, skipping non-alphanumeric characters on the fly. When both pointers land on valid characters, compare them (case-insensitively). If they ever differ, the string is not a palindrome.

## Optimal approach

Pattern: **two pointers (inward scan with skip)**.

1. Set `l = 0`, `r = s.length() - 1`.
2. While `l < r`:
   a. Advance `l` while `l < r` and `s.charAt(l)` is not alphanumeric.
   b. Retreat `r` while `l < r` and `s.charAt(r)` is not alphanumeric.
   c. If `Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))`, return `false`.
   d. Move `l++` and `r--`.
3. Return `true`.

## Why this works

At each step, the two pointers are positioned on the next relevant characters from each end. If all such pairs match, the filtered string is a palindrome by definition. Skipping non-alphanumeric characters inside the loop is equivalent to pre-filtering but avoids allocating a new string.

## Complexity
- Time: O(n) because each character is visited at most once by either pointer.
- Space: O(1) because no auxiliary data structures are allocated; only two integer pointers are maintained.
