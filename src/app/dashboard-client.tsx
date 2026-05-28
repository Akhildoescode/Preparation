'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppState } from '@/hooks/useAppState';
import { DashboardStats } from '@/components/DashboardStats';
import { ProgressBar } from '@/components/ProgressBar';
import { ProblemCard } from '@/components/ProblemCard';
import { DailyCheckInForm } from '@/components/DailyCheckInForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  currentStreak,
  overallPercent,
  perDayStats,
  solvedCount,
  starredProblems,
} from '@/lib/progress';
import problems from '@/content/problems.json';
import type { Problem } from '@/types';
import { ArrowRight, CalendarDays, ChevronDown, ChevronUp, ClipboardCheck, History, Sparkles } from 'lucide-react';

const allProblems = problems as Problem[];

const DAY_LABELS: Record<number, string> = {
  1: 'Arrays & Strings',
  2: 'Hashing & Lists & Stacks',
  3: 'Trees & Tries',
  4: 'Heaps & Graphs',
  5: 'Search & Backtracking & Bits',
  6: 'DP & Greedy & Intervals',
};

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div
          className="w-1 h-4 rounded-full"
          style={{ background: `linear-gradient(to bottom, var(--c-section-bar-from), var(--c-section-bar-to))` }}
          aria-hidden="true"
        />
        <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--c-text-2)' }}>
          {icon}
          {title}
        </span>
      </div>
      {action}
    </div>
  );
}

