## Cases to mention to the interviewer

- **All negative numbers:** `[-5, -3, -8, -1]`. Answer is -1 (the least-negative element). Initializing both variables to `nums[0]` handles this — the algorithm always picks the "restart" branch since every partial sum is negative, effectively choosing the largest single element.
- **Single element:** `[42]`. The loop doesn't execute. Both variables are initialized to 42. Return 42 immediately.
- **All positive numbers:** `[1, 2, 3, 4]`. The running sum never goes negative, so `currentSum` grows to the total sum of the array. Answer is 10.
- **Large negative in the middle:** `[10, -100, 10]`. After seeing -100, `currentSum` resets to max(-100, 10-100) = -90. Next element: currentSum = max(10, -90+10) = 10. maxSum stays at 10 (from the first element). Answer: 10 — the two 10s cannot be combined because the -100 between them makes the combined sum -80 < 10.
- **Integer overflow risk:** With n = 10⁵ elements each at `Integer.MAX_VALUE` (≈ 2.1 × 10⁹), the maximum subarray sum would overflow an int. In practice, LeetCode's constraints keep this in range for this problem, but worth mentioning: use `long` if element values can be large.
- **Alternating positive and negative:** `[5, -3, 5]`. Running: current=5, current=max(-3,2)=2, current=max(5,7)=7. Answer: 7 (the full array). Verify: 5-3+5=7. Correct.
