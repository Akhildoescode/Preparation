import type { Pattern, Problem, UserProgress } from '@/types';

/** Solve rate per Pattern across all problems with that pattern. */
export function patternSolveRates(
  progress: Record<string, UserProgress>,
  problems: Problem[]
): Record<Pattern, { solved: number; total: number; rate: number }> {
  const acc: Partial<Record<Pattern, { solved: number; total: number; rate: number }>> = {};

  for (const problem of problems) {
    for (const pattern of problem.patterns) {
      if (!acc[pattern]) acc[pattern] = { solved: 0, total: 0, rate: 0 };
      acc[pattern]!.total += 1;
      if (progress[problem.id]?.status === 'solved') {
        acc[pattern]!.solved += 1;
      }
    }
  }

  for (const key of Object.keys(acc) as Pattern[]) {
    const entry = acc[key]!;
    entry.rate = entry.total === 0 ? 0 : entry.solved / entry.total;
  }

  return acc as Record<Pattern, { solved: number; total: number; rate: number }>;
}

/** Solve rate per day (1–6). */
export function daySolveRates(
  progress: Record<string, UserProgress>,
  problems: Problem[]
): Record<number, { solved: number; total: number; rate: number }> {
  const acc: Record<number, { solved: number; total: number; rate: number }> = {};

  for (const problem of problems) {
    const day = problem.day;
    if (!acc[day]) acc[day] = { solved: 0, total: 0, rate: 0 };
    acc[day].total += 1;
    if (progress[problem.id]?.status === 'solved') {
      acc[day].solved += 1;
    }
  }

  for (const day of Object.keys(acc).map(Number)) {
    const entry = acc[day];
    entry.rate = entry.total === 0 ? 0 : entry.solved / entry.total;
  }

  return acc;
}

/** Must-know problems (mustKnow: true) not yet status === 'solved'. */
export function mustKnowUnsolved(
  progress: Record<string, UserProgress>,
  problems: Problem[]
): Problem[] {
  return problems.filter(
    (p) => p.mustKnow && progress[p.id]?.status !== 'solved'
  );
}

/** 0–100 composite score: 60% must-know coverage + 30% overall coverage + 10% bonus if all must-know solved. */
export function readinessScore(
  progress: Record<string, UserProgress>,
  problems: Problem[]
): number {
  if (problems.length === 0) return 0;

  const mustKnow = problems.filter((p) => p.mustKnow);
  const mustKnowSolved = mustKnow.filter(
    (p) => progress[p.id]?.status === 'solved'
  ).length;
  const allSolved = problems.filter(
    (p) => progress[p.id]?.status === 'solved'
  ).length;

  const mustKnowCoverage = mustKnow.length === 0 ? 1 : mustKnowSolved / mustKnow.length;
  const overallCoverage = allSolved / problems.length;
  const allMustKnowDone = mustKnow.length > 0 && mustKnowSolved === mustKnow.length;

  const raw = mustKnowCoverage * 60 + overallCoverage * 30 + (allMustKnowDone ? 10 : 0);
  return Math.round(raw);
}

/** Patterns with solve rate < threshold (default 0.4), sorted ascending by rate. */
export function weakPatterns(
  progress: Record<string, UserProgress>,
  problems: Problem[],
  threshold = 0.4
): Pattern[] {
  const rates = patternSolveRates(progress, problems);
  return (Object.keys(rates) as Pattern[])
    .filter((p) => rates[p].rate < threshold)
    .sort((a, b) => rates[a].rate - rates[b].rate);
}

/** Problems where timeSpentSeconds/60 > thresholdMinutes (default 40) and status !== 'solved'. */
export function slowProblems(
  progress: Record<string, UserProgress>,
  problems: Problem[],
  thresholdMinutes = 40
): Problem[] {
  return problems.filter((p) => {
    const prog = progress[p.id];
    return (
      prog &&
      prog.status !== 'solved' &&
      prog.timeSpentSeconds / 60 > thresholdMinutes
    );
  });
}

/** Consecutive calendar days (ending today) on which at least one problem has lastAttemptedAt. */
export function studyStreak(progress: Record<string, UserProgress>): number {
  const dates = new Set<string>();
  for (const prog of Object.values(progress)) {
    if (prog.lastAttemptedAt) {
      dates.add(prog.lastAttemptedAt.slice(0, 10));
    }
  }

  if (dates.size === 0) return 0;

  // Use UTC date string to stay consistent with how lastAttemptedAt is stored
  let streak = 0;
  let cursor = new Date().toISOString().slice(0, 10);

  while (dates.has(cursor)) {
    streak += 1;
    const d = new Date(cursor + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    cursor = d.toISOString().slice(0, 10);
  }

  return streak;
}
