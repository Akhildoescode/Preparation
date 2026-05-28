import type { AppState, Problem, Status, UserProgress } from '@/types';
import { defaultProgress } from './storage';

export function getProgress(state: AppState, problemId: string): UserProgress {
  return state.progress[problemId] ?? defaultProgress(problemId);
}

export function countByStatus(
  state: AppState,
  problems: Problem[],
  status: Status
): number {
  return problems.filter(
    (p) => (state.progress[p.id]?.status ?? 'not_started') === status
  ).length;
}

export function solvedCount(state: AppState, problems: Problem[]): number {
  return countByStatus(state, problems, 'solved');
}

export function starredProblems(state: AppState, problems: Problem[]): Problem[] {
  return problems.filter((p) => state.progress[p.id]?.starred === true);
}

/**
 * Current streak = consecutive calendar days (up to today) where at least
 * one problem was solved. We derive this from solvedAt timestamps.
 */
export function currentStreak(state: AppState): number {
  const solvedDates = new Set<string>();
  for (const prog of Object.values(state.progress)) {
    if (prog.solvedAt) {
      solvedDates.add(prog.solvedAt.slice(0, 10));
    }
  }
  if (solvedDates.size === 0) return 0;

  // Use UTC date string to stay consistent with how solvedAt is stored
  let streak = 0;
  let cursor = new Date().toISOString().slice(0, 10);

  while (solvedDates.has(cursor)) {
    streak++;
    const d = new Date(cursor + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    cursor = d.toISOString().slice(0, 10);
  }
  return streak;
}

export function overallPercent(state: AppState, problems: Problem[]): number {
  if (problems.length === 0) return 0;
  return Math.round((solvedCount(state, problems) / problems.length) * 100);
}

export function perDayStats(
  state: AppState,
  problems: Problem[]
): Array<{
  day: number;
  total: number;
  solved: number;
  attempted: number;
  notStarted: number;
}> {
  const days = [1, 2, 3, 4, 5, 6] as const;
  return days.map((day) => {
    const dayProblems = problems.filter((p) => p.day === day);
    const solved = countByStatus(state, dayProblems, 'solved');
    const attempted = countByStatus(state, dayProblems, 'attempted');
    const notStarted = countByStatus(state, dayProblems, 'not_started');
    return {
      day,
      total: dayProblems.length,
      solved,
      attempted,
      notStarted,
    };
  });
}
