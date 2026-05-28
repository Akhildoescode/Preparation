'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Star, Clock, ChevronLeft, Eye, EyeOff, Pause, Play, Timer } from 'lucide-react';
import { useAppState } from '@/hooks/useAppState';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { PatternTag } from '@/components/PatternTag';
import { CodeEditor } from '@/components/CodeEditor';
import { MarkdownView } from '@/components/MarkdownView';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Problem, ProblemContent, Status, UserProgress } from '@/types';
import { defaultProgress } from '@/lib/storage';

interface ProblemPageClientProps {
  problem: Problem;
  content: ProblemContent | null;
}

// ─── Duration helpers ────────────────────────────────────────────────────────

/** "Xh Ym" / "Xm" / "<1m" — for total time display */
function formatDuration(seconds: number): string {
  if (seconds < 60) return '<1m';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** "Xm Ys" — for session countdown display */
function formatSessionTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SESSION_WARN_SECS = 35 * 60;

// ─── Toast ───────────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  message: string;
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg border animate-in slide-in-from-right-4 fade-in-0 duration-300 bg-amber-500/20 border-amber-500/40 text-amber-300"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Confidence stars ────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'attempted', label: 'Attempted' },
  { value: 'solved', label: 'Solved' },
  { value: 'needs_review', label: 'Needs Review' },
];

function ConfidenceStars({
  value,
  onChange,
}: {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n as 1 | 2 | 3 | 4 | 5)}
            className="p-0.5 transition-transform hover:scale-110"
            aria-label={`Set confidence to ${n}`}
          >
            <Star
              className={cn(
                'w-4 h-4 transition-colors',
                value !== null && n <= value
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-zinc-700 hover:text-amber-400'
              )}
            />
          </button>
        ))}
      </div>
      {value === null && (
        <span className="text-xs text-zinc-600 select-none">click to rate</span>
      )}
    </div>
  );
}

const STATUS_KEYS: Record<string, Status> = { '1': 'not_started', '2': 'attempted', '3': 'solved', '4': 'needs_review' };

