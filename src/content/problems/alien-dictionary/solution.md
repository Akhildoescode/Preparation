## Reference solution

**Complexity:** O(C + U + E) time where C = total chars, U = unique chars, E = ordering edges.

```java
class Solution {
    public String alienOrder(String[] words) {
        // Initialize all unique characters with in-degree 0
        var inDegree = new HashMap<Character, Integer>();
        var adj = new HashMap<Character, List<Character>>();
        for (String word : words) {
            for (char c : word.toCharArray()) {
                inDegree.putIfAbsent(c, 0);
                adj.putIfAbsent(c, new ArrayList<>());
            }
        }

        // Extract ordering constraints from adjacent word pairs
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            // Invalid: w1 is longer and w2 is a prefix of w1
            if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
            for (int j = 0; j < minLen; j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    // Only add edge if not already present (avoid duplicate in-degree increments)
                    char from = w1.charAt(j), to = w2.charAt(j);
                    if (!adj.get(from).contains(to)) {
                        adj.get(from).add(to);
                        inDegree.merge(to, 1, Integer::sum);
                    }
                    break; // Only first differing char gives ordering info
                }
            }
        }

        // Kahn's topological sort
        var queue = new ArrayDeque<Character>();
        for (var entry : inDegree.entrySet()) {
            if (entry.getValue() == 0) queue.offer(entry.getKey());
        }

        var result = new StringBuilder();
        while (!queue.isEmpty()) {
            char c = queue.poll();
            result.append(c);
            for (char next : adj.get(c)) {
                inDegree.merge(next, -1, Integer::sum);
                if (inDegree.get(next) == 0) queue.offer(next);
            }
        }

        return result.length() == inDegree.size() ? result.toString() : "";
    }
}
```

## Line-by-line notes
- **`putIfAbsent` for all chars:** Every character must be represented, even those without ordering constraints. Without this, isolated characters (no edges) would be missing from the final ordering.
- **`w1.startsWith(w2)` guard:** Detects the invalid prefix case. `"abc"` before `"ab"` is illegal — "longer word before shorter prefix."
- **`break` after first differing char:** Only the first differing position gives ordering information. Characters beyond the first difference tell us nothing about relative order.
- **`adj.get(from).contains(to)` check:** Prevents duplicate edges and incorrect in-degree inflation. An O(U) check per comparison — for large inputs, use a `Set` for neighbors instead.

## Common bugs to avoid
- **Not initializing all characters:** Characters with no ordering constraints (no edges) still need to appear in the result — omitting them gives an incomplete ordering.
- **Missing the `startsWith` invalid check:** Without it, the algorithm would silently produce an incorrect or empty result for invalid inputs.
- **Not breaking after the first difference:** Continuing past the first difference extracts false ordering constraints.
