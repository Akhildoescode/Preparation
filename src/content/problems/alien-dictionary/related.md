## Pattern: Graph Construction from Implicit Constraints + Topological Sort

Alien Dictionary requires building the graph from the input (comparing adjacent words) before running topological sort. This two-step approach — "derive constraints → order them" — appears in many real-world dependency problems.

## Related problems

- **Course Schedule II (LC 210):** Topological sort with explicitly given dependency edges. Alien Dictionary is harder because edges must be derived from the word list.
- **Sequence Reconstruction (LC 444):** Verify that the target sequence is the unique topological order. Same Kahn's algorithm with a queue-size check.
- **Verifying an Alien Dictionary (LC 953):** Given the alien order, verify a word list is sorted. Simpler — no graph construction; just compare adjacent words using the given order mapping.
- **Find Itinerary (LC 332):** Eulerian path in a directed graph — use all edges exactly once. Hierholzer's algorithm, not topological sort, but same graph construction phase.
- **Parallel Courses II (LC 1494):** Minimum number of semesters with a prerequisite constraint and maximum k courses per semester. Bitmask DP on DAG.

## Key steps unique to Alien Dictionary

1. **Compare adjacent words** (not all pairs — only consecutive pairs in the list matter for ordering).
2. **First differing character** gives one ordering constraint: `word1[i] → word2[i]` (word1[i] comes before word2[i]).
3. **Prefix contradiction check:** If word1 is longer and word2 is a prefix of word1, the input is invalid.
4. **Collect unique characters** from all words — these are the graph nodes.
5. **Avoid duplicate edges** — use a Set per node's adjacency to prevent double-counting in-degrees.
6. **Run Kahn's BFS** on the derived graph; if result length < unique character count, cycle → return `""`.

## Why this is a hard problem in interviews

Most candidates can do topological sort. The difficulty is the input parsing: recognizing that only adjacent word pairs matter, finding the first differing character, handling the prefix-is-longer edge case, and correctly tracking in-degrees without duplicate edges.
