import type { AppState, UserProgress } from '@/types';

const STORAGE_KEY = 'dsa-prep-state-v1';

export function defaultProgress(problemId: string): UserProgress {
  return {
    problemId,
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
  };
}

export function defaultState(): AppState {
  return {
    progress: {},
    checkIns: [],
    currentDay: 1,
    startedAt: null,
    recentlyViewed: [],
    // v2: behavioral stories added in Phase 7A
    behavioralStories: {},
  };
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    // Forward-compat: fill in fields added after initial release
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded or unavailable — silently fail
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
