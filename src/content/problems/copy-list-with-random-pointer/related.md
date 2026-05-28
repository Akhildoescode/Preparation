## Same pattern, different problem
- **Clone Graph:** Identical pattern — HashMap from original node to clone, BFS/DFS to visit all nodes (Pass 1 + Pass 2 collapsed into DFS), wire edges using the map. The extra dimension here is a graph's arbitrary edges vs a list's single random pointer.
- **LRU Cache:** Requires maintaining a HashMap from keys to doubly linked list nodes — same concept of a map that lets you jump to a node in O(1), which is the core of this problem.
- **Merge Two Sorted Lists:** Uses the same "dummy head + pointer wiring" mechanics for linked list construction, a prerequisite skill for confidence with this problem.
- **Reorder List:** Also requires in-place pointer rewiring on a linked list; the two-pass discipline (read structure, then rewrite pointers) is the same mindset.

## When this pattern applies
Use a HashMap from original-to-clone whenever you need to deep-copy a structure that has non-tree (back/cross/random) edges. The two-pass discipline — create all nodes first, wire all edges second — guarantees that every reference target exists before you try to set any pointer. This avoids forward-reference bugs that would arise in a single combined pass. The pattern extends naturally to deep-copying graphs, trees with parent pointers, or any data structure with cycles.
