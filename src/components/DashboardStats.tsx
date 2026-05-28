'use client';

import { CheckCircle, Flame, Star, Target } from 'lucide-react';

interface DashboardStatsProps {
  totalSolved: number;
  totalProblems: number;
  totalStarred: number;
  streak: number;
}

const STATS = [
  {
    key: 'solved',
    icon: CheckCircle,
    label: 'Solved',
    iconColor: 'var(--c-emerald-text)',
    iconBg: 'var(--c-emerald-bg)',
    iconBorder: 'var(--c-emerald-border)',
    iconGlow: 'var(--c-emerald-glow)',
    tintBg: 'var(--c-emerald-bg)',
    gradFrom: 'var(--c-grad-emerald-from)',
    gradTo: 'var(--c-grad-emerald-to)',
  },
  {
    key: 'starred',
    icon: Star,
    label: 'Starred',
    iconColor: 'var(--c-amber-text)',
    iconBg: 'var(--c-amber-bg)',
    iconBorder: 'var(--c-amber-border)',
    iconGlow: 'var(--c-amber-bg)',
    tintBg: 'var(--c-amber-bg)',
    gradFrom: 'var(--c-grad-amber-from)',
    gradTo: 'var(--c-grad-amber-to)',
  },
  {
    key: 'streak',
    icon: Flame,
    label: 'Streak',
    iconColor: 'var(--c-orange-text)',
    iconBg: 'var(--c-orange-bg)',
    iconBorder: 'var(--c-orange-border)',
    iconGlow: 'var(--c-orange-bg)',
    tintBg: 'var(--c-orange-bg)',
    gradFrom: 'var(--c-grad-orange-from)',
    gradTo: 'var(--c-grad-orange-to)',
  },
  {
    key: 'remaining',
    icon: Target,
    label: 'Remaining',
    iconColor: 'var(--c-violet-text)',
    iconBg: 'var(--c-violet-bg)',
    iconBorder: 'var(--c-violet-border)',
    iconGlow: 'var(--c-violet-glow)',
    tintBg: 'var(--c-violet-bg)',
    gradFrom: 'var(--c-grad-violet-from)',
    gradTo: 'var(--c-grad-violet-to)',
  },
];

export function DashboardStats({
  totalSolved,
  totalProblems,
  totalStarred,
  streak,
}: DashboardStatsProps) {
  const values = [
    { value: totalSolved.toString(),                  sub: `of ${totalProblems}` },
    { value: totalStarred.toString(),                 sub: 'problems' },
    { value: streak.toString(),                       sub: `day${streak !== 1 ? 's' : ''}` },
    { value: (totalProblems - totalSolved).toString(), sub: 'to solve' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATS.map((s, i) => {
        const Icon = s.icon;
        const { value, sub } = values[i];
        return (
          <div
            key={s.key}
            className="stat-card relative flex flex-col gap-4 rounded-xl px-4 py-4 overflow-hidden"
            style={{
              background: 'var(--c-card)',
              border: '1px solid var(--c-border)',
            }}
          >
            {/* Per-stat corner radial tint */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 0% 0%, ${s.tintBg} 0%, transparent 65%)`,
              }}
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-between">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: 'var(--c-text-5)' }}
              >
                {s.label}
              </span>
              <div
                className="p-1.5 rounded-lg"
                style={{
                  background: s.iconBg,
                  border: `1px solid ${s.iconBorder}`,
                  boxShadow: `0 0 12px ${s.iconGlow}`,
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: s.iconColor }} />
              </div>
            </div>

            <div className="relative flex items-baseline gap-1.5">
              <span
                className="text-3xl font-bold tabular-nums leading-none"
                style={{
                  background: `linear-gradient(135deg, ${s.gradFrom} 0%, ${s.gradTo} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </span>
              <span className="text-xs" style={{ color: 'var(--c-text-5)' }}>
                {sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
