## Understanding the problem
Given n, return an array `ans` of length n+1 where `ans[i]` is the number of '1' bits in i (for i from 0 to n). We need to compute Hamming weights for all numbers 0 through n efficiently — ideally O(n) without calling `Integer.bitCount` n times.

## Brute force
For each i from 0 to n, call a Hamming weight function (e.g., the `n & (n-1)` loop). O(n · 32) = O(n) time technically, but each inner loop costs up to 32 steps. We can do it in exactly O(n) with one pass using DP.

## Key insight
Every number i has the same bits as i >> 1 (right-shifted by one), plus possibly one extra bit at position 0 if i is odd. In other words: `bitCount(i) = bitCount(i >> 1) + (i & 1)`. Since `i >> 1 < i`, we've already computed `dp[i >> 1]` by the time we compute `dp[i]`.

## Optimal approach
1. Allocate `int[] dp = new int[n + 1]`. `dp[0] = 0`.
2. For `i` from 1 to n: `dp[i] = dp[i >> 1] + (i & 1)`.
3. Return `dp`.

This processes each number in O(1) using a previously computed result.

## Why this works
Right-shifting i by 1 removes the least significant bit. The number of 1-bits in `i >> 1` is `dp[i >> 1]`. If the LSB of i is 1 (i.e., `i & 1 == 1`), then i has one more 1-bit than `i >> 1`. The recurrence `dp[i] = dp[i >> 1] + (i & 1)` captures exactly this.

## Complexity
- Time: O(n) — one pass through all numbers, O(1) per number
- Space: O(n) for the output array (required by the problem; no additional space)
