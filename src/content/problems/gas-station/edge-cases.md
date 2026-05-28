## Cases to mention to the interviewer

- **Single station:** n=1. If gas[0] >= cost[0], start=0. Otherwise totalGas < 0, return -1.
- **No solution exists:** gas=[1,2], cost=[3,4]. totalGas = (1-3)+(2-4) = -4 < 0. Return -1.
- **Multiple eliminations before settling:** gas=[1,2,3,4,5], cost=[3,4,5,1,2]. As traced above — start gets reset to 1, then 2, then 3. Answer is 3.
- **All sufficient — start at 0:** gas=[3,3,3], cost=[2,2,2]. tank never goes negative. start stays 0. totalGas=3 ≥ 0. Return 0.
- **Start at 0 verified:** gas=[4,1,1], cost=[1,2,3]. tank=3,3,1; never negative. totalGas=0 ≥ 0. Return 0. Correct — starting from station 0 works.
- **Exactly breaks even (totalGas = 0):** gas=[1,2,3,4,5], cost=[3,4,5,1,2]. totalGas=0 ≥ 0, still valid. Return the last non-eliminated start.
