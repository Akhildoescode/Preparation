## Same pattern, different problem
- **Daily Temperatures:** Uses the same `ArrayDeque` as a stack with indices; the "auxiliary tracking" concept (storing extra information alongside the main value) is the same mindset as the parallel min stack.
- **Valid Parentheses:** The foundational stack problem — if you can reason about push/pop semantics and invariants there, the auxiliary stack idea here is a natural extension.
- **Largest Rectangle in Histogram:** Also uses a stack where each entry carries auxiliary information (the implicit "left boundary" index) needed for the area computation — same "store more than just the value" pattern.
- **LRU Cache:** Another O(1)-all-operations design problem; requires a HashMap + doubly linked list. Solving Min Stack builds the design-problem instinct needed for LRU Cache.

## When this pattern applies
Use an auxiliary tracking stack whenever the stack's aggregate property (minimum, maximum, running sum) needs to be queryable in O(1) but that property changes as elements are pushed and popped. The key insight is that the aggregate at any stack depth is a function only of the elements below and at that depth — a fact we can precompute on every push and store in a parallel stack. Any "stack with O(1) X-query" problem, where X is some aggregate, is solved this way.
