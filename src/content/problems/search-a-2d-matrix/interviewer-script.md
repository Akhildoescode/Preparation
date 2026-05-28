## What to say, in order

### 1. Clarifying questions (60 seconds)
"A few quick questions:
- Is every row sorted left-to-right, and is the first element of each row strictly greater than the last element of the previous row? That's the key property I want to confirm.
- Can the matrix be empty, or have empty rows?
- Should I return a boolean, or the (row, col) coordinates?"

### 2. State the brute force (90 seconds)
"I could scan every cell: O(m·n) time. But with the matrix structured as it is, the entire matrix in row-major order is one sorted sequence, so I can do O(log(m·n))."

### 3. Walk through the optimal approach (3 minutes)
"The insight: if I unroll the matrix row by row, I get a sorted 1D array of m·n elements. I can binary search this virtual array, and at each step map index `mid` back to `(mid / n, mid % n)`.

Example: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3.
m=3, n=4. lo=0, hi=11.
- mid=5. row=5/4=1, col=5%4=1. matrix[1][1]=11 > 3 → hi=4.
- mid=2. row=0, col=2. matrix[0][2]=5 > 3 → hi=1.
- mid=0. row=0, col=0. matrix[0][0]=1 < 3 → lo=1.
- mid=1. row=0, col=1. matrix[0][1]=3 == 3. Return true."

### 4. State complexity before coding
"O(log(m·n)) time and O(1) space. I'll code it now."

### 5. After coding
"Edge case: target smaller than matrix[0][0] — the first comparison sends hi to -1 immediately. Edge case: target larger than the last element — lo goes past hi. Both handled correctly by the loop exit."
