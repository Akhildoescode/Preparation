'use client';

import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import type { AppState, BehavioralStory, DailyCheckIn, Status, UserProgress } from '@/types';
import {
  clearState,
  defaultProgress,
  defaultState,
  loadState,
  loadStateFromCloud,
  saveState,
  saveStateToCloud,
} from '@/lib/storage';
import { advanceSchedule, ensureScheduled } from '@/lib/spaced-rep';

const DEBOUNCE_MS = 300;

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage immediately, then sync from cloud
  useEffect(() => {
    const local = loadState();
    if (!local.startedAt) local.startedAt = new Date().toISOString();
    startTransition(() => setState(local));

    loadStateFromCloud().then((cloud) => {
      if (cloud) {
        startTransition(() => setState((prev) => ({ ...prev, ...cloud })));
      }
    });
  }, []);

  // Debounced save to localStorage and cloud whenever state changes
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveState(state);
      saveStateToCloud(state);
    }, DEBOUNCE_MS);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state]);

  // ── updateProgress ──────────────────────────────────────────────────────

  const updateProgress = useCallback(
    (problemId: string, partial: Partial<UserProgress>) => {
      setState((prev) => {
        const existing = prev.progress[problemId] ?? defaultProgress(problemId);
        const updated: UserProgress = { ...existing, ...partial };
        return {
          ...prev,
          progress: { ...prev.progress, [problemId]: updated },
        };
      });
    },
    []
  );

  // ── markStatus (with auto-schedule for needs_review) ───────────────────

  const markStatus = useCallback(
    (problemId: string, status: Status) => {
      setState((prev) => {
        const existing = prev.progress[problemId] ?? defaultProgress(problemId);
        // Auto-schedule when marking needs_review if not already scheduled
        const withSchedule =
          status === 'needs_review' ? ensureScheduled(existing) : existing;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            [problemId]: {
              ...withSchedule,
              status,
              lastAttemptedAt: new Date().toISOString(),
              solvedAt:
                status === 'solved' ? new Date().toISOString() : existing.solvedAt,
              attempts:
                status !== 'not_started' ? (existing.attempts ?? 0) + 1 : 0,
            },
          },
        };
      });
    },
    []
  );

  // ── toggleStar (with auto-schedule on first star) ──────────────────────

  const toggleStar = useCallback(
    (problemId: string) => {
      setState((prev) => {
        const existing = prev.progress[problemId] ?? defaultProgress(problemId);
        const willStar = !existing.starred;
        const updated = willStar ? ensureScheduled(existing) : existing;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            [problemId]: { ...updated, starred: willStar },
          },
        };
      });
    },
    []
  );

  // ── graduateReview ─────────────────────────────────────────────────────
  /**
   * Called from the review page when user clicks "Graduated".
   * Advances the spaced-rep level (or marks as fully graduated),
   * and sets status → solved.
   */
  const graduateReview = useCallback(
    (problemId: string) => {
      setState((prev) => {
        const existing = prev.progress[problemId] ?? defaultProgress(problemId);
        const currentLevel = existing.reviewSchedule?.level ?? 1;
        const nextSchedule = advanceSchedule(currentLevel);
        return {
          ...prev,
          progress: {
            ...prev.progress,
            [problemId]: {
              ...existing,
              status: 'solved' as Status,
              solvedAt: existing.solvedAt ?? new Date().toISOString(),
              reviewSchedule: nextSchedule,
            },
          },
        };
      });
    },
    []
  );

  // ── setCurrentDay ──────────────────────────────────────────────────────

  const setCurrentDay = useCallback(
    (day: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
      setState((prev) => ({ ...prev, currentDay: day }));
    },
    []
  );

  // ── addCheckIn ─────────────────────────────────────────────────────────

  const addCheckIn = useCallback((checkIn: DailyCheckIn) => {
    setState((prev) => ({
      ...prev,
      checkIns: [...prev.checkIns.filter((c) => c.day !== checkIn.day), checkIn],
    }));
  }, []);

  // ── addRecentlyViewed ──────────────────────────────────────────────────────

  const addRecentlyViewed = useCallback((problemId: string) => {
    setState((prev) => {
      const existing = prev.recentlyViewed ?? [];
      const next = [problemId, ...existing.filter((id) => id !== problemId)].slice(0, 5);
      return { ...prev, recentlyViewed: next };
    });
  }, []);

  // ── updateBehavioralStory ──────────────────────────────────────────────

  const updateBehavioralStory = useCallback(
    (questionId: string, partial: Partial<Omit<BehavioralStory, 'questionId' | 'lastEditedAt'>>) => {
      setState((prev) => {
        const existing: BehavioralStory = prev.behavioralStories[questionId] ?? {
          questionId,
          situation: '',
          task: '',
          action: '',
          result: '',
          reflections: '',
          lastEditedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          behavioralStories: {
            ...prev.behavioralStories,
            [questionId]: { ...existing, ...partial, lastEditedAt: new Date().toISOString() },
          },
        };
      });
    },
    []
  );

  // ── importState / resetState / exportState ─────────────────────────────

  const importState = useCallback((imported: AppState) => {
    setState(imported);
    saveState(imported);
  }, []);

  const resetState = useCallback(() => {
    clearState();
    setState(defaultState());
  }, []);

  const exportState = useCallback((): AppState => {
    return state;
  }, [state]);

  return {
    state,
    updateProgress,
    markStatus,
    toggleStar,
    setCurrentDay,
    addCheckIn,
    graduateReview,
    addRecentlyViewed,
    updateBehavioralStory,
    importState,
    resetState,
    exportState,
  };
}
