## Cases to mention to the interviewer

- **Empty array:** Return 0. (Though the problem constraints say n ≥ 1.)
- **Single house:** Return nums[0]. No adjacency constraint to worry about.
- **Two houses:** Return max(nums[0], nums[1]). Cannot rob both.
- **All same values:** e.g., [5,5,5,5,5]. Best is to rob every other house: 5+5+5=15 for n=5. The recurrence handles this correctly.
- **Strictly increasing amounts:** e.g., [1,2,3,4,5]. Optimal is not always every other — dp trace shows dp[0]=1, dp[1]=2, dp[2]=max(2,1+3)=4, dp[3]=max(4,2+4)=6, dp[4]=max(6,4+5)=9. Answer is 9 (rob houses 0, 2, 4 for 1+3+5=9). Correct.
- **Negative amounts not present:** Problem guarantees non-negative, but if negatives were present the algorithm would still work — sometimes skipping even a single house is better.
