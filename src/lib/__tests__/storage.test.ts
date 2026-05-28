import { describe, it, expect, beforeEach } from 'vitest';
import { defaultProgress, defaultState, loadState, saveState, clearState } from '../storage';

describe('defaultProgress', () => {
  it('returns correct initial shape', () => {
    const prog = defaultProgress('two-sum');
    expect(prog.problemId).toBe('two-sum');
    expect(prog.status).toBe('not_started');
    expect(prog.attempts).toBe(0);
    expect(prog.timeSpentSeconds).toBe(0);
    expect(prog.confidenceRating).toBeNull();
    expect(prog.starred).toBe(false);
    expect(prog.lastAttemptedAt).toBeNull();
    expect(prog.solvedAt).toBeNull();
    expect(prog.personalNotes).toBe('');
    expect(prog.userCode).toBe('');
    expect(prog.reviewSchedule).toBeNull();
  });

  it('uses the provided problemId', () => {
    expect(defaultProgress('binary-search').problemId).toBe('binary-search');
  });
});

describe('defaultState', () => {
  it('returns correct initial shape', () => {
    const state = defaultState();
    expect(state.progress).toEqual({});
    expect(state.checkIns).toEqual([]);
    expect(state.currentDay).toBe(1);
    expect(state.startedAt).toBeNull();
    expect(state.recentlyViewed).toEqual([]);
    expect(state.behavioralStories).toEqual({});
  });
});

describe('loadState / saveState / clearState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns defaultState when nothing saved', () => {
    const state = loadState();
    expect(state.progress).toEqual({});
    expect(state.checkIns).toEqual([]);
  });

  it('persists and reloads state correctly', () => {
    const state = { ...defaultState(), currentDay: 3 as const };
    saveState(state);
    const loaded = loadState();
    expect(loaded.currentDay).toBe(3);
  });

  it('forward-compat: fills missing fields with defaults on load', () => {
    // Simulate an older saved state missing behavioralStories
    const oldState = { progress: {}, checkIns: [], currentDay: 2, startedAt: null, recentlyViewed: [] };
    localStorage.setItem('dsa-prep-state-v1', JSON.stringify(oldState));
    const loaded = loadState();
    expect(loaded.behavioralStories).toEqual({});
    expect(loaded.currentDay).toBe(2);
  });

  it('returns defaultState when localStorage contains invalid JSON', () => {
    localStorage.setItem('dsa-prep-state-v1', '{invalid json}');
    expect(loadState()).toEqual(expect.objectContaining({ progress: {}, checkIns: [] }));
  });

  it('clearState removes saved data', () => {
    saveState({ ...defaultState(), currentDay: 5 as const });
    clearState();
    const loaded = loadState();
    expect(loaded.currentDay).toBe(1);
  });
});
