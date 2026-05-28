'use client';

import Link from 'next/link';
import { startTransition, useEffect, useState } from 'react';
import { useAppState } from '@/hooks/useAppState';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { mustKnowUnsolved } from '@/lib/analytics';
import { defaultProgress } from '@/lib/storage';
import problems from '@/content/problems.json';
import type { Problem, UserProgress } from '@/types';
import { CalendarClock, CheckCircle2, ChevronRight, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const allProblems = problems as Problem[];

// ─── Helpers ────────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDueDate(dueAt: string): string {
  if (!dueAt) return '';
  const today = todayStr();
  if (dueAt === today) return 'Today';
  const tomorrow = (() => {
    const d = new Date(today + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  })();
  if (dueAt === tomorrow) return 'Tomorrow';
  const due = new Date(dueAt + 'T00:00:00Z');
  const now = new Date(today + 'T00:00:00Z');
  const diffDays = Math.round((due.getTime() - now.getTime()) / 86_400_000);
  if (diffDays > 0) return `In ${diffDays} day${diffDays === 1 ? '' : 's'}`;
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
}

function levelLabel(level: number): string {
  if (level === 1) return 'R1';
  if (level === 2) return 'R2';
  if (level === 3) return 'R3';
  return 'Done';
}

function levelColor(level: number): string {
  if (level === 1) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  if (level === 2) return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
  if (level === 3) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30';
}

// ─── Sub-component ──────────────────────────────────────────────────────────

interface ReviewRowProps {
  problem: Problem;
  progress: UserProgress;
  onGraduate: (id: string) => void;
  onToggleStar: (id: string) => void;
  isDue: boolean;
}

function ReviewRow({ problem, progress, onGraduate, onToggleStar, isDue }: ReviewRowProps) {
  const sched = progress.reviewSchedule;
  const level = sched?.level ?? 1;
  const isGraduated = level >= 4;

  return (
    <div
      className={cn(
        'relative flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors overflow-hidden',
        isDue
          ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
      )}
    >
      {/* Status stripe */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0 bottom-0 w-0.5',
          progress.status === 'solved' && 'bg-emerald-500',
          progress.status === 'attempted' && 'bg-amber-500',
          progress.status === 'needs_review' && 'bg-rose-500',
          progress.status === 'not_started' && 'bg-zinc-700',
        )}
      />
      {/* Star */}
      <button
        onClick={() => onToggleStar(problem.id)}
        className={cn(
          'shrink-0 transition-colors',
          progress.starred
            ? 'text-amber-400 hover:text-amber-300'
            : 'text-zinc-600 hover:text-zinc-400'
        )}
        aria-label={progress.starred ? 'Unstar problem' : 'Star problem'}
      >
        <Star className={cn('w-4 h-4', progress.starred && 'fill-amber-400')} />
      </button>

      {/* Problem link */}
      <Link
        href={`/problem/${problem.id}`}
        className="flex-1 min-w-0 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100 truncate">
            {problem.title}
          </span>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <StatusBadge status={progress.status} />
          <span className="text-xs text-zinc-600">Day {problem.day}</span>
        </div>
      </Link>

      {/* Level badge */}
      {sched && (
        <span
          className={cn(
            'shrink-0 text-xs font-medium px-2 py-0.5 rounded border',
            levelColor(level)
          )}
        >
          {levelLabel(level)}
        </span>
      )}

      {/* Due date */}
      {sched && !isGraduated && (
        <span
          className={cn(
            'shrink-0 text-xs',
            isDue ? 'text-amber-400' : 'text-zinc-500'
          )}
        >
          {formatDueDate(sched.dueAt)}
        </span>
      )}

      {/* Graduate button */}
      {isDue && !isGraduated && (
        <button
          onClick={() => onGraduate(problem.id)}
          className="shrink-0 flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 rounded-md px-2 py-1 transition-colors"
          title="Graduate: mark reviewed, advance schedule"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Graduate
        </button>
      )}

      {/* Arrow */}
      <Link href={`/problem/${problem.id}`} className="shrink-0 text-zinc-700 hover:text-zinc-400 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// ─── All-clear line ──────────────────────────────────────────────────────────

function AllClear() {
  return (
    <p className="text-sm text-emerald-500/70 flex items-center gap-1.5 py-1 pl-1">
      <CheckCircle2 className="w-3.5 h-3.5" />
      All clear ✓
    </p>
  );
}

// ─── Final Mode sections ─────────────────────────────────────────────────────

interface FinalModeSectionsProps {
  state: { progress: Record<string, UserProgress> };
  onGraduate: (id: string) => void;
  onToggleStar: (id: string) => void;
}

function FinalModeSections({ state, onGraduate, onToggleStar }: FinalModeSectionsProps) {
  const today = todayStr();

  const overdue: Problem[] = [];
  const dueToday: Problem[] = [];

  for (const problem of allProblems) {
    const prog = state.progress[problem.id];
    if (!prog?.reviewSchedule) continue;
    const sched = prog.reviewSchedule;
    if (sched.level >= 4) continue;
    if (sched.dueAt < today) {
      overdue.push(problem);
    } else if (sched.dueAt === today) {
      dueToday.push(problem);
    }
  }

  // Sort overdue oldest-first
  overdue.sort((a, b) => {
    const da = state.progress[a.id]?.reviewSchedule?.dueAt ?? '';
    const db = state.progress[b.id]?.reviewSchedule?.dueAt ?? '';
    return da.localeCompare(db);
  });

  const overdueIds = new Set(overdue.map((p) => p.id));
  const dueTodayIds = new Set(dueToday.map((p) => p.id));

  const mustKnowGaps = mustKnowUnsolved(state.progress, allProblems).filter(
    (p) => !overdueIds.has(p.id) && !dueTodayIds.has(p.id)
  );

  const listedIds = new Set([
    ...overdueIds,
    ...dueTodayIds,
    ...mustKnowGaps.map((p) => p.id),
  ]);

  const starredNeedsReview = allProblems
    .filter((p) => {
      if (listedIds.has(p.id)) return false;
      const prog = state.progress[p.id];
      if (!prog) return false;
      return prog.starred || prog.status === 'needs_review';
    })
    .sort((a, b) => a.day - b.day);

  return (
    <div className="space-y-8">
      {/* Overdue */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">🚨 Overdue</h2>
          {overdue.length > 0 && (
            <span className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-full px-2 py-0.5">
              {overdue.length}
            </span>
          )}
        </div>
        {overdue.length === 0 ? (
          <AllClear />
        ) : (
          <div className="space-y-2">
            {overdue.map((p) => (
              <ReviewRow
                key={p.id}
                problem={p}
                progress={state.progress[p.id] ?? defaultProgress(p.id)}
                onGraduate={onGraduate}
                onToggleStar={onToggleStar}
                isDue
              />
            ))}
          </div>
        )}
      </section>

      {/* Due Today */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">📅 Due Today</h2>
          {dueToday.length > 0 && (
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5">
              {dueToday.length}
            </span>
          )}
        </div>
        {dueToday.length === 0 ? (
          <AllClear />
        ) : (
          <div className="space-y-2">
            {dueToday.map((p) => (
              <ReviewRow
                key={p.id}
                problem={p}
                progress={state.progress[p.id] ?? defaultProgress(p.id)}
                onGraduate={onGraduate}
                onToggleStar={onToggleStar}
                isDue
              />
            ))}
          </div>
        )}
      </section>

      {/* Must-Know Gaps */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">⚡ Must-Know Gaps</h2>
          {mustKnowGaps.length > 0 && (
            <span className="text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-2 py-0.5">
              {mustKnowGaps.length}
            </span>
          )}
        </div>
        {mustKnowGaps.length === 0 ? (
          <AllClear />
        ) : (
          <div className="space-y-2">
            {mustKnowGaps.map((p) => (
              <ReviewRow
                key={p.id}
                problem={p}
                progress={state.progress[p.id] ?? defaultProgress(p.id)}
                onGraduate={onGraduate}
                onToggleStar={onToggleStar}
                isDue={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Starred + Needs Review */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">⭐ Starred + Needs Review</h2>
          {starredNeedsReview.length > 0 && (
            <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5">
              {starredNeedsReview.length}
            </span>
          )}
        </div>
        {starredNeedsReview.length === 0 ? (
          <AllClear />
        ) : (
          <div className="space-y-2">
            {starredNeedsReview.map((p) => (
              <ReviewRow
                key={p.id}
                problem={p}
                progress={state.progress[p.id] ?? defaultProgress(p.id)}
                onGraduate={onGraduate}
                onToggleStar={onToggleStar}
                isDue={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ReviewPageClient() {
  const { state, graduateReview, toggleStar } = useAppState();
  const [finalMode, setFinalMode] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setFinalMode(localStorage.getItem('dsa-prep-final-mode') === 'true');
    });
  }, []);

  const toggleFinalMode = () => {
    setFinalMode((prev) => {
      const next = !prev;
      localStorage.setItem('dsa-prep-final-mode', String(next));
      return next;
    });
  };

  const today = todayStr();

  // ── Normal mode data ────────────────────────────────────────────────────
  const dueToday: Problem[] = [];
  const upcoming: Problem[] = [];
  const starredNoSchedule: Problem[] = [];
  const graduated: Problem[] = [];

  for (const problem of allProblems) {
    const prog = state.progress[problem.id];
    if (!prog) continue;

    const sched = prog.reviewSchedule;
    if (sched) {
      if (sched.level >= 4) {
        graduated.push(problem);
      } else if (sched.dueAt <= today) {
        dueToday.push(problem);
      } else {
        upcoming.push(problem);
      }
    } else if (prog.starred) {
      starredNoSchedule.push(problem);
    }
  }

  upcoming.sort((a, b) => {
    const da = state.progress[a.id]?.reviewSchedule?.dueAt ?? '';
    const db = state.progress[b.id]?.reviewSchedule?.dueAt ?? '';
    return da.localeCompare(db);
  });

  const totalActive = dueToday.length + upcoming.length;

  const emptyAll =
    dueToday.length === 0 &&
    upcoming.length === 0 &&
    starredNoSchedule.length === 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-emerald-400" />
            Spaced Repetition Review
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {finalMode
              ? 'Final Mode — priority view for the last days before your interview.'
              : totalActive > 0
              ? `${dueToday.length} due today · ${upcoming.length} upcoming`
              : 'No reviews scheduled. Star a problem or mark it for review to start.'}
          </p>
        </div>

        {/* Final Mode toggle */}
        <button
          onClick={toggleFinalMode}
          className={cn(
            'shrink-0 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
            finalMode
              ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/15'
              : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
          )}
        >
          <Zap className={cn('w-3.5 h-3.5', finalMode && 'fill-amber-400')} />
          {finalMode ? 'Final Mode ON' : 'Final Mode'}
        </button>
      </div>

      {finalMode ? (
        <FinalModeSections
          state={state}
          onGraduate={graduateReview}
          onToggleStar={toggleStar}
        />
      ) : (
        <>
          {/* How it works */}
          <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 border-dashed p-4">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">How spaced repetition works</p>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 flex items-center justify-center font-medium">R1</span>
                Star or mark needs-review → due in 1 day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded border border-sky-500/30 bg-sky-500/10 text-sky-400 flex items-center justify-center font-medium">R2</span>
                Graduate R1 → due in 3 days
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-medium">R3</span>
                Graduate R2 → due in 7 days
              </span>
              <span className="text-zinc-600">Graduate R3 → fully mastered 🎓</span>
            </div>
          </div>

          {/* Empty state */}
          {emptyAll && (
            <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-12 text-center">
              <Star className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium">No reviews scheduled yet</p>
              <p className="text-sm text-zinc-600 mt-1">
                Star a problem or mark it as &ldquo;needs review&rdquo; from its detail page to add it to your spaced-rep queue.
              </p>
            </div>
          )}

          {/* Due Today */}
          {dueToday.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-zinc-100">Due Today</h2>
                <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5">
                  {dueToday.length}
                </span>
              </div>
              <div className="space-y-2">
                {dueToday.map((p) => (
                  <ReviewRow
                    key={p.id}
                    problem={p}
                    progress={state.progress[p.id] ?? defaultProgress(p.id)}
                    onGraduate={graduateReview}
                    onToggleStar={toggleStar}
                    isDue
                  />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-zinc-100">Upcoming</h2>
              <div className="space-y-2">
                {upcoming.map((p) => (
                  <ReviewRow
                    key={p.id}
                    problem={p}
                    progress={state.progress[p.id] ?? defaultProgress(p.id)}
                    onGraduate={graduateReview}
                    onToggleStar={toggleStar}
                    isDue={false}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Starred without schedule */}
          {starredNoSchedule.length > 0 && (
            <section className="space-y-3">
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">Starred (no review scheduled)</h2>
                <p className="text-xs text-zinc-600 mt-0.5">
                  These were starred before spaced repetition was enabled. Un-star and re-star to schedule them.
                </p>
              </div>
              <div className="space-y-2">
                {starredNoSchedule.map((p) => {
                  const prog = state.progress[p.id]!;
                  return (
                    <ReviewRow
                      key={p.id}
                      problem={p}
                      progress={prog}
                      onGraduate={graduateReview}
                      onToggleStar={toggleStar}
                      isDue={false}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Graduated */}
          {graduated.length > 0 && (
            <section className="space-y-3">
              <div>
                <h2 className="text-sm font-semibold text-zinc-500 flex items-center gap-2">
                  Mastered
                  <span className="text-xs text-zinc-600">({graduated.length})</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                {graduated.map((p) => {
                  const prog = state.progress[p.id]!;
                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-lg border border-zinc-800/60 px-4 py-2.5 opacity-60"
                    >
                      <span className="text-emerald-500 shrink-0">🎓</span>
                      <Link href={`/problem/${p.id}`} className="flex-1 min-w-0">
                        <span className="text-sm text-zinc-400 hover:text-zinc-200 truncate block">
                          {p.title}
                        </span>
                      </Link>
                      <StatusBadge status={prog.status} />
                      <DifficultyBadge difficulty={p.difficulty} />
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
