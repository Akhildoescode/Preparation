## Cases to mention to the interviewer

- **Single character:** s = "a" → "a". The loop runs once, expand returns 1 for odd case, 0 for even. hi-lo+1 = 1, len=1 is not > 1. But initialization `lo=hi=0` ensures "a" is returned.
- **All same characters:** s = "aaaa" → "aaaa". The center at i=1 or i=2 expands to cover the whole string.
- **No repeated characters:** s = "abcd" → any single character. Every expansion attempt fails immediately (neighbors don't match). Length stays 1.
- **Even-length palindrome:** s = "abba" → "abba". Center between i=1 and i=2 ('bb') expands to include 'a' on both sides. Length 4.
- **Multiple palindromes of max length:** s = "babad" → "bab" or "aba" (both length 3). The algorithm returns whichever center is found first.
- **String itself is a palindrome:** s = "racecar" → "racecar". The center at i=3 ('e') expands to cover all 7 characters.
