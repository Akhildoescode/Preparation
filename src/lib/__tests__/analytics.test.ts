import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  daySolveRates,
  mustKnowUnsolved,
  patternSolveRates,
  readinessScore,
  slowProblems,
  studyStreak,
  weakPatterns,
} from '../analytics';
import type { Problem, UserProgress } from '@/types';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    problemId: 'p1',
    status: 'not_started',
    attempts: 0,
    timeSpentSeconds: 0,
    confidenceRating: null,
    starred: false,
    lastAttemptedAt: null,
    solvedAt: null,
    personalNotes: '',
    userCode: '',
    reviewSchedule: null,
    ...overrides,
  };
}

function makeProblem(overrides: Partial<Problem> = {}): Problem {
  return {
    id: 'p1',
    leetcodeId: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    patterns: ['hashing'],
    day: 1,
    topicGroup: 'Hashing',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    estimatedMinutes: 15,
    mustKnow: false,
    hasFullContent: true,
    ...overrides,
  };
}

// ─── patternSolveRates ────────────────────────────────────────────────────────

describe('patternSolveRates', () => {
  it('returns zero rate for unsolved problems', () => {
    const problems = [makeProblem({ id: 'p1', patterns: ['hashing'] })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'not_started' }) };
    const rates = patternSolveRates(progress, problems);
    expect(rates.hashing).toEqual({ solved: 0, total: 1, rate: 0 });
  });

  it('returns 1.0 rate when all problems solved', () => {
    const problems = [makeProblem({ id: 'p1', patterns: ['hashing'] })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'solved' }) };
    const rates = patternSolveRates(progress, problems);
    expect(rates.hashing.rate).toBe(1);
  });

  it('aggregates across multiple problems with same pattern', () => {
    const problems = [
      makeProblem({ id: 'p1', patterns: ['two_pointers'] }),
      makeProblem({ id: 'p2', patterns: ['two_pointers'] }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'solved' }),
      p2: makeProgress({ problemId: 'p2', status: 'attempted' }),
    };
    const rates = patternSolveRates(progress, problems);
    expect(rates.two_pointers).toEqual({ solved: 1, total: 2, rate: 0.5 });
  });

  it('handles empty problems list', () => {
    expect(patternSolveRates({}, [])).toEqual({});
  });
});

// ─── readinessScore ───────────────────────────────────────────────────────────

describe('readinessScore', () => {
  it('returns 0 for empty problems', () => {
    expect(readinessScore({}, [])).toBe(0);
  });

  it('returns 0 when nothing solved', () => {
    const problems = [makeProblem({ mustKnow: true })];
    const progress = { p1: makeProgress() };
    expect(readinessScore(progress, problems)).toBe(0);
  });

  it('returns 100 when all solved and all must-know solved', () => {
    const problems = [makeProblem({ id: 'p1', mustKnow: true })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'solved' }) };
    expect(readinessScore(progress, problems)).toBe(100);
  });

  it('awards 10-point bonus when all must-know are solved', () => {
    const problems = [
      makeProblem({ id: 'p1', mustKnow: true }),
      makeProblem({ id: 'p2', mustKnow: false }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'solved' }),
      p2: makeProgress({ problemId: 'p2', status: 'not_started' }),
    };
    // must-know coverage: 100% → 60pts; overall: 1/2 → 15pts; bonus: 10pts = 85
    expect(readinessScore(progress, problems)).toBe(85);
  });
});

// ─── mustKnowUnsolved ─────────────────────────────────────────────────────────

describe('mustKnowUnsolved', () => {
  it('returns only must-know problems that are not solved', () => {
    const problems = [
      makeProblem({ id: 'p1', mustKnow: true }),
      makeProblem({ id: 'p2', mustKnow: true }),
      makeProblem({ id: 'p3', mustKnow: false }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'solved' }),
      p2: makeProgress({ problemId: 'p2', status: 'attempted' }),
    };
    const result = mustKnowUnsolved(progress, problems);
    expect(result.map((p) => p.id)).toEqual(['p2']);
  });

  it('returns empty when all must-know are solved', () => {
    const problems = [makeProblem({ id: 'p1', mustKnow: true })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'solved' }) };
    expect(mustKnowUnsolved(progress, problems)).toHaveLength(0);
  });
});

// ─── weakPatterns ─────────────────────────────────────────────────────────────

