## Reference solution

**Complexity:** O(4^n · n) time, O(n) auxiliary space (n = number of digits).

```java
class Solution {
    private static final String[] PHONE = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;  // guard: no combinations for empty input
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(String digits, int idx,
                           StringBuilder sb, List<String> result) {
        if (idx == digits.length()) {
            result.add(sb.toString());
            return;
        }

        // Letters for the current digit
        String letters = PHONE[digits.charAt(idx) - '0'];
        for (char ch : letters.toCharArray()) {
            sb.append(ch);
            backtrack(digits, idx + 1, sb, result);
            sb.deleteCharAt(sb.length() - 1);  // undo the append (backtrack)
        }
    }
}
```

## Line-by-line notes
- **`PHONE` array indexed by int:** `digits.charAt(idx) - '0'` converts the digit character to its integer value — e.g., '3' - '0' = 3. Indexing an array is O(1) and avoids a HashMap.
- **`StringBuilder` instead of String:** String `+` creates a new object per append — O(n) per operation. StringBuilder's `append` and `deleteCharAt` are O(1) amortized, keeping the inner-loop overhead minimal.
- **`deleteCharAt(sb.length() - 1)`:** Removes the last character — the "unchoose" step. Always remove the *last* character, not by value or by index 0.
- **Empty input guard before backtrack:** Without it, when `digits.isEmpty()`, the base case triggers at `idx==0==digits.length()` and adds an empty string to results.

## Common bugs to avoid
- **`deleteCharAt(0)` instead of `deleteCharAt(sb.length() - 1)`:** Removes the first character instead of the last, corrupting the StringBuilder for subsequent iterations.
- **Not guarding empty input:** The base case `idx == digits.length()` fires immediately for empty input, adding an empty string. Guard explicitly.
- **Using String concatenation:** `String s = current + ch` creates O(n) garbage per recursive call. Use StringBuilder.
