import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({
  value,
  className,
  label,
  showPercent = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1.5 text-xs" style={{ color: 'var(--c-text-4)' }}>
          {label && <span>{label}</span>}
          {showPercent && <span>{clamped}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full rounded-full overflow-hidden"
        style={{ background: 'var(--c-progress-track)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out progress-fill-emerald"
          style={{
            width: `${clamped}%`,
            background: `linear-gradient(90deg, var(--c-emerald-text) 0%, oklch(0.84 0.16 150) 100%)`,
          }}
        />
      </div>
    </div>
  );
}
