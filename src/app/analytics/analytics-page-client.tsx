'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { BarChart2, CheckCircle2, Clock, ExternalLink, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  daySolveRates,
  mustKnowUnsolved,
  patternSolveRates,
  readinessScore,
  slowProblems,
  studyStreak,
  weakPatterns,
} from '@/lib/analytics';
import { useAppState } from '@/hooks/useAppState';
import type { Difficulty, Pattern, Problem } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PATTERN_LABELS: Record<Pattern, string> = {
  two_pointers:    'Two Pointers',
  sliding_window:  'Sliding Window',
  prefix_sum:      'Prefix Sum',
  hashing:         'Hashing',
  linked_list:     'Linked List',
  stack_monotonic: 'Mono Stack',
  queue_bfs:       'Queue / BFS',
  tree_dfs:        'Tree DFS',
  tree_bfs:        'Tree BFS',
  bst:             'BST',
  trie:            'Trie',
  heap:            'Heap',
  graph_dfs:       'Graph DFS',
  graph_bfs:       'Graph BFS',
  topo_sort:       'Topo Sort',
  union_find:      'Union-Find',
  binary_search:   'Binary Search',
  backtracking:    'Backtracking',
  bit_manipulation:'Bit Manip.',
  dp_1d:           'DP 1D',
  dp_2d:           'DP 2D',
  greedy:          'Greedy',
  intervals:       'Intervals',
  kadane:          'Kadane',
};

const DIFF_COLORS: Record<Difficulty, string> = {
  Easy:   'text-emerald-400',
  Medium: 'text-amber-400',
  Hard:   'text-rose-400',
};

function formatMinutes(seconds: number): string {
  if (seconds < 60) return '<1m';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// ─── Score ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const color =
    score < 40  ? { ring: 'oklch(0.65 0.22 25)', text: 'var(--c-rose-text)' }
    : score <= 70 ? { ring: 'oklch(0.78 0.18 65)', text: 'var(--c-amber-text)' }
    : { ring: 'oklch(0.65 0.18 158)', text: 'var(--c-emerald-text)' };

  const r = 52;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;
  const gap  = circumference - dash;

  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="oklch(0.16 0.015 275)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke={color.ring}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tabular-nums" style={{ color: color.text }}>
          {score}
        </span>
        <span className="text-[10px] font-medium" style={{ color: 'var(--c-text-4)' }}>/ 100</span>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-4)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

// ─── Day badge ────────────────────────────────────────────────────────────────

function DayBadge({ day }: { day: number }) {
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
      style={{ background: 'var(--c-violet-bg)', color: 'var(--c-violet-text)', border: '1px solid var(--c-violet-border)' }}
    >
      Day {day}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  problems: Problem[];
}

