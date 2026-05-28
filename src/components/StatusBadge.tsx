import { cn } from '@/lib/utils';
import type { Status } from '@/types';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const labels: Record<Status, string> = {
  not_started:  'Not Started',
  attempted:    'Attempted',
  solved:       'Solved',
  needs_review: 'Needs Review',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = (() => {
    switch (status) {
      case 'solved':
        return {
          background: 'var(--c-emerald-bg)',
          color: 'var(--c-emerald-text)',
          border: '1px solid var(--c-emerald-border)',
        };
      case 'attempted':
        return {
          background: 'var(--c-amber-bg)',
          color: 'var(--c-amber-text)',
          border: '1px solid var(--c-amber-border)',
        };
      case 'needs_review':
        return {
          background: 'var(--c-rose-bg)',
          color: 'var(--c-rose-text)',
          border: '1px solid var(--c-rose-border)',
        };
      default:
        return {
          background: 'var(--c-border)',
          color: 'var(--c-text-4)',
          border: '1px solid var(--c-border-dim)',
        };
    }
  })();

  return (
    <span
      className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium', className)}
      style={style}
    >
      {labels[status]}
    </span>
  );
}
