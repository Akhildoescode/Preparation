'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  ExternalLink,
  Pause,
  Play,
  Square,
  Timer,
} from 'lucide-react';
import { useAppState } from '@/hooks/useAppState';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { PatternTag } from '@/components/PatternTag';
import { cn } from '@/lib/utils';
import type { Difficulty, Pattern, Problem, Status } from '@/types';

// ─── Constants ───────────────────────────────────────────────────────────────

const TOTAL_SECONDS = 1800; // 30 minutes
const CLARIFY_END = 300;    // 0–5 min
const CODE_END = 1500;      // 5–25 min
// TEST_END = 1800           // 25–30 min

// ─── Types ───────────────────────────────────────────────────────────────────

type MockPhase = 'setup' | 'running' | 'ending';
type InterviewPhase = 'clarify' | 'code' | 'test';

interface Filters {
  difficulty: Difficulty | 'any';
  day: 1 | 2 | 3 | 4 | 5 | 6 | 'any';
}

interface Toast {
  id: number;
  message: string;
  color: 'emerald' | 'sky' | 'amber';
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInterviewPhase(elapsedSeconds: number): InterviewPhase {
  if (elapsedSeconds < CLARIFY_END) return 'clarify';
  if (elapsedSeconds < CODE_END) return 'code';
  return 'test';
}

function formatTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PHASE_INFO: Record<InterviewPhase, { label: string; color: 'emerald' | 'sky' | 'amber'; description: string }> = {
  clarify: { label: 'Clarify', color: 'emerald', description: 'Ask clarifying questions. Understand the problem fully.' },
  code:    { label: 'Code',    color: 'sky',     description: 'Walk through your approach, then write the solution.' },
  test:    { label: 'Test & Explain', color: 'amber', description: 'Test edge cases. Explain complexity. Discuss trade-offs.' },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function PhaseBar({ elapsedSeconds }: { elapsedSeconds: number }) {
  const clarifyPct = Math.min(100, (elapsedSeconds / CLARIFY_END) * 100);
  const codePct    = Math.min(100, Math.max(0, ((elapsedSeconds - CLARIFY_END) / (CODE_END - CLARIFY_END)) * 100));
  const testPct    = Math.min(100, Math.max(0, ((elapsedSeconds - CODE_END) / (TOTAL_SECONDS - CODE_END)) * 100));

  return (
    <div className="space-y-2">
      <div className="flex text-xs text-zinc-500 justify-between">
        <span>0:00</span>
        <span>5:00</span>
        <span>25:00</span>
        <span>30:00</span>
      </div>
      <div className="flex gap-1 h-2.5 rounded-full overflow-hidden bg-zinc-800">
        {/* Clarify segment */}
        <div
          className="relative rounded-l-full overflow-hidden"
          style={{ width: `${(CLARIFY_END / TOTAL_SECONDS) * 100}%` }}
        >
          <div className="absolute inset-0 bg-zinc-700/60" />
          <div
            className="absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-1000"
            style={{ width: `${clarifyPct}%` }}
          />
        </div>
        {/* Code segment */}
        <div
          className="relative overflow-hidden"
          style={{ width: `${((CODE_END - CLARIFY_END) / TOTAL_SECONDS) * 100}%` }}
        >
          <div className="absolute inset-0 bg-zinc-700/60" />
          <div
            className="absolute inset-y-0 left-0 bg-sky-500 transition-all duration-1000"
            style={{ width: `${codePct}%` }}
          />
        </div>
        {/* Test segment */}
        <div
          className="relative rounded-r-full overflow-hidden"
          style={{ width: `${((TOTAL_SECONDS - CODE_END) / TOTAL_SECONDS) * 100}%` }}
        >
          <div className="absolute inset-0 bg-zinc-700/60" />
          <div
            className="absolute inset-y-0 left-0 bg-amber-500 transition-all duration-1000"
            style={{ width: `${testPct}%` }}
          />
        </div>
      </div>
      <div className="flex text-xs">
        <span className="text-emerald-400" style={{ width: `${(CLARIFY_END / TOTAL_SECONDS) * 100}%` }}>Clarify</span>
        <span className="text-sky-400" style={{ width: `${((CODE_END - CLARIFY_END) / TOTAL_SECONDS) * 100}%` }}>Code</span>
        <span className="text-amber-400">Test</span>
      </div>
    </div>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg border animate-in slide-in-from-right-4 fade-in-0 duration-300',
            t.color === 'emerald' && 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
            t.color === 'sky'     && 'bg-sky-500/20 border-sky-500/40 text-sky-300',
            t.color === 'amber'   && 'bg-amber-500/20 border-amber-500/40 text-amber-300',
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

function ConfidencePicker({
  value,
  onChange,
}: {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {([1, 2, 3, 4, 5] as const).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={cn(
            'w-9 h-9 rounded-lg border text-sm font-medium transition-colors',
            value === n
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
          )}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface MockPageClientProps {
  problems: Problem[];
}

export default function MockPageClient({ problems }: MockPageClientProps) {
  const { state, updateProgress } = useAppState();

  // ── Phase state ──
  const [mockPhase, setMockPhase] = useState<MockPhase>('setup');
  const [filters, setFilters] = useState<Filters>({ difficulty: 'any', day: 'any' });
  const [chosenProblem, setChosenProblem] = useState<Problem | null>(null);
  const [noMatchError, setNoMatchError] = useState(false);

  // ── Timer state (refs for accuracy, state for display) ──
  const startEpochRef = useRef<number | null>(null); // Date.now() when last resumed
  const accMsRef      = useRef(0);                    // ms before current run
  const [displaySeconds, setDisplaySeconds] = useState(TOTAL_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const prevPhaseRef = useRef<InterviewPhase>('clarify');

  // ── End-screen state ──
  const [endStatus, setEndStatus] = useState<Status>('attempted');
  const [endConfidence, setEndConfidence] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [elapsedAtEnd, setElapsedAtEnd] = useState(0);

  // ── Toast state ──
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounterRef = useRef(0);

  const pushToast = useCallback((message: string, color: Toast['color']) => {
    const id = ++toastCounterRef.current;
    setToasts((prev) => [...prev, { id, message, color }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  // ── Timer tick ──
  useEffect(() => {
    if (mockPhase !== 'running') return;

    const id = setInterval(() => {
      const nowElapsedMs = accMsRef.current + (startEpochRef.current ? Date.now() - startEpochRef.current : 0);
      const elapsedS = Math.floor(nowElapsedMs / 1000);
      const remaining = Math.max(0, TOTAL_SECONDS - elapsedS);
      setDisplaySeconds(remaining);

      // Phase transition toasts
      const currentPhase = getInterviewPhase(elapsedS);
      if (currentPhase !== prevPhaseRef.current) {
        const info = PHASE_INFO[currentPhase];
        pushToast(`⏱ ${info.label} phase — ${info.description.split('.')[0]}`, info.color);
        prevPhaseRef.current = currentPhase;
      }

      // Auto-end when time is up
      if (remaining === 0) {
        setElapsedAtEnd(elapsedS);
        setMockPhase('ending');
        pushToast('⏰ Time is up! Log your result below.', 'amber');
      }
    }, 250); // poll 4×/s — smooth and cheap

    return () => clearInterval(id);
  }, [mockPhase, pushToast]);

  // ── Start session ──
  const handleStart = useCallback(() => {
    setNoMatchError(false);

    // Build candidate list: match filters + prefer unsolved
    const matching = problems.filter((p) => {
      if (filters.difficulty !== 'any' && p.difficulty !== filters.difficulty) return false;
      if (filters.day !== 'any' && p.day !== filters.day) return false;
      return true;
    });

    if (matching.length === 0) {
      setNoMatchError(true);
      return;
    }

    // Prefer unsolved (not_started or attempted)
    const unsolved = matching.filter((p) => {
      const s = state.progress[p.id]?.status ?? 'not_started';
      return s === 'not_started' || s === 'attempted';
    });

    const pool = unsolved.length > 0 ? unsolved : matching;
    const shuffled = shuffleArray(pool);
    const picked = shuffled[0];

    setChosenProblem(picked);
    accMsRef.current = 0;
    startEpochRef.current = Date.now();
    prevPhaseRef.current = 'clarify';
    setDisplaySeconds(TOTAL_SECONDS);
    setIsPaused(false);
    setMockPhase('running');
  }, [filters, problems, state.progress]);

  // ── Pause / resume ──
  const togglePause = useCallback(() => {
    if (isPaused) {
      // Resume: restart epoch
      startEpochRef.current = Date.now();
      setIsPaused(false);
    } else {
      // Pause: bank elapsed ms
      if (startEpochRef.current !== null) {
        accMsRef.current += Date.now() - startEpochRef.current;
      }
      startEpochRef.current = null;
      setIsPaused(true);
    }
  }, [isPaused]);

  // ── End session early ──
  const handleEndEarly = useCallback(() => {
    const nowMs = accMsRef.current + (startEpochRef.current ? Date.now() - startEpochRef.current : 0);
    setElapsedAtEnd(Math.floor(nowMs / 1000));
    // Bank time before ending
    if (startEpochRef.current !== null) {
      accMsRef.current += Date.now() - startEpochRef.current;
      startEpochRef.current = null;
    }
    setMockPhase('ending');
  }, []);

  // ── Save result ──
  const handleSave = useCallback(() => {
    if (!chosenProblem) return;
    const existing = state.progress[chosenProblem.id];
    const prevTime = existing?.timeSpentSeconds ?? 0;
    updateProgress(chosenProblem.id, {
      status: endStatus,
      confidenceRating: endConfidence,
      timeSpentSeconds: prevTime + elapsedAtEnd,
      lastAttemptedAt: new Date().toISOString(),
      ...(endStatus === 'solved' && !existing?.solvedAt
        ? { solvedAt: new Date().toISOString() }
        : {}),
      attempts: (existing?.attempts ?? 0) + 1,
    });
    // Reset to setup
    setMockPhase('setup');
    setChosenProblem(null);
    setEndStatus('attempted');
    setEndConfidence(null);
    accMsRef.current = 0;
  }, [chosenProblem, state.progress, updateProgress, endStatus, endConfidence, elapsedAtEnd]);

  const elapsedSeconds = TOTAL_SECONDS - displaySeconds;
  const currentInterviewPhase = getInterviewPhase(elapsedSeconds);
  const phaseInfo = PHASE_INFO[currentInterviewPhase];

  // ─── Render: Setup ────────────────────────────────────────────────────────

  if (mockPhase === 'setup') {
    return (
      <>
        <div className="max-w-xl mx-auto space-y-8 pt-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-semibold text-zinc-100">Mock Interview</h1>
            </div>
            <p className="text-zinc-500 text-sm">
              30-minute timed session with Clarify → Code → Test phases. Results are saved to your progress.
            </p>
          </div>

          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-5">
            {/* Difficulty filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {(['any', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilters((f) => ({ ...f, difficulty: d }))}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-sm border transition-colors',
                      filters.difficulty === d
                        ? d === 'any'
                          ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                          : d === 'Easy'
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : d === 'Medium'
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                    )}
                  >
                    {d === 'any' ? 'Any Difficulty' : d}
                  </button>
                ))}
              </div>
            </div>

            {/* Day filter */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Topic Day</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters((f) => ({ ...f, day: 'any' }))}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm border transition-colors',
                    filters.day === 'any'
                      ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                  )}
                >
                  Any Day
                </button>
                {([1, 2, 3, 4, 5, 6] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilters((f) => ({ ...f, day: d }))}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-sm border transition-colors',
                      filters.day === d
                        ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                    )}
                  >
                    Day {d}
                  </button>
                ))}
              </div>
            </div>

            {noMatchError && (
              <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-3 py-2">
                No problems match these filters. Try broadening your selection.
              </p>
            )}

            <button
              onClick={handleStart}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
            >
              Start 30-minute Session
            </button>
          </div>

          {/* Phase legend */}
          <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 border-dashed p-4 space-y-2">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Session phases</p>
            <div className="space-y-1.5">
              {(Object.entries(PHASE_INFO) as [InterviewPhase, typeof PHASE_INFO.clarify][]).map(([, info]) => (
                <div key={info.label} className="flex items-center gap-2 text-sm">
                  <span className={cn(
                    'w-2 h-2 rounded-full shrink-0',
                    info.color === 'emerald' && 'bg-emerald-500',
                    info.color === 'sky'     && 'bg-sky-500',
                    info.color === 'amber'   && 'bg-amber-500',
                  )} />
                  <span className={cn(
                    'font-medium w-32',
                    info.color === 'emerald' && 'text-emerald-400',
                    info.color === 'sky'     && 'text-sky-400',
                    info.color === 'amber'   && 'text-amber-400',
                  )}>
                    {info.label}
                  </span>
                  <span className="text-zinc-500">{info.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastStack toasts={toasts} />
      </>
    );
  }

  // ─── Render: Running ──────────────────────────────────────────────────────

  if (mockPhase === 'running') {
    return (
      <>
        <div className="max-w-2xl mx-auto space-y-6 pt-4">
          {/* Problem card */}
          {chosenProblem && (
            <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-600 font-mono mb-1">#{chosenProblem.leetcodeId}</p>
                  <h2 className="text-lg font-semibold text-zinc-100">{chosenProblem.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <DifficultyBadge difficulty={chosenProblem.difficulty} />
                    {chosenProblem.patterns.map((p: Pattern) => (
                      <PatternTag key={p} pattern={p} />
                    ))}
                  </div>
                </div>
                <a
                  href={chosenProblem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 rounded px-2 py-1.5 shrink-0 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </a>
              </div>
            </div>
          )}

          {/* Timer display */}
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 text-center space-y-4">
            {/* Current phase label */}
            <div className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border',
              phaseInfo.color === 'emerald' && 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
              phaseInfo.color === 'sky'     && 'bg-sky-500/10 border-sky-500/30 text-sky-400',
              phaseInfo.color === 'amber'   && 'bg-amber-500/10 border-amber-500/30 text-amber-400',
            )}>
              <span className={cn(
                'w-1.5 h-1.5 rounded-full',
                !isPaused && 'animate-pulse',
                phaseInfo.color === 'emerald' && 'bg-emerald-500',
                phaseInfo.color === 'sky'     && 'bg-sky-500',
                phaseInfo.color === 'amber'   && 'bg-amber-500',
              )} />
              {isPaused ? 'Paused' : phaseInfo.label}
            </div>

            {/* Big countdown */}
            <div className={cn(
              'text-7xl font-mono font-bold tracking-tighter tabular-nums transition-colors duration-500',
              displaySeconds <= 60  && 'text-rose-400',
              displaySeconds > 60 && displaySeconds <= 300 && 'text-amber-400',
              displaySeconds > 300  && phaseInfo.color === 'emerald' && 'text-emerald-400',
              displaySeconds > 300  && phaseInfo.color === 'sky'     && 'text-sky-400',
              displaySeconds > 300  && phaseInfo.color === 'amber'   && 'text-amber-400',
            )}>
              {formatTime(displaySeconds)}
            </div>

            <p className="text-sm text-zinc-500">{phaseInfo.description}</p>

            {/* Progress bar */}
            <PhaseBar elapsedSeconds={elapsedSeconds} />

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={togglePause}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 text-sm transition-colors"
              >
                {isPaused ? (
                  <><Play className="w-4 h-4" /> Resume</>
                ) : (
                  <><Pause className="w-4 h-4" /> Pause</>
                )}
              </button>
              <button
                onClick={handleEndEarly}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 text-sm transition-colors"
              >
                <Square className="w-3.5 h-3.5" />
                End Session
              </button>
            </div>
          </div>

          {/* Tips for current phase */}
          <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 border-dashed p-4">
            <PhaseTips phase={currentInterviewPhase} />
          </div>
        </div>
        <ToastStack toasts={toasts} />
      </>
    );
  }

  // ─── Render: Ending ───────────────────────────────────────────────────────

  return (
    <>
      <div className="max-w-lg mx-auto space-y-6 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-semibold text-zinc-100">Session Complete</h1>
          </div>
          {chosenProblem && (
            <p className="text-zinc-500 text-sm">
              {chosenProblem.title} · {formatTime(elapsedAtEnd)} elapsed
            </p>
          )}
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-5">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">How did it go?</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                ['not_started', 'Not attempted'],
                ['attempted', 'Attempted'],
                ['solved', 'Solved ✓'],
                ['needs_review', 'Needs review'],
              ] as [Status, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setEndStatus(val)}
                  className={cn(
                    'px-3 py-2 rounded-lg border text-sm transition-colors text-left',
                    endStatus === val
                      ? val === 'solved'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : val === 'attempted'
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                          : val === 'needs_review'
                            ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                            : 'bg-zinc-700 border-zinc-600 text-zinc-200'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Confidence (1 = shaky, 5 = nailed it)
            </label>
            <ConfidencePicker value={endConfidence} onChange={setEndConfidence} />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
          >
            Save & Return to Setup
          </button>

          {/* Link to problem */}
          {chosenProblem && (
            <div className="text-center">
              <Link
                href={`/problem/${chosenProblem.id}`}
                className="text-sm text-zinc-500 hover:text-zinc-300 underline-offset-2 hover:underline transition-colors"
              >
                View full guide for {chosenProblem.title} →
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastStack toasts={toasts} />
    </>
  );
}

// ─── Phase Tips ───────────────────────────────────────────────────────────────

const TIPS: Record<InterviewPhase, string[]> = {
  clarify: [
    'Ask about input size and constraints.',
    'Confirm return type and output format.',
    'Ask about edge cases: empty input, duplicates, negatives?',
    'Restate the problem in your own words to confirm understanding.',
  ],
  code: [
    'Narrate your approach before writing a single line.',
    'Start with the brute force, state its complexity, then optimize.',
    'Walk through a small example to verify your algorithm.',
    'Write clean variable names — the interviewer reads your code.',
  ],
  test: [
    'Trace through at least two test cases, including an edge case.',
    'State time and space complexity with clear reasoning.',
    'Mention any trade-offs or alternative approaches you considered.',
    'Ask: "Does this look good to you? Any concerns about my approach?"',
  ],
};

function PhaseTips({ phase }: { phase: InterviewPhase }) {
  const tips = TIPS[phase];
  const info = PHASE_INFO[phase];
  return (
    <div className="space-y-2">
      <p className={cn(
        'text-xs font-medium uppercase tracking-wider',
        info.color === 'emerald' && 'text-emerald-500',
        info.color === 'sky'     && 'text-sky-500',
        info.color === 'amber'   && 'text-amber-500',
      )}>
        {info.label} tips
      </p>
      <ul className="space-y-1">
        {tips.map((t, i) => (
          <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-zinc-700">·</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
