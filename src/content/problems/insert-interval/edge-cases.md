## Cases to mention to the interviewer

- **Empty input intervals:** intervals = []. Result is just [newInterval]. Zone 1 and zone 2 are both empty; zone 3 has nothing. The `result.add(newInterval)` line handles this.
- **New interval before all existing:** newInterval=[0,1], intervals=[[3,5],[6,9]]. Zone 1 is empty. Zone 2 is empty (3 > 1). Add [0,1]. Zone 3: add [3,5],[6,9]. Result: [[0,1],[3,5],[6,9]].
- **New interval after all existing:** newInterval=[10,12], intervals=[[1,3],[6,9]]. Zone 1: all intervals end before 10. Zone 2: empty. Add [10,12]. Zone 3: empty. Result: [[1,3],[6,9],[10,12]].
- **New interval overlaps all existing:** newInterval=[0,20], intervals=[[1,5],[6,10],[11,15]]. Zone 1 empty. Zone 2 merges all into [0,20]. Zone 3 empty. Result: [[0,20]].
- **Touching endpoints merged:** intervals=[[1,3],[5,7]], newInterval=[3,5]. Zone 1 empty (3 < 3 is false). Zone 2: [1,3] → 1 ≤ 5, merge to [1,5]; [5,7] → 5 ≤ 5, merge to [1,7]. Result: [[1,7]].
