## Cases to mention to the interviewer

- **n = 1:** Already at the last index — 0 jumps needed. Loop never executes (i < 0 is false). Return 0.
- **n = 2:** One jump needed (from index 0 to 1). i=0 < n-1=1: farthest = nums[0] ≥ 1. i=curEnd=0 → jumps=1, curEnd=farthest. Return 1.
- **Large jump at start:** nums = [n-1, ...]. From index 0, farthest = n-1. After i=0 == curEnd: jumps=1, curEnd=n-1. Loop ends. Return 1.
- **All ones:** nums = [1,1,1,...,1]. At each step, farthest = i+1. curEnd advances by 1 each time. Total jumps = n-1.
- **nums[0] = 0:** Problem guarantees reachability, so this won't appear (except n=1).
- **Mixed small and large jumps:** nums = [2,3,0,1,4]. From i=0: farthest=2. Jump. From level [1,2]: i=1: farthest=4. i=2: farthest=max(4,2)=4. i==curEnd=2 → jump, curEnd=4. Return 2. Correct.
