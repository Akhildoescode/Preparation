## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start:
- If multiple valid orderings exist, return any one?
- If the input is contradictory (cycle in ordering), return empty string?
- What about characters that appear in only one word and have no ordering constraint? They can appear anywhere in the output?
- Is the 'invalid prefix' case (longer word before its prefix) a real constraint? (Yes — return '' if word1 is longer and word2 is a prefix of word1.)"

### 2. State the brute force (90 seconds)
"No clean brute force. The algorithm is: extract ordering constraints from adjacent word pairs, build a directed graph, topological sort. If cycle detected, return ''."

### 3. Walk through the optimal approach (3 minutes)
"Two phases:

**Phase 1 — Extract edges:** Compare adjacent words char by char. First differing character gives us c1 → c2 (c1 comes before c2 in the alien alphabet). Add edge if not already present. If word1 is longer and word2 is its prefix — invalid, return ''.

**Phase 2 — Topological sort:** Kahn's algorithm. All characters seen in the words are nodes. In-degree initialized for each. BFS from zero-in-degree nodes. If all nodes are processed → return result. Else cycle → return ''.

Trace ['wrt','wrf','er','ett','rftt']:
- wrt/wrf: t→f. wrf/er: w→e. er/ett: r→t. ett/rftt: e→r.
- Edges: t→f, w→e, r→t, e→r. In-degrees: t:0,f:1,w:0,e:1,r:1.
- Queue: [t,w]. Process t: f→0. Queue:[w,f]. Process w: e→0. Queue:[f,e]. Process f,e: r→0. Queue:[r]. Process r: t→0 but t already processed. Result: t,w,f,e,r. That's 5/5 unique chars. ✓"

### 4. State complexity before coding
"O(C + U + E) time where C=total chars, U=unique chars, E=edges. I'll code it."

### 5. After coding
"Invalid prefix test: ['abc','ab']. Comparing: a=a,b=b,c vs end. word1 longer, word2 is prefix. Return ''. ✓"
