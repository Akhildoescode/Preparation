## Cases to mention to the interviewer

- **Array with zeros:** e.g., [0,2]. A zero resets both maxProd and minProd to the next element. The 'nums[i] alone' candidate handles the reset.
- **Single element:** Return nums[0] directly (initialized before loop).
- **All negatives, even count:** e.g., [-2,-3,-4]. Product of all = -24 — negative. Best is [-2,-3]=6 or [-3,-4]=12. The algorithm tracks both max and min, correctly finding 12.
- **All negatives, odd count:** e.g., [-2,-3,-4,-5]. Full product = 120 — 4 elements with an even number of negatives: (-2)(-3)(-4)(-5) = 120. The algorithm finds the max product of all four since even-count negatives multiply to a positive.
- **Large negative in the middle:** e.g., [2,-5,3]. Trace: i=0 result=2. i=1: max=max(-5,-10,-10)=-5, min=-10, result=2. i=2: max=max(3,-15,-30)=3, result=3. The correct answer is 3 — neither the pair [2,-5] nor the triple [2,-5,3] beats a fresh start at 3.
- **All positives:** e.g., [2,3,4]. The entire array is the maximum subarray — max grows monotonically, min stays at the last element, result equals the product of all elements.