export default function AnalyticsPageClient({ problems }: Props) {
  const { state } = useAppState();
  const { progress } = state;

  // ── Derived analytics ──────────────────────────────────────────────────────

  const score      = useMemo(() => readinessScore(progress, problems), [progress, problems]);
  const mustGaps   = useMemo(() => mustKnowUnsolved(progress, problems), [progress, problems]);
  const dayRates   = useMemo(() => daySolveRates(progress, problems), [progress, problems]);
  const slow       = useMemo(() => slowProblems(progress, problems), [progress, problems]);
  const weak       = useMemo(() => weakPatterns(progress, problems), [progress, problems]);

  const patternRates = useMemo(() => patternSolveRates(progress, problems), [progress, problems]);
  const streak       = useMemo(() => studyStreak(progress), [progress]);

  // Must-know totals
  const mustKnowTotal  = problems.filter((p) => p.mustKnow).length;
  const mustKnowSolved = mustKnowTotal - mustGaps.length;

  // Overall totals
  const totalSolved = problems.filter((p) => progress[p.id]?.status === 'solved').length;

  // Sort must-know gaps by day
  const sortedGaps = useMemo(
    () => [...mustGaps].sort((a, b) => a.day - b.day),
    [mustGaps]
  );

  // Pattern heatmap — all 24 patterns sorted weakest first
  const allPatterns = Object.keys(PATTERN_LABELS) as Pattern[];
  const sortedPatterns = useMemo(() => {
    return [...allPatterns].sort((a, b) => {
      const ra = patternRates[a]?.rate ?? 0;
      const rb = patternRates[b]?.rate ?? 0;
      return ra - rb;
    });
  }, [patternRates, allPatterns]);

  // ── Recommendations ──────────────────────────────────────────────────────

  const recommendations = useMemo(() => {
    const recs: string[] = [];
    if (weak.length > 0) {
      const top = PATTERN_LABELS[weak[0]];
      const pct = Math.round((patternRates[weak[0]]?.rate ?? 0) * 100);
      recs.push(`Drill ${top} in the Pattern Trainer — only ${pct}% solved.`);
    }
    if (mustGaps.length > 0) {
      recs.push(`${mustGaps.length} must-know problem${mustGaps.length > 1 ? 's' : ''} still unsolved — prioritize these.`);
    }
    if (streak < 3) {
      recs.push(`Build your streak — you've practiced ${streak} consecutive day${streak !== 1 ? 's' : ''}. Aim for 3+.`);
    }
    return recs;
  }, [weak, mustGaps, streak, patternRates]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-[900px] mx-auto space-y-10 pb-12">

      {/* Page header */}
      <div className="flex items-center gap-2.5 pt-1">
        <BarChart2 className="w-6 h-6" style={{ color: 'var(--c-violet-text)' }} />
        <h1 className="text-2xl font-bold" style={{ color: 'var(--c-text-1)' }}>
          Readiness Analytics
        </h1>
      </div>

      {/* ── Readiness Score card ────────────────────────────────────────────── */}
      <Section title="Readiness Score">
        <div
          className="rounded-xl p-6 flex items-center gap-8"
          style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}
        >
          <ScoreRing score={score} />

          <div className="flex-1 space-y-4">
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
              Based on must-know coverage and overall progress.
            </p>
            <div className="flex flex-col gap-2">
              <StatRow
                label="Must-know"
                value={`${mustKnowSolved} / ${mustKnowTotal} solved`}
                pct={mustKnowTotal > 0 ? mustKnowSolved / mustKnowTotal : 0}
                color="var(--c-violet)"
              />
              <StatRow
                label="Overall"
                value={`${totalSolved} / ${problems.length} solved`}
                pct={problems.length > 0 ? totalSolved / problems.length : 0}
                color="var(--c-emerald-text)"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Must-know gaps ──────────────────────────────────────────────────── */}
      <Section title={`Must-Know Gaps (${mustGaps.length} remaining)`}>
        {sortedGaps.length === 0 ? (
          <div
            className="rounded-xl p-5 flex items-center gap-3"
            style={{ background: 'var(--c-emerald-bg)', border: '1px solid var(--c-emerald-border)' }}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--c-emerald-text)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--c-emerald-text)' }}>
              All must-know problems solved — you&apos;re ready on the fundamentals.
            </p>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--c-border)' }}
          >
            {sortedGaps.map((p, i) => (
              <div
                key={p.id}
                className={cn('flex items-center gap-3 px-4 py-3 text-sm')}
                style={i < sortedGaps.length - 1 ? { borderBottom: '1px solid var(--c-border-dim)' } : {}}
              >
                <DayBadge day={p.day} />
                <span className={cn('text-xs font-medium w-10 shrink-0', DIFF_COLORS[p.difficulty])}>
                  {p.difficulty}
                </span>
                <Link
                  href={`/problem/${p.id}`}
                  className="flex-1 truncate hover:underline"
                  style={{ color: 'var(--c-text-2)' }}
                >
                  {p.title}
                </Link>
                <Link
                  href={p.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                  style={{ color: 'var(--c-text-4)' }}
                  aria-label={`Open ${p.title} on LeetCode`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── Pattern heatmap ─────────────────────────────────────────────────── */}
      <Section title="Pattern Coverage">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sortedPatterns.map((pat) => {
            const entry = patternRates[pat] ?? { solved: 0, total: 0, rate: 0 };
            const pct = Math.round(entry.rate * 100);
            const bgStyle =
              entry.rate < 0.4
                ? { background: 'var(--c-rose-bg)', border: '1px solid var(--c-rose-border)' }
                : entry.rate <= 0.75
                ? { background: 'var(--c-amber-bg)', border: '1px solid var(--c-amber-border)' }
                : { background: 'var(--c-emerald-bg)', border: '1px solid var(--c-emerald-border)' };
            const textColor =
              entry.rate < 0.4
                ? 'var(--c-rose-text)'
                : entry.rate <= 0.75
                ? 'var(--c-amber-text)'
                : 'var(--c-emerald-text)';

            return (
              <div key={pat} className="rounded-lg p-3 space-y-2" style={bgStyle}>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-medium truncate" style={{ color: 'var(--c-text-2)' }}>
                    {PATTERN_LABELS[pat]}
                  </span>
                  <span className="text-[11px] font-bold tabular-nums shrink-0" style={{ color: textColor }}>
                    {pct}%
                  </span>
                </div>
                {/* Bar */}
                <div className="h-1.5 rounded-full" style={{ background: 'oklch(0.16 0.015 275)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: textColor }}
                  />
                </div>
                <p className="text-[10px]" style={{ color: 'var(--c-text-4)' }}>
                  {entry.solved}/{entry.total}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Day breakdown ───────────────────────────────────────────────────── */}
      <Section title="Day Breakdown">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--c-border)' }}
        >
          {[1, 2, 3, 4, 5, 6].map((day, i) => {
            const entry = dayRates[day] ?? { solved: 0, total: 0, rate: 0 };
            const pct = Math.round(entry.rate * 100);
            const barColor =
              entry.rate < 0.4
                ? 'var(--c-rose-text)'
                : entry.rate <= 0.75
                ? 'var(--c-amber-text)'
                : 'var(--c-emerald-text)';

            return (
              <div
                key={day}
                className="flex items-center gap-4 px-4 py-3 text-sm"
                style={i < 5 ? { borderBottom: '1px solid var(--c-border-dim)' } : {}}
              >
                <span className="w-12 shrink-0 text-xs font-medium" style={{ color: 'var(--c-text-3)' }}>
                  Day {day}
                </span>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--c-progress-track)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: barColor }}
                  />
                </div>
                <span className="w-20 text-right text-xs tabular-nums" style={{ color: 'var(--c-text-3)' }}>
                  {entry.solved}/{entry.total} solved
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Slow problems ───────────────────────────────────────────────────── */}
      <Section title="Problems That Took >40 Minutes (unsolved)">
        {slow.length === 0 ? (
          <div
            className="rounded-xl p-4 text-sm text-center"
            style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-text-4)' }}
          >
            No slow unsolved problems.
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--c-border)' }}
          >
            {slow.map((p, i) => {
              const prog = progress[p.id];
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-4 py-3 text-sm"
                  style={i < slow.length - 1 ? { borderBottom: '1px solid var(--c-border-dim)' } : {}}
                >
                  <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--c-rose-text)' }} />
                  <Link
                    href={`/problem/${p.id}`}
                    className="flex-1 truncate hover:underline"
                    style={{ color: 'var(--c-text-2)' }}
                  >
                    {p.title}
                  </Link>
                  <span className="text-xs tabular-nums shrink-0" style={{ color: 'var(--c-rose-text)' }}>
                    {formatMinutes(prog?.timeSpentSeconds ?? 0)}
                  </span>
                  <Link
                    href={`/problem/${p.id}`}
                    className="shrink-0"
                    style={{ color: 'var(--c-text-4)' }}
                    aria-label={`Go to ${p.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* ── Recommendations ─────────────────────────────────────────────────── */}
      <Section title="Recommendations">
        <div
          className="rounded-xl p-5 space-y-3"
          style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}
        >
          {recommendations.length === 0 ? (
            <div className="flex items-start gap-3">
              <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--c-emerald-text)' }} />
              <p className="text-sm" style={{ color: 'var(--c-text-2)' }}>
                Looking strong! Review starred problems and polish your behavioral stories.
              </p>
            </div>
          ) : (
            recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--c-violet-text)' }} />
                <p className="text-sm" style={{ color: 'var(--c-text-2)' }}>{rec}</p>
              </div>
            ))
          )}
        </div>
      </Section>

    </div>
  );
}

// ─── StatRow ──────────────────────────────────────────────────────────────────

function StatRow({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span style={{ color: 'var(--c-text-3)' }}>{label}</span>
        <span style={{ color: 'var(--c-text-2)' }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'var(--c-progress-track)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.round(pct * 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}
