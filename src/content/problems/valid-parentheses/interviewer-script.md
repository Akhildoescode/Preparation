## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- Is the input guaranteed to contain only the six bracket characters, or could there be letters or spaces?
- Is an empty string considered valid?
- Are all three bracket types present, or could the input contain only one type?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to repeatedly scan and remove adjacent matched pairs until no more can be removed, then check if the string is empty. That's O(n²) time due to repeated scans. We can do O(n) with a stack, which naturally models the LIFO nesting structure."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that brackets must close in reverse order of opening — the last opened bracket must be the first closed. That's exactly what a stack gives us. So my approach is:

Step 1: For every opening bracket, push it onto the stack.
Step 2: For every closing bracket, pop the stack and verify it matches.
Step 3: Return true only if the stack is empty at the end.

Let me trace through `{[()]}`:
- '{': push. Stack: ['{'].
- '[': push. Stack: ['{', '['].
- '(': push. Stack: ['{', '[', '('].
- ')': pop '(' — matches ')'. Stack: ['{', '['].
- ']': pop '[' — matches ']'. Stack: ['{'].
- '}': pop '{' — matches '}'. Stack: [].
- Stack empty → return true."

### 4. State complexity before coding
"This will be O(n) time and O(n) space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through `([)]` — push '(', push '[', see ')': pop '[', but '[' does not match ')' → return false immediately. Correct. Edge case: empty string — loop never runs, stack is empty → return true. Looks correct. Any concerns about the approach or the code?"
