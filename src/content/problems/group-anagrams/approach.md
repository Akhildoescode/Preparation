## Understanding the problem

You are given an array of strings `strs`. Two strings are anagrams of each other if one can be formed by rearranging the letters of the other. Group all anagrams together and return a list of groups; the order of groups and the order of strings within each group does not matter.

## Brute force

Compare every pair of strings to determine if they are anagrams. Two strings are anagrams if, after sorting their characters, they are equal. This naive approach checks all n*(n-1)/2 pairs and sorts each string of length m, giving O(n² * m log m) time — prohibitively slow for n = 10,000 strings.

## Key insight

Anagrams have the same sorted character sequence. Instead of comparing pairs, map every string to a canonical key — its sorted form — and bucket strings with the same key together. This replaces n² comparisons with n independent sorts.

## Optimal approach

Pattern: **hashing with a canonical key**.

1. Create a `HashMap<String, List<String>>`.
2. For each string `s` in `strs`:
   a. Sort the characters of `s` to produce the key (e.g., "eat" → "aet").
   b. In the map, append `s` to the list under that key.
3. Return `new ArrayList<>(map.values())`.

Each string is processed independently, and all strings that are anagrams of each other produce the same sorted key, landing in the same bucket automatically.

## Why this works

Sorting is a bijection on multisets: two strings have identical sorted forms if and only if they contain exactly the same characters with the same frequencies — which is precisely the definition of being anagrams. The hash map groups all strings with equal sorted forms in O(1) expected time per insertion.

## Complexity
- Time: O(n * m log m) where n is the number of strings and m is the maximum string length, because we sort each string once.
- Space: O(n * m) because we store all strings in the hash map's value lists.