export default function Dashboard() {
  const { state, toggleStar, addCheckIn } = useAppState();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [expandedCheckIns, setExpandedCheckIns] = useState<Set<number>>(new Set());

  const totalSolved   = solvedCount(state, allProblems);
  const totalStarred  = starredProblems(state, allProblems).length;
  const streak        = currentStreak(state);
  const percent       = overallPercent(state, allProblems);
  const dayStats      = perDayStats(state, allProblems);
  const currentDay    = state.currentDay;

  const todayProblems = allProblems
    .filter((p) => p.day === currentDay && (state.progress[p.id]?.status ?? 'not_started') !== 'solved')
    .slice(0, 5);

  const startedDate = state.startedAt
    ? new Date(state.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  const sortedCheckIns = [...state.checkIns].sort((a, b) => b.day - a.day);

  const toggleCheckIn = (day: number) => {
    setExpandedCheckIns((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day); else next.add(day);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{
                background: `linear-gradient(135deg, var(--c-hero-grad-from) 0%, var(--c-hero-grad-to) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Day {currentDay}
            </h1>
            <span className="text-base font-medium" style={{ color: 'var(--c-text-4)' }}>of 7</span>
            <span
              className="hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
              style={{
                background: 'var(--c-violet-bg)',
                color: 'var(--c-violet-text)',
                border: '1px solid var(--c-violet-border)',
              }}
            >
              {DAY_LABELS[Math.min(currentDay, 6)]}
            </span>
          </div>
          {startedDate && (
            <p className="text-sm mt-1" style={{ color: 'var(--c-text-4)' }}>
              Started {startedDate}
            </p>
          )}
        </div>

        <button
          onClick={() => setCheckInOpen(true)}
          className="shrink-0 flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 transition-all duration-200"
          style={{
            background: 'var(--c-violet-bg)',
            color: 'var(--c-violet-text)',
            border: '1px solid var(--c-violet-border)',
          }}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Daily Check-in</span>
          <span className="sm:hidden">Check-in</span>
        </button>
      </div>

      {/* Stats */}
      <DashboardStats
        totalSolved={totalSolved}
        totalProblems={allProblems.length}
        totalStarred={totalStarred}
        streak={streak}
      />

      {/* Overall progress */}
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{
          background: 'var(--c-card)',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--c-card-shadow)',
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--c-text-2)' }}>
            Overall Progress
          </h2>
          <span
            className="text-xl font-bold tabular-nums"
            style={{
              background: `linear-gradient(135deg, var(--c-grad-emerald-from) 0%, var(--c-grad-emerald-to) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {percent}%
          </span>
        </div>
        <ProgressBar value={percent} />
        <p className="text-xs" style={{ color: 'var(--c-text-4)' }}>
          {totalSolved} of {allProblems.length} problems solved
        </p>
      </div>

      {/* Per-day progress */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'var(--c-card)',
          border: '1px solid var(--c-border)',
          boxShadow: 'var(--c-card-shadow)',
        }}
      >
        <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--c-text-2)' }}>
          Progress by Day
        </h2>
        <div className="space-y-3.5">
          {dayStats.map((d) => {
            const pct         = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0;
            const attemptedPct = d.total > 0 ? Math.round((d.attempted / d.total) * 100) : 0;
            return (
              <Link key={d.day} href={`/day/${d.day}`} className="flex items-center gap-4 group">
                <span className="w-12 text-xs font-mono shrink-0" style={{ color: 'var(--c-text-4)' }}>
                  Day {d.day}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden flex"
                  style={{ background: 'var(--c-progress-track)' }}
                >
                  {pct > 0 && (
                    <div
                      className="h-full transition-all duration-700 ease-out progress-fill-emerald"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, var(--c-emerald-text) 0%, oklch(0.78 0.18 161) 100%)`,
                      }}
                    />
                  )}
                  {attemptedPct > 0 && (
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{ width: `${attemptedPct}%`, background: 'var(--c-amber-text)', opacity: 0.7 }}
                    />
                  )}
                </div>
                <span className="text-xs w-20 text-right shrink-0 tabular-nums" style={{ color: 'var(--c-text-4)' }}>
                  {d.solved}/{d.total}
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                  style={{ color: 'var(--c-text-5)' }}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex gap-5 mt-5 pt-4" style={{ borderTop: '1px solid var(--c-border-dim)' }}>
          {[
            { varColor: 'var(--c-emerald-text)', label: 'Solved' },
            { varColor: 'var(--c-amber-text)',   label: 'Attempted' },
            { varColor: 'var(--c-border)',        label: 'Not started' },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--c-text-4)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: item.varColor }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Today's focus */}
      <div>
        <SectionHeader
          icon={<CalendarDays className="w-4 h-4" style={{ color: 'var(--c-violet-text)' }} />}
          title={`Today's Focus — Day ${currentDay}`}
          action={
            <Link
              href={`/day/${currentDay}`}
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: 'var(--c-violet-text)' }}
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        />

        {todayProblems.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'var(--c-card)',
              border: '1px solid var(--c-border)',
              boxShadow: 'var(--c-card-shadow)',
            }}
          >
            <div className="flex justify-center mb-3">
              <div
                className="p-3 rounded-2xl"
                style={{
                  background: 'var(--c-emerald-bg)',
                  border: '1px solid var(--c-emerald-border)',
                }}
              >
                <Sparkles className="w-6 h-6" style={{ color: 'var(--c-emerald-text)' }} />
              </div>
            </div>
            <p className="font-semibold text-sm" style={{ color: 'var(--c-emerald-text)' }}>
              All Day {currentDay} problems solved!
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--c-text-4)' }}>
              {currentDay < 6 ? `Ready for Day ${currentDay + 1}?` : 'Head to Day 7 Review to reinforce your skills.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayProblems.map((p) => (
              <ProblemCard
                key={p.id}
                problem={p}
                progress={state.progress[p.id] ?? {
                  problemId: p.id, status: 'not_started', attempts: 0,
                  timeSpentSeconds: 0, confidenceRating: null, starred: false,
                  lastAttemptedAt: null, solvedAt: null, personalNotes: '',
                  userCode: '', reviewSchedule: null,
                }}
                onToggleStar={toggleStar}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recently viewed */}
      {(state.recentlyViewed?.length ?? 0) > 0 && (
        <div>
          <SectionHeader
            icon={<History className="w-4 h-4" style={{ color: 'var(--c-text-4)' }} />}
            title="Recently Viewed"
          />
          <div className="space-y-2">
            {(state.recentlyViewed ?? []).map((id) => {
              const problem = allProblems.find((p) => p.id === id);
              if (!problem) return null;
              return (
                <ProblemCard
                  key={id}
                  problem={problem}
                  progress={state.progress[id] ?? {
                    problemId: id, status: 'not_started' as const, attempts: 0,
                    timeSpentSeconds: 0, confidenceRating: null, starred: false,
                    lastAttemptedAt: null, solvedAt: null, personalNotes: '',
                    userCode: '', reviewSchedule: null,
                  }}
                  onToggleStar={toggleStar}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Previous check-ins */}
      {sortedCheckIns.length > 0 && (
        <div>
          <SectionHeader
            icon={<ClipboardCheck className="w-4 h-4" style={{ color: 'var(--c-text-4)' }} />}
            title="Previous Check-ins"
          />
          <div className="space-y-2">
            {sortedCheckIns.map((ci) => {
              const isExpanded = expandedCheckIns.has(ci.day);
              return (
                <div
                  key={ci.day}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    boxShadow: 'var(--c-card-shadow)',
                  }}
                >
                  <button
                    onClick={() => toggleCheckIn(ci.day)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[var(--c-violet-bg)]"
                    style={{ color: 'var(--c-text-2)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Day {ci.day} Check-in</span>
                      <span className="text-xs" style={{ color: 'var(--c-text-4)' }}>
                        {formatDate(ci.date)}
                      </span>
                    </div>
                    {isExpanded
                      ? <ChevronUp   className="w-4 h-4 shrink-0" style={{ color: 'var(--c-text-4)' }} />
                      : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--c-text-4)' }} />
                    }
                  </button>

                  {isExpanded && (
                    <div
                      className="px-4 pb-4 space-y-3 pt-3"
                      style={{ borderTop: '1px solid var(--c-border-dim)' }}
                    >
                      {ci.whatClicked && (
                        <div>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--c-text-4)' }}>What clicked</p>
                          <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--c-text-2)' }}>{ci.whatClicked}</p>
                        </div>
                      )}
                      {ci.whatDidnt && (
                        <div>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--c-text-4)' }}>What didn&apos;t click</p>
                          <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--c-text-2)' }}>{ci.whatDidnt}</p>
                        </div>
                      )}
                      {ci.tomorrowsFocus && (
                        <div>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--c-text-4)' }}>Tomorrow&apos;s focus</p>
                          <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--c-text-2)' }}>{ci.tomorrowsFocus}</p>
                        </div>
                      )}
                      <button
                        onClick={() => { setCheckInOpen(true); toggleCheckIn(ci.day); }}
                        className="text-xs font-medium transition-colors"
                        style={{ color: 'var(--c-violet-text)' }}
                      >
                        Edit check-in →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Daily Check-in Dialog */}
      <Dialog open={checkInOpen} onOpenChange={setCheckInOpen}>
        <DialogContent
          style={{
            background: 'var(--c-dialog)',
            border: '1px solid var(--c-border)',
            color: 'var(--c-text-1)',
          }}
          className="max-w-lg"
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--c-text-1)' }}>
              Day {currentDay} Check-in
            </DialogTitle>
          </DialogHeader>
          <DailyCheckInForm
            day={currentDay}
            existing={state.checkIns.find((c) => c.day === currentDay)}
            onSave={(checkIn) => { addCheckIn(checkIn); setCheckInOpen(false); }}
            onCancel={() => setCheckInOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
