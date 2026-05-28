import type { ReviewSchedule, UserProgress } from '@/types';

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  // Parse as UTC midnight to avoid DST shifts
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Returns the next ReviewSchedule after a graduation step.
 * Level 3 → level 4 (fully graduated, dueAt empty).
 */
export function advanceSchedule(currentLevel: number): ReviewSchedule {
  const today = todayStr();
  if (currentLevel === 1) return { level: 2, dueAt: addDays(today, 3) };
  if (currentLevel === 2) return { level: 3, dueAt: addDays(today, 7) };
  return { level: 4, dueAt: '' };
}

/**
 * Ensures the problem has a review schedule. No-op if already scheduled
 * or graduated.
 */
export function ensureScheduled(existing: UserProgress): UserProgress {
  if (existing.reviewSchedule !== null) return existing;
  return {
    ...existing,
    reviewSchedule: { level: 1, dueAt: addDays(todayStr(), 1) },
  };
}
