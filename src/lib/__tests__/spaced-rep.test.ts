import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addDays, advanceSchedule, ensureScheduled, todayStr } from '../spaced-rep';
import { defaultProgress } from '../storage';

describe('todayStr', () => {
  it('returns a YYYY-MM-DD string', () => {
    const result = todayStr();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns todays UTC date', () => {
    const expected = new Date().toISOString().slice(0, 10);
    expect(todayStr()).toBe(expected);
  });
});

describe('addDays', () => {
  it('adds positive days', () => {
    expect(addDays('2024-01-01', 1)).toBe('2024-01-02');
    expect(addDays('2024-01-01', 3)).toBe('2024-01-04');
    expect(addDays('2024-01-01', 7)).toBe('2024-01-08');
  });

  it('handles month boundaries', () => {
    expect(addDays('2024-01-31', 1)).toBe('2024-02-01');
  });

  it('handles year boundaries', () => {
    expect(addDays('2024-12-31', 1)).toBe('2025-01-01');
  });

  it('handles leap year boundaries', () => {
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29'); // 2024 is a leap year
    expect(addDays('2024-02-29', 1)).toBe('2024-03-01');
  });
});

describe('advanceSchedule', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('level 1 → level 2, due in 3 days', () => {
    const result = advanceSchedule(1);
    expect(result.level).toBe(2);
    expect(result.dueAt).toBe('2024-06-18');
  });

  it('level 2 → level 3, due in 7 days', () => {
    const result = advanceSchedule(2);
    expect(result.level).toBe(3);
    expect(result.dueAt).toBe('2024-06-22');
  });

  it('level 3 → level 4 (graduated), empty dueAt', () => {
    const result = advanceSchedule(3);
    expect(result.level).toBe(4);
    expect(result.dueAt).toBe('');
  });
});

describe('ensureScheduled', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('schedules a problem that has no schedule (level 1, due tomorrow)', () => {
    const prog = defaultProgress('two-sum');
    const result = ensureScheduled(prog);
    expect(result.reviewSchedule).toEqual({ level: 1, dueAt: '2024-06-16' });
  });

  it('does not overwrite an existing schedule', () => {
    const prog = defaultProgress('two-sum');
    const withSchedule = { ...prog, reviewSchedule: { level: 2, dueAt: '2024-06-20' } };
    const result = ensureScheduled(withSchedule);
    expect(result.reviewSchedule).toEqual({ level: 2, dueAt: '2024-06-20' });
  });

  it('preserves all other fields', () => {
    const prog = { ...defaultProgress('two-sum'), starred: true, attempts: 3 };
    const result = ensureScheduled(prog);
    expect(result.starred).toBe(true);
    expect(result.attempts).toBe(3);
  });
});
