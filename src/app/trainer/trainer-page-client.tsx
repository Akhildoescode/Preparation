'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Brain, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Pattern } from '@/types';
import type { TrainerProblem } from './page';

// ─── Pattern metadata (reuse from PatternTag) ─────────────────────────────────

const PATTERN_LABELS: Record<Pattern, string> = {
  two_pointers:     'Two Pointers',
  sliding_window:   'Sliding Window',
  prefix_sum:       'Prefix Sum',
  hashing:          'Hashing',
  linked_list:      'Linked List',
  stack_monotonic:  'Monotonic Stack',
  queue_bfs:        'Queue/BFS',
  tree_dfs:         'Tree DFS',
  tree_bfs:         'Tree BFS',
  bst:              'BST',
  trie:             'Trie',
  heap:             'Heap',
  graph_dfs:        'Graph DFS',
  graph_bfs:        'Graph BFS',
  topo_sort:        'Topo Sort',
  union_find:       'Union Find',
  binary_search:    'Binary Search',
  backtracking:     'Backtracking',
  bit_manipulation: 'Bit Manipulation',
  dp_1d:            '1D DP',
  dp_2d:            '2D DP',
  greedy:           'Greedy',
  intervals:        'Intervals',
  kadane:           "Kadane's",
};

const ALL_PATTERNS = Object.keys(PATTERN_LABELS) as Pattern[];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Returns true only if selected set exactly matches correct set. */
function isExactMatch(selected: Pattern[], correct: string[]): boolean {
  if (selected.length !== correct.length) return false;
  const correctSet = new Set(correct);
  return selected.every((p) => correctSet.has(p));
}

// ─── Types ───────────────────────────────────────────────────────────────────

type TrainerPhase = 'welcome' | 'question' | 'revealed' | 'done';

interface Score {
  correct: number;
  total: number;
}

// ─── Main component ───────────────────────────────────────────────────────────

interface TrainerPageClientProps {
  problems: TrainerProblem[];
}