function isTypingTarget(e: KeyboardEvent): boolean {
  const el = e.target as HTMLElement;
  const tag = el?.tagName?.toLowerCase();
  return tag === 'input' || tag === 'textarea' || el?.isContentEditable === true || !!el?.closest('.monaco-editor');
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ProblemPageClient({ problem, content }: ProblemPageClientProps) {
  const { state, updateProgress, toggleStar, addRecentlyViewed } = useAppState();
  const prog: UserProgress = state.progress[problem.id] ?? defaultProgress(problem.id);
  const [showSolution, setShowSolution] = useState(false);

  // Track this problem as recently viewed on mount
  useEffect(() => {
    addRecentlyViewed(problem.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id]);

  // ── Timer ────────────────────────────────────────────────────────────────

  const [autoTimerEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('dsa-prep-auto-timer') !== 'false';
  });

  const totalBaseRef = useRef(prog.timeSpentSeconds);   // snapshot at mount, never changes
  const sessionElapsedRef = useRef(0);                  // accumulated seconds this session
  const sessionStartRef = useRef<number | null>(null);  // Date.now() when timer last started
  const wasRunningBeforeHideRef = useRef(false);        // for tab-hide resume
  const warnFiredRef = useRef(false);                   // 35-min toast fires once

  // Initialize running state from localStorage to avoid calling setState in effect
  const [isRunning, setIsRunning] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('dsa-prep-auto-timer') !== 'false';
  });
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('dsa-prep-auto-timer') !== 'false';
  });
  const [displaySessionSecs, setDisplaySessionSecs] = useState(0);
  // Tracks total = base + session elapsed, updated every second in the display tick
  const [totalDisplaySeconds, setTotalDisplaySeconds] = useState(prog.timeSpentSeconds);

  // ── Toast ──
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounterRef = useRef(0);
  const pushToast = useCallback((message: string) => {
    const id = ++toastCounterRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  // ── Timer controls ──
  const startTimer = useCallback(() => {
    sessionStartRef.current = Date.now();
    setIsRunning(true);
    setHasStarted(true);
  }, []);

  const pauseTimer = useCallback(() => {
    if (sessionStartRef.current !== null) {
      sessionElapsedRef.current += (Date.now() - sessionStartRef.current) / 1000;
      sessionStartRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const saveTime = useCallback(() => {
    const elapsed =
      sessionStartRef.current !== null
        ? sessionElapsedRef.current + (Date.now() - sessionStartRef.current) / 1000
        : sessionElapsedRef.current;
    const total = totalBaseRef.current + Math.floor(elapsed);
    updateProgress(problem.id, { timeSpentSeconds: total });
  }, [problem.id, updateProgress]);

  // Auto-start on mount: only set the ref — state already initialized from localStorage above
  useEffect(() => {
    if (autoTimerEnabled) {
      sessionStartRef.current = Date.now();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-pause/resume on tab visibility change
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        wasRunningBeforeHideRef.current = sessionStartRef.current !== null;
        if (sessionStartRef.current !== null) {
          sessionElapsedRef.current += (Date.now() - sessionStartRef.current) / 1000;
          sessionStartRef.current = null;
          setIsRunning(false);
        }
      } else {
        if (wasRunningBeforeHideRef.current) {
          sessionStartRef.current = Date.now();
          setIsRunning(true);
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Save on unmount (additive: totalBase + elapsed this session)
  useEffect(() => {
    const base = totalBaseRef.current;
    return () => {
      if (sessionStartRef.current !== null) {
        sessionElapsedRef.current += (Date.now() - sessionStartRef.current) / 1000;
        sessionStartRef.current = null;
      }
      updateProgress(problem.id, {
        timeSpentSeconds: base + Math.floor(sessionElapsedRef.current),
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id]);

  // Save on page unload
  useEffect(() => {
    window.addEventListener('beforeunload', saveTime);
    return () => window.removeEventListener('beforeunload', saveTime);
  }, [saveTime]);

  // Display tick + 35-min check
  const progStatusRef = useRef(prog.status);
  useEffect(() => { progStatusRef.current = prog.status; }, [prog.status]);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;

      const elapsed =
        sessionStartRef.current !== null
          ? sessionElapsedRef.current + (Date.now() - sessionStartRef.current) / 1000
          : sessionElapsedRef.current;
      const sessionFloor = Math.floor(elapsed);
      setDisplaySessionSecs(sessionFloor);
      setTotalDisplaySeconds(totalBaseRef.current + sessionFloor);

      if (!warnFiredRef.current && elapsed >= SESSION_WARN_SECS) {
        warnFiredRef.current = true;
        pushToast('That took a while — consider flagging for extra practice.');
        if (progStatusRef.current === 'attempted') {
          updateProgress(problem.id, { status: 'needs_review' });
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [problem.id, pushToast, updateProgress]);

  // ── Keyboard shortcuts: s = toggle star, 1-4 = set status ──
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 's') {
        toggleStar(problem.id);
        return;
      }
      const status = STATUS_KEYS[e.key];
      if (status) {
        updateProgress(problem.id, {
          status,
          lastAttemptedAt: new Date().toISOString(),
          ...(status === 'solved' ? { solvedAt: new Date().toISOString() } : {}),
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [problem.id, toggleStar, updateProgress]);

  // ── Handlers ──
  const handleStatusChange = useCallback(
    (status: Status) => {
      updateProgress(problem.id, {
        status,
        lastAttemptedAt: new Date().toISOString(),
        ...(status === 'solved' && !prog.solvedAt
          ? { solvedAt: new Date().toISOString() }
          : {}),
        ...(status !== 'not_started' ? { attempts: prog.attempts + 1 } : {}),
      });
    },
    [problem.id, prog, updateProgress]
  );

  const handleCodeChange = useCallback(
    (code: string) => updateProgress(problem.id, { userCode: code }),
    [problem.id, updateProgress]
  );

  const handleNotesChange = useCallback(
    (notes: string) => updateProgress(problem.id, { personalNotes: notes }),
    [problem.id, updateProgress]
  );

  const handleConfidenceChange = useCallback(
    (rating: 1 | 2 | 3 | 4 | 5) => updateProgress(problem.id, { confidenceRating: rating }),
    [problem.id, updateProgress]
  );

  return (
    <div className="space-y-6">
      <ToastStack toasts={toasts} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Dashboard
        </Link>
        <span>/</span>
        <Link href={`/day/${problem.day}`} className="hover:text-zinc-300">
          Day {problem.day}
        </Link>
        <span>/</span>
        <span className="text-zinc-300 truncate">{problem.title}</span>
      </div>

      {/* Problem header */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-zinc-600 font-mono">#{problem.leetcodeId}</span>
              <h1 className="text-xl font-semibold text-zinc-100">{problem.title}</h1>
              {problem.mustKnow && (
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1.5 py-0.5">
                  Must-know
                </span>
              )}
              {problem.hasFullContent && (
                <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded px-1.5 py-0.5">
                  📖 Full guide
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <DifficultyBadge difficulty={problem.difficulty} />
              {problem.patterns.map((p) => (
                <PatternTag key={p} pattern={p} />
              ))}
              <span className="flex items-center gap-1 text-xs text-zinc-600">
                <Clock className="w-3 h-3" />
                Est. {problem.estimatedMinutes}m
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleStar(problem.id)}
              className="p-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition-colors"
              aria-label={prog.starred ? 'Unstar' : 'Star'}
            >
              <Star
                className={cn(
                  'w-4 h-4',
                  prog.starred
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-600 hover:text-amber-400'
                )}
              />
            </button>
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              LeetCode
            </a>
          </div>
        </div>

        {/* Timer row */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Timer className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="text-zinc-300">
              This session: {formatSessionTime(displaySessionSecs)}
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">
              Total: {formatDuration(totalDisplaySeconds)}
            </span>
          </div>
          <div>
            {!hasStarted && !autoTimerEnabled ? (
              <button
                onClick={startTimer}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                <Play className="w-3 h-3" />
                Start timer
              </button>
            ) : isRunning ? (
              <button
                onClick={pauseTimer}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-colors"
              >
                <Pause className="w-3 h-3" />
                Pause
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-amber-700/50 text-xs text-amber-400 hover:text-amber-300 hover:border-amber-600/60 transition-colors"
              >
                <Play className="w-3 h-3" />
                Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Status
          </p>
          <Select
            value={prog.status}
            onValueChange={(v) => handleStatusChange(v as Status)}
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <SelectValue>
                <StatusBadge status={prog.status} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {STATUS_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Confidence
          </p>
          <div className="flex items-center h-10">
            <ConfidenceStars value={prog.confidenceRating} onChange={handleConfidenceChange} />
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Total Time
          </p>
          <div className="flex items-center h-10 text-sm text-zinc-300 font-mono">
            {formatDuration(totalDisplaySeconds)}
            {prog.attempts > 0 && (
              <span className="ml-2 text-xs text-zinc-600">
                ({prog.attempts} attempt{prog.attempts !== 1 ? 's' : ''})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content tabs (only when hasFullContent) */}
      {content ? (
        <ContentTabs content={content} showSolution={showSolution} onToggleSolution={setShowSolution} />
      ) : (
        <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 border-dashed p-8 text-center">
          <p className="text-zinc-500 text-sm">
            Detailed explanation not yet available for this problem.
          </p>
          <p className="text-zinc-600 text-xs mt-1">
            Full guides are available for the 30 must-know problems. Use LeetCode for the problem
            statement.
          </p>
        </div>
      )}

      {/* Code editor */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          My Solution (Java)
        </label>
        <CodeEditor value={prog.userCode} onChange={handleCodeChange} height="380px" />
      </div>

      {/* Personal notes */}
      <div className="space-y-2">
        <label htmlFor="personal-notes" className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          Personal Notes
        </label>
        <Textarea
          id="personal-notes"
          value={prog.personalNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Key insights, traps to remember, patterns you noticed…"
          className="bg-zinc-900 border-zinc-800 text-zinc-100 resize-none min-h-[120px] focus:border-zinc-700"
          rows={5}
        />
      </div>

      {/* Back link */}
      <div className="pt-2 pb-4">
        <Link
          href={`/day/${problem.day}`}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Day {problem.day}
        </Link>
      </div>
    </div>
  );
}

// ─── Content tabs sub-component ────────────────────────────────────────────────

interface ContentTabsProps {
  content: ProblemContent;
  showSolution: boolean;
  onToggleSolution: (v: boolean) => void;
}

function ContentTabs({ content, showSolution, onToggleSolution }: ContentTabsProps) {
  return (
    <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
      <Tabs defaultValue="approach">
        {/* Tab bar */}
        <div className="border-b border-zinc-800 px-4 pt-3">
          <TabsList variant="line" className="gap-0 h-auto pb-0">
            {['approach', 'script', 'solution', 'edge-cases', 'related'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-xs px-3 py-2 rounded-none border-b-2 border-transparent data-active:border-emerald-500 data-active:text-emerald-400 text-zinc-500 hover:text-zinc-300"
              >
                {tabLabel(tab)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab content panels */}
        <div className="p-5">
          <TabsContent value="approach">
            <MarkdownView content={content.approach} />
          </TabsContent>

          <TabsContent value="script">
            <MarkdownView content={content.interviewerScript} />
          </TabsContent>

          <TabsContent value="solution">
            <div className="space-y-3">
              {/* Blur toggle */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500">
                  {showSolution
                    ? 'Reference solution visible — attempt the problem first!'
                    : 'Solution is hidden. Attempt the problem before revealing.'}
                </p>
                <button
                  onClick={() => onToggleSolution(!showSolution)}
                  className={cn(
                    'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors',
                    showSolution
                      ? 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10'
                      : 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                  )}
                >
                  {showSolution ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Reveal Solution
                    </>
                  )}
                </button>
              </div>
              <div
                className={cn(
                  'transition-all duration-300',
                  !showSolution && 'blur-sm select-none pointer-events-none'
                )}
              >
                <MarkdownView content={content.solution} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edge-cases">
            <MarkdownView content={content.edgeCases} />
          </TabsContent>

          <TabsContent value="related">
            <MarkdownView content={content.relatedPatterns} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function tabLabel(tab: string): string {
  switch (tab) {
    case 'approach':
      return 'Approach';
    case 'script':
      return 'Interviewer Script';
    case 'solution':
      return 'Solution';
    case 'edge-cases':
      return 'Edge Cases';
    case 'related':
      return 'Related';
    default:
      return tab;
  }
}
