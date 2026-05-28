export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Status = 'not_started' | 'attempted' | 'solved' | 'needs_review';

export type Pattern =
  | 'two_pointers' | 'sliding_window' | 'prefix_sum' | 'hashing'
  | 'linked_list' | 'stack_monotonic' | 'queue_bfs'
  | 'tree_dfs' | 'tree_bfs' | 'bst' | 'trie'
  | 'heap' | 'graph_dfs' | 'graph_bfs' | 'topo_sort' | 'union_find'
  | 'binary_search' | 'backtracking' | 'bit_manipulation'
  | 'dp_1d' | 'dp_2d' | 'greedy' | 'intervals' | 'kadane';

export interface Problem {
  id: string;
  leetcodeId: number;
  title: string;
  difficulty: Difficulty;
  patterns: Pattern[];
  day: 1 | 2 | 3 | 4 | 5 | 6;
  topicGroup: string;
  leetcodeUrl: string;
  estimatedMinutes: number;
  mustKnow: boolean;
  hasFullContent: boolean;
}

export interface ProblemContent {
  problemStatement: string;
  approach: string;
  interviewerScript: string;
  solution: string;
  edgeCases: string;
  complexity: { time: string; space: string };
  relatedPatterns: string;
}

export interface ReviewSchedule {
  /** ISO date string YYYY-MM-DD indicating when the next review is due. */
  dueAt: string;
  /**
   * Which stage in the spaced-rep ladder:
   *   1 = first review (+1 day from first mark)
   *   2 = second review (+3 days from first graduation)
   *   3 = third review (+7 days from second graduation)
   *   4 = fully graduated — no more scheduled reviews
   */
  level: number;
}

export interface UserProgress {
  problemId: string;
  status: Status;
  attempts: number;
  timeSpentSeconds: number;
  confidenceRating: 1 | 2 | 3 | 4 | 5 | null;
  starred: boolean;
  lastAttemptedAt: string | null;
  solvedAt: string | null;
  personalNotes: string;
  userCode: string;
  /** Spaced-repetition schedule. null = never scheduled. */
  reviewSchedule: ReviewSchedule | null;
}

export interface DailyCheckIn {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  date: string;
  whatClicked: string;
  whatDidnt: string;
  tomorrowsFocus: string;
}

export type GoogleCompetency =
  | 'leadership'
  | 'problem_solving'
  | 'communication'
  | 'collaboration'
  | 'adaptability'
  | 'googleyness';

export interface BehavioralQuestion {
  id: string;
  question: string;
  competency: GoogleCompetency;
  tip: string;
  followUps: string[];
}

export interface BehavioralStory {
  questionId: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  reflections: string;
  lastEditedAt: string;
}

export type SystemDesignDifficulty = 'Foundational' | 'Intermediate' | 'Advanced';

export interface SystemDesignTopic {
  id: string;
  title: string;
  difficulty: SystemDesignDifficulty;
  googleRelevance: string;
  tags: string[];
}

export interface AppState {
  progress: Record<string, UserProgress>;
  checkIns: DailyCheckIn[];
  currentDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  startedAt: string | null;
  recentlyViewed: string[];
  behavioralStories: Record<string, BehavioralStory>;
}