export default function TrainerPageClient({ problems }: TrainerPageClientProps) {
  const [phase, setPhase] = useState<TrainerPhase>('welcome');
  const [queue, setQueue] = useState<TrainerProblem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<Pattern[]>([]);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  const current = queue[currentIdx] ?? null;
  const isLast = currentIdx >= queue.length - 1;

  // ── Start session ──
  const handleStart = useCallback(() => {
    const shuffled = shuffle(problems);
    setQueue(shuffled);
    setCurrentIdx(0);
    setSelected([]);
    setScore({ correct: 0, total: 0 });
    setPhase('question');
  }, [problems]);

  // ── Toggle a pattern selection ──
  const togglePattern = useCallback((p: Pattern) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }, []);

  // ── Submit answer ──
  const handleSubmit = useCallback(() => {
    if (!current || selected.length === 0) return;
    const isCorrect = isExactMatch(selected, current.patterns);
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setPhase('revealed');
  }, [current, selected]);

  // ── Advance to next problem ──
  const handleNext = useCallback(() => {
    if (isLast) {
      setPhase('done');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected([]);
      setPhase('question');
    }
  }, [isLast]);

  // ── Correct/incorrect analysis (computed once after submit) ──
  const analysis = useMemo(() => {
    if (!current) return null;
    const correctSet = new Set(current.patterns);
    const selectedSet = new Set(selected);
    return {
      correct: current.patterns as Pattern[],
      missed: (current.patterns as Pattern[]).filter((p) => !selectedSet.has(p)),
      extra: selected.filter((p) => !correctSet.has(p)),
    };
  }, [current, selected]);

  // ─── Welcome screen ───────────────────────────────────────────────────────

  if (phase === 'welcome') {
    return (
      <div className="max-w-lg mx-auto space-y-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-semibold text-zinc-100">Pattern Trainer</h1>
          </div>
          <p className="text-zinc-500 text-sm">
            Each round shows a problem title and description. You identify which pattern(s) apply.
            {' '}The session cycles through {problems.length} problems without repeats.
          </p>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">How it works</p>
            <ul className="space-y-1.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">1.</span>
                Read the problem title and description.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">2.</span>
                Select all patterns that apply (multi-select).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">3.</span>
                Submit to see the correct answer and your score.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">4.</span>
                Advance through the queue — no repeats in a session.
              </li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
          >
            Start Training Session
          </button>
        </div>
      </div>
    );
  }

  // ─── Session done ─────────────────────────────────────────────────────────

  if (phase === 'done') {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-semibold text-zinc-100">Session Complete</h1>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-8 text-center space-y-4">
          <div className="text-6xl font-bold text-emerald-400">{pct}%</div>
          <p className="text-zinc-400 text-sm">
            {score.correct} of {score.total} exact matches
          </p>
          <p className="text-xs text-zinc-600">
            An exact match means you identified all patterns and no extras.
          </p>
          {pct >= 80 && (
            <p className="text-emerald-400 text-sm font-medium">
              Excellent pattern recognition! 🎉
            </p>
          )}
          {pct >= 50 && pct < 80 && (
            <p className="text-amber-400 text-sm font-medium">
              Good progress — review the ones you missed.
            </p>
          )}
          {pct < 50 && (
            <p className="text-rose-400 text-sm font-medium">
              Keep practicing — pattern recognition comes with repetition.
            </p>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Session
        </button>
      </div>
    );
  }

  // ─── Question / Revealed ──────────────────────────────────────────────────

  if (!current) return null;

  const isRevealed = phase === 'revealed';
  const wasExact = isRevealed && analysis ? analysis.missed.length === 0 && analysis.extra.length === 0 : false;

  return (
    <div className="max-w-2xl mx-auto space-y-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-400" />
          <h1 className="text-lg font-semibold text-zinc-100">Pattern Trainer</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-500">
            Problem {currentIdx + 1} of {queue.length}
          </span>
          {score.total > 0 && (
            <span className="text-emerald-400 font-medium tabular-nums">
              {score.correct}/{score.total}
            </span>
          )}
        </div>
      </div>

      {/* Problem card */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-100">{current.title}</h2>
          <span className="text-xs text-zinc-600 shrink-0">Day {current.day}</span>
        </div>
        {current.statement ? (
          <p className="text-sm text-zinc-400 leading-relaxed">{current.statement}</p>
        ) : (
          <p className="text-sm text-zinc-600 italic">
            No description available — identify the pattern from the title.
          </p>
        )}
      </div>

      {/* Pattern grid */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          Which pattern(s) apply? Select all that fit.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {ALL_PATTERNS.map((p) => {
            const isSelected = selected.includes(p);
            const isCorrectPattern = current.patterns.includes(p);

            // After reveal: color-code the buttons
            let revealStyle = '';
            if (isRevealed && isCorrectPattern && isSelected)  revealStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
            else if (isRevealed && isCorrectPattern && !isSelected) revealStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/30';
            else if (isRevealed && !isCorrectPattern && isSelected)  revealStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
            else if (isRevealed) revealStyle = 'border-zinc-800 text-zinc-700';

            return (
              <button
                key={p}
                onClick={() => !isRevealed && togglePattern(p)}
                disabled={isRevealed}
                className={cn(
                  'px-2.5 py-2 rounded-lg border text-xs font-medium transition-colors text-left',
                  isRevealed
                    ? revealStyle
                    : isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200',
                )}
              >
                {PATTERN_LABELS[p]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reveal panel */}
      {isRevealed && analysis && (
        <div className={cn(
          'rounded-lg border p-5 space-y-3',
          wasExact
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-zinc-900 border-zinc-800'
        )}>
          <div className="flex items-center gap-2">
            {wasExact ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-300">Not quite</span>
              </>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-zinc-500">Correct patterns: </span>
              <span className="text-zinc-200">
                {analysis.correct.map((p) => PATTERN_LABELS[p]).join(', ')}
              </span>
            </div>
            {analysis.missed.length > 0 && (
              <div>
                <span className="text-amber-500">Missed: </span>
                <span className="text-amber-400">
                  {analysis.missed.map((p) => PATTERN_LABELS[p]).join(', ')}
                </span>
              </div>
            )}
            {analysis.extra.length > 0 && (
              <div>
                <span className="text-rose-500">Extras: </span>
                <span className="text-rose-400">
                  {analysis.extra.map((p) => PATTERN_LABELS[p]).join(', ')}
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/problem/${current.id}`}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 underline-offset-2 hover:underline transition-colors"
          >
            Study full guide for {current.title} →
          </Link>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!isRevealed ? (
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-semibold text-sm transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-sm transition-colors"
          >
            {isLast ? 'Finish Session' : 'Next Problem →'}
          </button>
        )}
        <button
          onClick={handleStart}
          title="Restart session"
          className="px-3 py-2 rounded-lg border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
