import { cn } from '@/lib/utils';
import type { Pattern } from '@/types';

interface PatternTagProps {
  pattern: Pattern;
  className?: string;
}

const labels: Record<Pattern, string> = {
  two_pointers: 'Two Pointers',
  sliding_window: 'Sliding Window',
  prefix_sum: 'Prefix Sum',
  hashing: 'Hashing',
  linked_list: 'Linked List',
  stack_monotonic: 'Monotonic Stack',
  queue_bfs: 'Queue/BFS',
  tree_dfs: 'Tree DFS',
  tree_bfs: 'Tree BFS',
  bst: 'BST',
  trie: 'Trie',
  heap: 'Heap',
  graph_dfs: 'Graph DFS',
  graph_bfs: 'Graph BFS',
  topo_sort: 'Topo Sort',
  union_find: 'Union Find',
  binary_search: 'Binary Search',
  backtracking: 'Backtracking',
  bit_manipulation: 'Bit Manipulation',
  dp_1d: '1D DP',
  dp_2d: '2D DP',
  greedy: 'Greedy',
  intervals: 'Intervals',
  kadane: "Kadane's",
};

export function PatternTag({ pattern, className }: PatternTagProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium', className)}
      style={{
        background: 'var(--c-violet-bg)',
        color: 'var(--c-violet-text)',
        border: '1px solid var(--c-violet-border)',
      }}
    >
      {labels[pattern]}
    </span>
  );
}
