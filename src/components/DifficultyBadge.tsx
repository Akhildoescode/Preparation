import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const style = (() => {
    switch (difficulty) {
      case 'Easy':
        return {
          background: 'var(--c-emerald-bg)',
          color: 'var(--c-emerald-text)',
          border: '1px solid var(--c-emerald-border)',
        };
      case 'Medium':
        return {
          background: 'var(--c-amber-bg)',
          color: 'var(--c-amber-text)',
          border: '1px solid var(--c-amber-border)',
        };
      case 'Hard':
        return {
          background: 'var(--c-rose-bg)',
          color: 'var(--c-rose-text)',
          border: '1px solid var(--c-rose-border)',
        };
    }
  })();

  return (
    <span
      className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium', className)}
      style={style}
    >
      {difficulty}
    </span>
  );
}
