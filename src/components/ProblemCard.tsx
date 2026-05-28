'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ExternalLink, Star, Clock, BookOpen } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';
import { StatusBadge } from './StatusBadge';
import { PatternTag } from './PatternTag';
import type { Problem, UserProgress, Status } from '@/types';

interface ProblemCardProps {
  problem: Problem;
  progress: UserProgress;
  onToggleStar: (id: string) => void;
}

const STATUS_STRIPE: Record<Status, string> = {
  solved:       'linear-gradient(to bottom, var(--c-emerald-text), var(--c-emerald-border))',
  attempted:    'linear-gradient(to bottom, var(--c-amber-text), var(--c-amber-border))',
  needs_review: 'linear-gradient(to bottom, var(--c-rose-text), var(--c-rose-border))',
  not_started:  'var(--c-border)',
};

const STATUS_INSET: Record<Status, string> = {
  solved:       `inset 0 0 30px var(--c-emerald-bg)`,
  attempted:    `inset 0 0 30px var(--c-amber-bg)`,
  needs_review: `inset 0 0 30px var(--c-rose-bg)`,
  not_started:  'none',
};

function ProblemCardBase({ problem, progress, onToggleStar }: ProblemCardProps) {
  return (
    <div
      className="problem-card group relative flex items-center gap-3 rounded-xl px-4 py-3 overflow-hidden"
      style={{
        background: 'var(--c-card)',
        border: '1px solid var(--c-border)',
        boxShadow: STATUS_INSET[progress.status],
      }}
    >
      {/* Status stripe */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 group-hover:w-1"
        style={{ background: STATUS_STRIPE[progress.status] }}
      />

      {/* Star */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleStar(problem.id);
        }}
        className="shrink-0 p-0.5 rounded transition-colors ml-1"
        aria-label={progress.starred ? 'Unstar problem' : 'Star problem'}
      >
        <Star
          className="w-4 h-4 transition-all duration-200"
          style={progress.starred ? {
            fill: 'var(--c-amber-text)',
            color: 'var(--c-amber-text)',
            filter: `drop-shadow(0 0 4px var(--c-amber-bg))`,
          } : {
            color: 'var(--c-text-5)',
          }}
        />
      </button>

      {/* Main clickable area */}
      <Link href={`/problem/${problem.id}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono w-10 shrink-0" style={{ color: 'var(--c-text-5)' }}>
            #{problem.leetcodeId}
          </span>
          <span className="text-sm font-medium truncate" style={{ color: 'var(--c-text-1)' }}>
            {problem.title}
          </span>
          {problem.mustKnow && (
            <span
              className="text-[10px] font-medium rounded-md px-1.5 py-0.5"
              style={{
                background: 'var(--c-emerald-bg)',
                color: 'var(--c-emerald-text)',
                border: '1px solid var(--c-emerald-border)',
              }}
            >
              Must-know
            </span>
          )}
          {problem.hasFullContent && (
            <span
              className="flex items-center gap-1 text-[10px] font-medium rounded-md px-1.5 py-0.5"
              style={{
                background: 'var(--c-sky-bg)',
                color: 'var(--c-sky-text)',
                border: '1px solid var(--c-sky-border)',
              }}
            >
              <BookOpen className="w-3 h-3" />
              Full guide
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <DifficultyBadge difficulty={problem.difficulty} />
          <StatusBadge status={progress.status} />
          {problem.patterns.slice(0, 2).map((p) => (
            <PatternTag key={p} pattern={p} />
          ))}
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--c-text-5)' }}>
            <Clock className="w-3 h-3" />
            {problem.estimatedMinutes}m
          </span>
        </div>
      </Link>

      {/* LeetCode link */}
      <a
        href={problem.leetcodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:text-[var(--c-text-2)]"
        style={{ color: 'var(--c-text-5)' }}
        aria-label="Open on LeetCode"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

export const ProblemCard = memo(ProblemCardBase);