describe('weakPatterns', () => {
  it('returns patterns below the threshold sorted by rate ascending', () => {
    const problems = [
      makeProblem({ id: 'p1', patterns: ['hashing'] }),
      makeProblem({ id: 'p2', patterns: ['two_pointers'] }),
      makeProblem({ id: 'p3', patterns: ['two_pointers'] }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'not_started' }),
      p2: makeProgress({ problemId: 'p2', status: 'solved' }),
      p3: makeProgress({ problemId: 'p3', status: 'not_started' }),
    };
    // hashing: 0/1 = 0, two_pointers: 1/2 = 0.5 (above default threshold 0.4)
    const result = weakPatterns(progress, problems);
    expect(result).toContain('hashing');
    expect(result).not.toContain('two_pointers');
  });

  it('respects custom threshold', () => {
    const problems = [makeProblem({ id: 'p1', patterns: ['hashing'] })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'solved' }) };
    // 100% solved — only weak if threshold > 1.0
    expect(weakPatterns(progress, problems, 0.99)).toHaveLength(0);
    expect(weakPatterns(progress, problems, 1.01)).toContain('hashing');
  });
});

// ─── slowProblems ─────────────────────────────────────────────────────────────

describe('slowProblems', () => {
  it('returns unsolved problems over the time threshold', () => {
    const problems = [
      makeProblem({ id: 'p1' }),
      makeProblem({ id: 'p2' }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'attempted', timeSpentSeconds: 41 * 60 }),
      p2: makeProgress({ problemId: 'p2', status: 'attempted', timeSpentSeconds: 10 * 60 }),
    };
    expect(slowProblems(progress, problems).map((p) => p.id)).toEqual(['p1']);
  });

  it('excludes solved problems even if over threshold', () => {
    const problems = [makeProblem({ id: 'p1' })];
    const progress = { p1: makeProgress({ problemId: 'p1', status: 'solved', timeSpentSeconds: 90 * 60 }) };
    expect(slowProblems(progress, problems)).toHaveLength(0);
  });
});

// ─── studyStreak ──────────────────────────────────────────────────────────────

describe('studyStreak', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 when no attempts', () => {
    expect(studyStreak({})).toBe(0);
  });

  it('returns 1 when only today has an attempt', () => {
    const progress = {
      p1: makeProgress({ lastAttemptedAt: '2024-06-15T08:00:00Z' }),
    };
    expect(studyStreak(progress)).toBe(1);
  });

  it('counts consecutive days ending today', () => {
    const progress = {
      p1: makeProgress({ lastAttemptedAt: '2024-06-15T08:00:00Z' }),
      p2: makeProgress({ lastAttemptedAt: '2024-06-14T08:00:00Z' }),
      p3: makeProgress({ lastAttemptedAt: '2024-06-13T08:00:00Z' }),
    };
    expect(studyStreak(progress)).toBe(3);
  });

  it('stops counting at a gap', () => {
    const progress = {
      p1: makeProgress({ lastAttemptedAt: '2024-06-15T08:00:00Z' }),
      // gap on June 14
      p2: makeProgress({ lastAttemptedAt: '2024-06-13T08:00:00Z' }),
    };
    expect(studyStreak(progress)).toBe(1);
  });

  it('returns 0 when last attempt was yesterday but not today', () => {
    const progress = {
      p1: makeProgress({ lastAttemptedAt: '2024-06-14T08:00:00Z' }),
    };
    expect(studyStreak(progress)).toBe(0);
  });
});

// ─── daySolveRates ────────────────────────────────────────────────────────────

describe('daySolveRates', () => {
  it('calculates solve rate per day', () => {
    const problems = [
      makeProblem({ id: 'p1', day: 1 }),
      makeProblem({ id: 'p2', day: 1 }),
      makeProblem({ id: 'p3', day: 2 }),
    ];
    const progress = {
      p1: makeProgress({ problemId: 'p1', status: 'solved' }),
      p2: makeProgress({ problemId: 'p2', status: 'not_started' }),
      p3: makeProgress({ problemId: 'p3', status: 'solved' }),
    };
    const rates = daySolveRates(progress, problems);
    expect(rates[1]).toEqual({ solved: 1, total: 2, rate: 0.5 });
    expect(rates[2]).toEqual({ solved: 1, total: 1, rate: 1 });
  });
});
