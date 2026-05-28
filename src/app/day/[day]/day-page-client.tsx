'use client';

import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/hooks/useAppState';
import { ProblemCard } from '@/components/ProblemCard';
import { ProgressBar } from '@/components/ProgressBar';
import { defaultProgress } from '@/lib/storage';
import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const allProblems = problems as Problem[];

const DAY_LABELS: Record<number, string> = {
  1: 'Arrays & Strings',
  2: 'Hashing & Lists & Stacks',
  3: 'Trees & Tries',
  4: 'Heaps & Graphs',
  5: 'Search & Backtracking & Bits',
  6: 'DP & Greedy & Intervals',
};

function isTypingTarget(e: KeyboardEvent): boolean {
  const el = e.target as HTMLElement;
  const tag = el?.tagName?.toLowerCase();
  return tag === 'input' || tag === 'textarea' || el?.isContentEditable === true || !!el?.closest('.monaco-editor');
}

interface DayPageClientProps {
  day: 1 | 2 | 3 | 4 | 5 | 6;
}

// Memoised row avoids re-rendering on unrelated state changes
const ProblemRow = memo(ProblemCard);

export default function DayPageClient({ day }: DayPageClientProps) {
  const { state, toggleStar } = useAppState();
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const dayProblems = useMemo(
    () => allProblems.filter((p) => p.day === day),
    [day]
  );

  const solved = useMemo(
    () => dayProblems.filter((p) => (state.progress[p.id]?.status ?? 'not_started') === 'solved').length,
    [dayProblems, state.progress]
  );

  const pct = dayProblems.length > 0 ? Math.round((solved / dayProblems.length) * 100) : 0;

  const groups = useMemo(() => {
    const g: Record<string, Problem[]> = {};
    for (const p of dayProblems) {
      if (!g[p.topicGroup]) g[p.topicGroup] = [];
      g[p.topicGroup].push(p);
    }
    return g;
  }, [dayProblems]);

  // j/k navigation + Enter to open
  const handleToggleStar = useCallback(
    (id: string) => toggleStar(id),
    [toggleStar]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'j') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, dayProblems.length - 1));
      } else if (e.key === 'k') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        const p = dayProblems[focusedIndex];
        if (p) router.push(`/problem/${p.id}`);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dayProblems, focusedIndex, router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
          <Link href="/" className="hover:text-zinc-300">Dashboard</Link>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-300">Day {day}</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">
              Day {day} — {DAY_LABELS[day]}
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {dayProblems.length} problems · {solved} solved
            </p>
          </div>
          <div className="flex items-center gap-2">
            {day > 1 && (
              <Link
                href={`/day/${day - 1}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Day {day - 1}
              </Link>
            )}
            {day < 6 && (
              <Link
                href={`/day/${day + 1}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500"
              >
                Day {day + 1}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar value={pct} label={`${solved} / ${dayProblems.length} solved`} showPercent />

      {/* Problem groups */}
      {Object.entries(groups).map(([group, groupProblems]) => (
        <section key={group} className="space-y-2" aria-label={group}>
          <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-1">
            {group}
          </h2>
          <div className="space-y-1.5" role="list">
            {groupProblems.map((p) => {
              const globalIndex = dayProblems.indexOf(p);
              const isFocused = focusedIndex === globalIndex;
              return (
                <div
                  key={p.id}
                  role="listitem"
                  className={isFocused ? 'ring-2 ring-emerald-500/50 rounded-lg' : undefined}
                >
                  <ProblemRow
                    problem={p}
                    progress={state.progress[p.id] ?? defaultProgress(p.id)}
                    onToggleStar={handleToggleStar}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {dayProblems.length === 0 && (
        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-12 text-center">
          <p className="text-zinc-500">No problems for this day yet.</p>
        </div>
      )}

      {focusedIndex >= 0 && (
        <p className="text-xs text-zinc-600 text-center">
          j/k to navigate · Enter to open · press any other key to dismiss
        </p>
      )}
    </div>
  );
}
