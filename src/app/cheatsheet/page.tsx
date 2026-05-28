import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheat Sheet — DSA Prep',
};

interface PatternEntry {
  name: string;
  signal: string;
  template: string;
  example: string;
}

const PATTERNS: PatternEntry[] = [
  {
    name: 'Two Pointers',
    signal: 'Sorted array, pair sum, palindrome check, partition.',
    template: `int left = 0, right = n - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return new int[]{left, right};
    else if (sum < target) left++;
    else right--;
}`,
    example: '3Sum, Container With Most Water, Valid Palindrome',
  },
  {
    name: 'Sliding Window',
    signal: 'Contiguous subarray/substring of size k, or min/max window satisfying a condition.',
    template: `int left = 0, max = 0;
Map<Character, Integer> freq = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    freq.merge(s.charAt(right), 1, Integer::sum);
    while (windowInvalid(freq)) {
        freq.merge(s.charAt(left), -1, Integer::sum);
        if (freq.get(s.charAt(left)) == 0) freq.remove(s.charAt(left));
        left++;
    }
    max = Math.max(max, right - left + 1);
}`,
    example: 'Longest Substring Without Repeating Characters, Minimum Window Substring',
  },
  {
    name: 'Prefix Sum',
    signal: 'Subarray sum queries, range sum, count subarrays with property.',
    template: `int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
// Sum from i to j (inclusive): prefix[j+1] - prefix[i]

// With hashmap for subarray sum = k:
Map<Integer, Integer> seen = new HashMap<>();
seen.put(0, 1);
int sum = 0, count = 0;
for (int x : nums) {
    sum += x;
    count += seen.getOrDefault(sum - k, 0);
    seen.merge(sum, 1, Integer::sum);
}`,
    example: 'Subarray Sum Equals K, Product of Array Except Self',
  },
  {
    name: 'Hashing',
    signal: 'O(1) lookup needed, frequency count, grouping by property.',
    template: `// Frequency map
Map<Integer, Integer> freq = new HashMap<>();
for (int x : nums) freq.merge(x, 1, Integer::sum);

// Group by key
Map<String, List<String>> groups = new HashMap<>();
for (String s : strs) {
    char[] arr = s.toCharArray();
    Arrays.sort(arr);
    groups.computeIfAbsent(new String(arr), k -> new ArrayList<>()).add(s);
}`,
    example: 'Two Sum, Group Anagrams, Longest Consecutive Sequence',
  },
  {
    name: 'Linked List (Fast & Slow)',
    signal: 'Cycle detection, middle of list, Nth from end.',
    template: `// Cycle detection
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;  // cycle
}

// Find middle
while (fast != null && fast.next != null) {
    slow = slow.next; fast = fast.next.next;
}
// slow is now the middle`,
    example: 'Linked List Cycle, Reorder List, Merge K Sorted Lists',
  },
  {
    name: 'Monotonic Stack',
    signal: 'Next greater/smaller element, span problems, histogram area.',
    template: `Deque<Integer> stack = new ArrayDeque<>();  // indices
int[] result = new int[n];
for (int i = 0; i < n; i++) {
    // Pop while current breaks monotonic property
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        result[stack.pop()] = i;  // i is the "next greater"
    }
    stack.push(i);
}`,
    example: 'Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water',
  },
  {
    name: 'Tree DFS',
    signal: 'Path sum, depth, diameter, validate BST, serialize/deserialize.',
    template: `// Post-order: process children before parent
int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    // Update global answer using left + right through this node
    ans = Math.max(ans, left + right + node.val);
    return Math.max(left, right) + node.val;
}`,
    example: 'Diameter of Binary Tree, Binary Tree Maximum Path Sum, LCA',
  },
  {
    name: 'Tree BFS',
    signal: 'Level-order traversal, min depth, right side view.',
    template: `Queue<TreeNode> q = new ArrayDeque<>();
q.offer(root);
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        TreeNode node = q.poll();
        // process node; last node at i==size-1 is right side view
        if (node.left != null) q.offer(node.left);
        if (node.right != null) q.offer(node.right);
    }
}`,
    example: 'Binary Tree Level Order Traversal, Binary Tree Right Side View',
  },
  {
    name: 'Binary Search',
    signal: 'Sorted (or monotone) array, "find minimum X such that F(X) holds".',
    template: `int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (condition(mid)) {
        ans = mid;
        right = mid - 1;   // or left = mid + 1 for rightmost
    } else {
        left = mid + 1;    // or right = mid - 1
    }
}

// Binary search on answer space:
int lo = minPossible, hi = maxPossible;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (feasible(mid)) hi = mid; else lo = mid + 1;
}`,
    example: 'Search in Rotated Sorted Array, Koko Eating Bananas, Find Minimum in Rotated Array',
  },
  {
    name: 'Backtracking',
    signal: 'Generate all combinations/permutations/subsets, constraint-satisfaction.',
    template: `void backtrack(int start, List<Integer> path) {
    if (path.size() == k) {   // or other base case
        result.add(new ArrayList<>(path));
        return;
    }
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // skip dups
        path.add(nums[i]);
        backtrack(i + 1, path);  // i+1 for combos, i for reuse
        path.removeLast();
    }
}`,
    example: 'Subsets, Combination Sum, Permutations, Word Search',
  },
  {
    name: 'Graph BFS',
    signal: 'Shortest path in unweighted graph, connected components, multi-source expansion.',
    template: `Queue<int[]> q = new ArrayDeque<>();
boolean[][] visited = new boolean[rows][cols];
q.offer(new int[]{startR, startC});
visited[startR][startC] = true;
int dist = 0;
int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        int[] curr = q.poll();
        for (int[] d : dirs) {
            int nr = curr[0]+d[0], nc = curr[1]+d[1];
            if (nr>=0 && nr<rows && nc>=0 && nc<cols && !visited[nr][nc] && valid(nr,nc)) {
                visited[nr][nc] = true;
                q.offer(new int[]{nr, nc});
            }
        }
    }
    dist++;
}`,
    example: 'Number of Islands, Word Ladder, Rotting Oranges',
  },
  {
    name: 'Graph DFS',
    signal: 'Explore all paths, detect cycle, topological sort, connected components.',
    template: `Set<Integer> visited = new HashSet<>();
Set<Integer> inStack = new HashSet<>();  // for cycle detection

boolean dfs(int node) {
    visited.add(node);
    inStack.add(node);
    for (int neighbor : adj.get(node)) {
        if (!visited.contains(neighbor) && dfs(neighbor)) return true;
        if (inStack.contains(neighbor)) return true;  // back-edge = cycle
    }
    inStack.remove(node);
    order.add(0, node);  // prepend for topo order
    return false;
}`,
    example: 'Course Schedule, Clone Graph, Pacific Atlantic Water Flow',
  },
  {
    name: 'Topological Sort',
    signal: 'Dependency ordering, course prerequisites, build systems.',
    template: `// Kahn's algorithm (BFS)
int[] inDegree = new int[n];
for (int[] edge : prerequisites) inDegree[edge[0]]++;
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (inDegree[i] == 0) q.offer(i);
List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
    int cur = q.poll();
    order.add(cur);
    for (int next : adj.get(cur)) {
        if (--inDegree[next] == 0) q.offer(next);
    }
}
// If order.size() != n, there's a cycle`,
    example: 'Course Schedule II, Alien Dictionary',
  },
  {
    name: 'Union-Find',
    signal: 'Dynamic connectivity, grouping, detect cycle in undirected graph.',
    template: `int[] parent, rank;

int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]); // path compression
    return parent[x];
}

boolean union(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return false;  // already connected
    if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
    parent[py] = px;
    if (rank[px] == rank[py]) rank[px]++;
    return true;
}`,
    example: 'Number of Connected Components, Graph Valid Tree, Redundant Connection',
  },
  {
    name: 'Heap / Priority Queue',
    signal: 'K-th largest/smallest, merge K sorted, continuous median.',
    template: `// Min-heap for K largest elements
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : nums) {
    pq.offer(x);
    if (pq.size() > k) pq.poll();
}
// pq.peek() = kth largest

// Two-heap for median
PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
PriorityQueue<Integer> large = new PriorityQueue<>(); // min-heap`,
    example: 'Kth Largest Element, Top K Frequent, Find Median from Data Stream',
  },
  {
    name: 'Trie',
    signal: 'Prefix lookup, word search with wildcards, autocomplete.',
    template: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd;
}
TrieNode root = new TrieNode();

void insert(String word) {
    TrieNode cur = root;
    for (char c : word.toCharArray()) {
        int i = c - 'a';
        if (cur.children[i] == null) cur.children[i] = new TrieNode();
        cur = cur.children[i];
    }
    cur.isEnd = true;
}`,
    example: 'Implement Trie, Word Search II',
  },
  {
    name: '1-D Dynamic Programming',
    signal: 'Count/optimize over a 1D sequence, overlapping subproblems.',
    template: `// Classic DP table (Coin Change)
int[] dp = new int[amount + 1];
Arrays.fill(dp, Integer.MAX_VALUE);
dp[0] = 0;
for (int coin : coins) {
    for (int i = coin; i <= amount; i++) {
        if (dp[i - coin] != Integer.MAX_VALUE)
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
}`,
    example: 'Coin Change, House Robber, Longest Increasing Subsequence, Word Break',
  },
  {
    name: '2-D Dynamic Programming',
    signal: 'Two sequences, grid paths, string edit distance.',
    template: `// LCS skeleton
int[][] dp = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (text1.charAt(i-1) == text2.charAt(j-1))
            dp[i][j] = dp[i-1][j-1] + 1;
        else
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
}`,
    example: 'Longest Common Subsequence, Edit Distance, Longest Palindromic Substring',
  },
  {
    name: 'Greedy',
    signal: 'Locally optimal choice leads to global optimum; no look-ahead needed.',
    template: `// Jump Game: track max reachable index
int maxReach = 0;
for (int i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
}
return true;

// Intervals: sort by end, greedily pick non-overlapping
Arrays.sort(intervals, (a, b) -> a[1] - b[1]);`,
    example: 'Jump Game, Gas Station, Non-overlapping Intervals',
  },
  {
    name: 'Intervals',
    signal: 'Merge overlapping ranges, scheduling, meeting rooms.',
    template: `// Merge intervals
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
List<int[]> merged = new ArrayList<>();
for (int[] iv : intervals) {
    if (merged.isEmpty() || merged.getLast()[1] < iv[0])
        merged.add(iv);
    else
        merged.getLast()[1] = Math.max(merged.getLast()[1], iv[1]);
}`,
    example: 'Merge Intervals, Insert Interval, Meeting Rooms II',
  },
  {
    name: 'Bit Manipulation',
    signal: 'XOR tricks, count set bits, find missing number, arithmetic without operators.',
    template: `// Count set bits (Brian Kernighan)
int count = 0;
while (n != 0) { n &= (n - 1); count++; }

// XOR to find single number
int result = 0;
for (int x : nums) result ^= x;

// Check / set / clear bit i
boolean set  = (n & (1 << i)) != 0;
int withSet  = n | (1 << i);
int withClear = n & ~(1 << i);`,
    example: 'Single Number, Number of 1 Bits, Missing Number, Sum of Two Integers',
  },
  {
    name: 'Kadane\'s Algorithm',
    signal: 'Maximum subarray sum (contiguous).',
    template: `int maxSum = nums[0], cur = nums[0];
for (int i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    maxSum = Math.max(maxSum, cur);
}`,
    example: 'Maximum Subarray, Maximum Product Subarray',
  },
];

const COMPLEXITY: { notation: string; name: string; examples: string }[] = [
  { notation: 'O(1)', name: 'Constant', examples: 'Array index, hashmap lookup, stack push/pop' },
  { notation: 'O(log n)', name: 'Logarithmic', examples: 'Binary search, balanced BST ops' },
  { notation: 'O(n)', name: 'Linear', examples: 'Single loop, linear scan, two pointers' },
  { notation: 'O(n log n)', name: 'Log-linear', examples: 'Merge sort, heap sort, sorting + scan' },
  { notation: 'O(n²)', name: 'Quadratic', examples: 'Nested loops, bubble sort, brute-force pairs' },
  { notation: 'O(n · m)', name: 'Two-dim', examples: 'DP on two strings/sequences' },
  { notation: 'O(2ⁿ)', name: 'Exponential', examples: 'All subsets (backtracking), Fibonacci naive' },
  { notation: 'O(n!)', name: 'Factorial', examples: 'All permutations, N-Queens brute force' },
];

export default function CheatsheetPage() {
  return (
    <div className="space-y-10 print:space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold text-zinc-100 print:text-black print:text-2xl">
          DSA Pattern Cheat Sheet
        </h1>
        <p className="text-sm text-zinc-400 mt-1 print:text-gray-600">
          Google L3/L4 prep · 21 patterns · Java templates
        </p>
        <p className="text-xs text-zinc-600 mt-2 print:hidden">
          <strong className="text-zinc-400">Tip:</strong> Use your browser&apos;s Print function (Cmd+P) to save as PDF.
        </p>
      </header>

      {/* Complexity quick-reference */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-3 print:text-black print:text-base pb-1 border-b border-zinc-800 print:border-gray-300">
          Complexity Quick Reference
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs text-zinc-500 print:text-gray-500">
              <th className="py-1.5 pr-4 font-medium">Notation</th>
              <th className="py-1.5 pr-4 font-medium">Name</th>
              <th className="py-1.5 font-medium">Typical examples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 print:divide-gray-200">
            {COMPLEXITY.map((row) => (
              <tr key={row.notation}>
                <td className="py-1.5 pr-4 font-mono text-emerald-400 print:text-green-700 whitespace-nowrap">
                  {row.notation}
                </td>
                <td className="py-1.5 pr-4 text-zinc-300 print:text-gray-800">{row.name}</td>
                <td className="py-1.5 text-zinc-500 print:text-gray-600">{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pattern cards */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-4 print:text-black print:text-base pb-1 border-b border-zinc-800 print:border-gray-300">
          Pattern Templates
        </h2>
        <div className="grid grid-cols-1 gap-6 print:gap-5 print:columns-2 print:block">
          {PATTERNS.map((p) => (
            <article
              key={p.name}
              className="rounded-lg bg-zinc-900 border border-zinc-800 p-4 print:rounded-none print:border print:border-gray-200 print:p-3 print:break-inside-avoid print:mb-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100 print:text-black mb-1">
                {p.name}
              </h3>
              <p className="text-xs text-emerald-400 print:text-green-700 mb-2">
                Signal: {p.signal}
              </p>
              <pre className="text-xs font-mono text-zinc-300 print:text-gray-800 bg-zinc-950 print:bg-gray-50 rounded p-3 overflow-x-auto whitespace-pre-wrap leading-5">
                {p.template}
              </pre>
              <p className="text-xs text-zinc-500 print:text-gray-500 mt-2">
                Problems: {p.example}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          aside { display: none !important; }
          main { margin-left: 0 !important; padding-top: 0 !important; }
          .max-w-\\[1100px\\] { max-width: none !important; }
          h1, h2, h3 { color: black !important; }
        }
      `}</style>
    </div>
  );
}
