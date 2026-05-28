## Cases to mention to the interviewer

- **All negative values:** `[-3, -2, -5]`. Answer is the largest single node (-2). The `max(0, gain)` clamping ensures negative subtrees are excluded; the update with just `node.val + 0 + 0` correctly captures the single-node path.
- **Single node:** `[-1]`. maxGain(-1): leftGain=0, rightGain=0, candidate=-1, maxSum=-1. Return -1. ✓
- **Path doesn't go through root:** `[1, 2, 3, 4, 5]` where nodes 4 and 5 are children of 2. The path 4→2→5 = 11 > path through root. The global max captures this during the DFS at node 2.
- **Negative root, positive children:** `[-10, 20, 30]`. At root: leftGain=20, rightGain=30. Candidate = -10+20+30 = 40. But individual paths 20 and 30 were captured earlier. maxSum = 40.
- **Only left children (skewed):** `[1, 2, null, 3]`. At node 2: leftGain=3, rightGain=0, candidate=5, return 5. At node 1: leftGain=5, rightGain=0, candidate=6, return 6. maxSum=6 (path 3→2→1). ✓
- **One very negative child:** `[5, -100, 10]`. At root: leftGain=max(0,-100)=0, rightGain=10. Candidate=5+0+10=15. maxSum=15. The -100 subtree is correctly excluded.
- **Overflow risk:** Sum of all node values (n=3×10⁴ each at ±10³) could be ±3×10⁷, well within int range. No overflow concern here given LeetCode's constraints.
