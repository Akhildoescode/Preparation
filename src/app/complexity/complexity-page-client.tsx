'use client';

import { useCallback, useMemo, useState } from 'react';
import { CheckCircle2, Code2, RotateCcw, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from './page';

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_SIZE = 10;

const TIME_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(2^n)',
  'O(n!)',
] as const;

const SPACE_OPTIONS = ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'welcome' | 'question' | 'revealed' | 'done';

// ─── Sub-components ───────────────────────────────────────────────────────────

function ComplexityOptions({
  label,
  options,
  selected,
  correct,
  revealed,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selected: string | null;
  correct: string;
  revealed: boolean;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === correct;

          let style = '';
          if (revealed) {
            if (isCorrect && isSelected) style = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold';
            else if (isCorrect && !isSelected) style = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/30';
            else if (!isCorrect && isSelected) style = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
            else style = 'border-zinc-800 text-zinc-600';
          } else {
            style = isSelected
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200';
          }

          return (
            <button
              key={opt}
              onClick={() => !revealed && onSelect(opt)}
              disabled={revealed}
              className={cn(
                'px-3 py-1.5 rounded-lg border text-sm font-mono transition-colors',
                style
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ComplexityPageClientProps {
  questions: QuizQuestion[];
}

export default function ComplexityPageClient({ questions }: ComplexityPageClientProps) {
  const [phase, setPhase] = useState<Phase>('welcome');
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const current = queue[currentIdx] ?? null;
  const isLast = currentIdx >= queue.length - 1;

  // ── Start session ──
  const handleStart = useCallback(() => {
    const shuffled = shuffle(questions).slice(0, SESSION_SIZE);
    setQueue(shuffled);
    setCurrentIdx(0);
    setSelectedTime(null);
    setSelectedSpace(null);
    setScore({ correct: 0, total: 0 });
    setPhase('question');
  }, [questions]);

  // ── Submit ──
  const handleSubmit = useCallback(() => {
    if (!current || !selectedTime || !selectedSpace) return;
    const timeCorrect = selectedTime === current.timeAnswer;
    const spaceCorrect = selectedSpace === current.spaceAnswer;
    const bothCorrect = timeCorrect && spaceCorrect;
    setScore((s) => ({
      correct: s.correct + (bothCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setPhase('revealed');
  }, [current, selectedTime, selectedSpace]);

  // ── Next ──
  const handleNext = useCallback(() => {
    if (isLast) {
      setPhase('done');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedTime(null);
      setSelectedSpace(null);
      setPhase('question');
    }
  }, [isLast]);

  // ── Analysis for reveal ──
  const analysis = useMemo(() => {
    if (!current || phase !== 'revealed') return null;
    return {
      timeCorrect: selectedTime === current.timeAnswer,
      spaceCorrect: selectedSpace === current.spaceAnswer,
      bothCorrect: selectedTime === current.timeAnswer && selectedSpace === current.spaceAnswer,
    };
  }, [current, phase, selectedTime, selectedSpace]);

  // ─── Welcome ─────────────────────────────────────────────────────────────

  if (phase === 'welcome') {
    return (
      <div className="max-w-lg mx-auto space-y-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-semibold text-zinc-100">Complexity Quiz</h1>
          </div>
          <p className="text-zinc-500 text-sm">
            Read a Java snippet and identify its time <em>and</em> space complexity.
            {' '}{SESSION_SIZE} questions per session, picked from a bank of {questions.length}.
          </p>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">How it works</p>
            <ol className="space-y-1.5 text-sm text-zinc-400 list-none">
              {[
                'Read the Java snippet carefully.',
                'Select a time complexity and a space complexity.',
                'Click Submit to see if you were right.',
                'After 10 questions your session score is shown.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-md bg-zinc-800/60 p-3 space-y-1">
            <p className="text-xs text-zinc-500 font-medium">Both must be correct for a point.</p>
            <p className="text-xs text-zinc-600">
              Time options: {TIME_OPTIONS.join(', ')} · Space options: {SPACE_OPTIONS.join(', ')}
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
          >
            Start {SESSION_SIZE}-Question Session
          </button>
        </div>
      </div>
    );
  }

  // ─── Done ─────────────────────────────────────────────────────────────────

  if (phase === 'done') {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-semibold text-zinc-100">Session Complete</h1>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-8 text-center space-y-4">
          <div
            className={cn(
              'text-6xl font-bold',
              pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-rose-400'
            )}
          >
            {pct}%
          </div>
          <p className="text-zinc-400 text-sm">
            {score.correct} of {score.total} questions answered correctly
            <span className="text-zinc-600 text-xs block mt-0.5">(both time and space must match)</span>
          </p>
          {pct >= 80 && (
            <p className="text-emerald-400 text-sm font-medium">Excellent! You have strong complexity intuition. 🎉</p>
          )}
          {pct >= 50 && pct < 80 && (
            <p className="text-amber-400 text-sm font-medium">Solid — keep drilling the trickier cases.</p>
          )}
          {pct < 50 && (
            <p className="text-rose-400 text-sm font-medium">Complexity analysis takes practice. Review the explanations and try again.</p>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Session
        </button>
      </div>
    );
  }

  // ─── Question / Revealed ──────────────────────────────────────────────────

  if (!current) return null;

  const isRevealed = phase === 'revealed';
  const canSubmit = selectedTime !== null && selectedSpace !== null;

  return (
    <div className="max-w-2xl mx-auto space-y-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h1 className="text-lg font-semibold text-zinc-100">Complexity Quiz</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-500">
            Question {currentIdx + 1} of {queue.length}
          </span>
          {score.total > 0 && (
            <span className="text-emerald-400 font-medium tabular-nums">
              {score.correct}/{score.total}
            </span>
          )}
        </div>
      </div>

      {/* Snippet card */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400">{current.label}</span>
          <span className="text-xs text-zinc-600 font-mono">Java</span>
        </div>
        <pre className="p-4 text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed">
          <code>{current.snippet}</code>
        </pre>
      </div>

      {/* Answer inputs */}
      <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 space-y-5">
        <ComplexityOptions
          label="Time Complexity"
          options={TIME_OPTIONS}
          selected={selectedTime}
          correct={current.timeAnswer}
          revealed={isRevealed}
          onSelect={setSelectedTime}
        />
        <ComplexityOptions
          label="Space Complexity"
          options={SPACE_OPTIONS}
          selected={selectedSpace}
          correct={current.spaceAnswer}
          revealed={isRevealed}
          onSelect={setSelectedSpace}
        />
      </div>

      {/* Reveal panel */}
      {isRevealed && analysis && (
        <div
          className={cn(
            'rounded-lg border p-5 space-y-3',
            analysis.bothCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-zinc-900 border-zinc-800'
          )}
        >
          <div className="flex items-center gap-2">
            {analysis.bothCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-300">
                  {!analysis.timeCorrect && !analysis.spaceCorrect
                    ? 'Both incorrect'
                    : !analysis.timeCorrect
                      ? 'Time complexity incorrect'
                      : 'Space complexity incorrect'}
                </span>
              </>
            )}
          </div>

          <div className="text-sm space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 w-24 shrink-0">Time:</span>
              <span className={cn('font-mono', analysis.timeCorrect ? 'text-emerald-400' : 'text-rose-400')}>
                {current.timeAnswer}
              </span>
              {!analysis.timeCorrect && (
                <span className="text-zinc-600 text-xs">you said {selectedTime}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 w-24 shrink-0">Space:</span>
              <span className={cn('font-mono', analysis.spaceCorrect ? 'text-emerald-400' : 'text-rose-400')}>
                {current.spaceAnswer}
              </span>
              {!analysis.spaceCorrect && (
                <span className="text-zinc-600 text-xs">you said {selectedSpace}</span>
              )}
            </div>
          </div>

          <p className="text-sm text-zinc-400 pt-1 border-t border-zinc-800/60">
            {current.explanation}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!isRevealed ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-semibold text-sm transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-sm transition-colors"
          >
            {isLast ? 'Finish Session' : 'Next Question →'}
          </button>
        )}
        <button
          onClick={handleStart}
          title="Restart session"
          className="px-3 py-2 rounded-lg border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
