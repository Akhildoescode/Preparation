## Cases to mention to the interviewer

- **n = 1:** Only one house — rob it. Return nums[0]. (Both sub-ranges would be empty without this guard.)
- **n = 2:** Two adjacent houses in a circle — both touch each other. Return max(nums[0], nums[1]).
- **n = 3 with all same values:** e.g., [5,5,5]. Case 1: [5,5] → 5. Case 2: [5,5] → 5. Answer: 5.
- **First and last house have high values:** e.g., [10,1,1,10]. Case 1: [10,1,1] → 10. Case 2: [1,1,10] → 10. Answer: 10. (Can't rob both 10s since they're adjacent in the circle.)
- **All houses equal:** [k,k,...,k] of length n. Optimal is to rob every other house. Both sub-ranges give the same result.
- **Single large house surrounded by small ones:** e.g., [1,100,1]. Case 1: [1,100] → 100. Case 2: [100,1] → 100. Answer: 100.
