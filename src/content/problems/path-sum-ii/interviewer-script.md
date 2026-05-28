## What to say, in order

### 1. Clarifying questions (60 seconds)
"Before I start, let me confirm a few things:
- A path must go from root all the way to a leaf — not any node to any other node, correct?
- Node values can be negative, right? That means I can't prune early based on remaining sum being negative.
- I need to return the actual path values, not just count the paths?"

### 2. State the brute force (90 seconds)
"The simplest approach would be to build a fresh list for every recursive call, carry it down, and if at a leaf the sum matches, add that list to results. That's O(n * h) space in the worst case because we clone the list at every level. We can do better with a shared mutable list and backtracking."

### 3. Walk through the optimal approach (3 minutes)
"The key observation is that I can maintain a single path list and a running remaining sum throughout the DFS. When I move to a child, I add that child to the path and subtract its value from remaining. When I backtrack, I remove the last element. So my approach is:
Step 1 — append current node to path, subtract its value from remaining.
Step 2 — if it's a leaf and remaining == 0, snapshot the path into results.
Step 3 — recurse left, recurse right.
Step 4 — remove last element from path (backtrack).

Let me trace: tree = [5,4,8,11,null,13,4,7,2,null,null,null,1], target=22.
Path so far: [], remaining=22.
Visit 5: path=[5], remaining=17.
  Visit 4: path=[5,4], remaining=13.
    Visit 11: path=[5,4,11], remaining=2.
      Visit 7: path=[5,4,11,7], remaining=-5. Leaf, -5≠0. Backtrack → path=[5,4,11].
      Visit 2: path=[5,4,11,2], remaining=0. Leaf, 0==0! Add [5,4,11,2] to results. Backtrack → path=[5,4,11].
    Backtrack → path=[5,4].
  Backtrack → path=[5].
  Visit 8: path=[5,8], remaining=9. Continue down... eventually [5,8,4,5] sums to 22, added."

### 4. State complexity before coding
"This will be O(n) time to visit all nodes, O(n log n) total including path copies for a balanced tree, and O(h) stack space. Sound good? I'll start coding."

### 5. After coding
"Let me trace through with a single node with value = targetSum — path=[node.val], remaining=0, it's a leaf, add [node.val] to results. For a single node not matching targetSum — remaining ≠ 0, we don't add. For an empty tree, base case returns immediately. Looks correct. Any concerns about the approach or the code?"
